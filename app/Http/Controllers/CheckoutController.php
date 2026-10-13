<?php

namespace App\Http\Controllers;

use App\Models\BillingDetail;
use App\Models\Cart;
use App\Models\Inventory;
use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        $customerId = auth('customer')->id();

        $cartItems = Cart::with(['product', 'color', 'size'])
            ->where('customer_id', $customerId)
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()
                ->route('customer.cart.index')
                ->with('error', 'Your cart is empty.');
        }

        $subtotal = $cartItems->sum(function ($item) {
            $price = (float) (
                $item->product?->after_discount
                ?? $item->product?->price
                ?? 0
            );

            return $price * (int) $item->quantity;
        });

        return Inertia::render('Customer/Checkout/Index', [
            'cartItems' => $cartItems,
            'subtotal' => round($subtotal, 2),
            'deliveryCharge' => (float) config('app.delivery_charge', 80),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'mobile_number' => ['required', 'string', 'max:30'],
            'company' => ['nullable', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:2000'],
            'country_id' => ['nullable', 'integer'],
            'city_id' => ['nullable', 'integer'],
            'zip' => ['nullable', 'string', 'max:30'],
            'notes' => ['nullable', 'string', 'max:2000'],
            'payment_method' => ['required', 'in:cod,sslcommerz'],
        ]);

        $customerId = auth('customer')->id();

        /*
         * Create the order and order items in one transaction.
         * COD stock deduction is included in the same transaction.
         */
        $order = DB::transaction(function () use (
            $validated,
            $customerId
        ) {
            $cartItems = Cart::with('product')
                ->where('customer_id', $customerId)
                ->lockForUpdate()
                ->get();

            if ($cartItems->isEmpty()) {
                throw ValidationException::withMessages([
                    'cart' => 'Your cart is empty.',
                ]);
            }

            $subtotal = 0;
            $inventoryRows = [];

            // Validate products and check inventory before creating the order.
            foreach ($cartItems as $item) {
                if (! $item->product) {
                    throw ValidationException::withMessages([
                        'cart' => 'A product in your cart is unavailable.',
                    ]);
                }

                $quantity = (int) $item->quantity;

                if ($quantity < 1 || $quantity > 100) {
                    throw ValidationException::withMessages([
                        'cart' => 'A product has an invalid quantity.',
                    ]);
                }

                $price = (float) (
                    $item->product->after_discount
                    ?? $item->product->price
                );

                if (! is_finite($price) || $price < 0) {
                    throw ValidationException::withMessages([
                        'cart' => 'A product has an invalid price.',
                    ]);
                }

                $subtotal += $price * $quantity;

                $inventory = $this->findInventory(
                    $item->product_id,
                    $item->size_id,
                    $item->color_id,
                    true
                );

                if (! $inventory || $inventory->quantity < $quantity) {
                    throw ValidationException::withMessages([
                        'cart' => 'Insufficient stock for '
                            . $item->product->name
                            . '. Please update your cart.',
                    ]);
                }

                $inventoryRows[] = [
                    'inventory' => $inventory,
                    'quantity' => $quantity,
                ];
            }

            $subtotal = round($subtotal, 2);
            $charge = (float) config('app.delivery_charge', 80);
            $total = round($subtotal + $charge, 2);

            $order = Order::create([
                'order_id' => 'ORD-'
                    . now()->format('YmdHis')
                    . '-'
                    . Str::upper(Str::random(6)),
                'customer_id' => $customerId,
                'sub_total' => $subtotal,
                'total' => $total,
                'discount' => 0,
                'charge' => $charge,
                'payment_method' => $validated['payment_method'],
                'status' => 'pending',
                'payment_status' => 'pending',
            ]);

            BillingDetail::create([
                'order_id' => $order->id,
                'customer_id' => $customerId,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'mobile_number' => $validated['mobile_number'],
                'company' => $validated['company'] ?? null,
                'address' => $validated['address'],
                'country_id' => $validated['country_id'] ?? null,
                'city_id' => $validated['city_id'] ?? null,
                'zip' => $validated['zip'] ?? null,
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($cartItems as $item) {
                OrderProduct::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'price' => $item->product->after_discount
                        ?? $item->product->price,
                    'color_id' => $item->color_id,
                    'size_id' => $item->size_id,
                    'quantity' => $item->quantity,
                ]);
            }

            if ($validated['payment_method'] === 'cod') {
                // Decrement stock only after all items have passed validation.
                foreach ($inventoryRows as $row) {
                    $row['inventory']->decrement(
                        'quantity',
                        $row['quantity']
                    );
                }

                $order->update([
                    'status' => 'processing',
                    'payment_status' => 'pending',
                ]);

                Cart::where('customer_id', $customerId)->delete();
            }

            return $order;
        });

        if ($validated['payment_method'] === 'cod') {
            return redirect()
                ->route('customer.account')
                ->with('success', 'Your COD order has been placed successfully.');
        }

        return $this->startSslCommerzPayment($order);
    }

    /**
     * Find the exact inventory combination for a product, size and color.
     */
    private function findInventory(
        int $productId,
        ?int $sizeId,
        ?int $colorId,
        bool $lock = false
    ): ?Inventory {
        $query = Inventory::where('product_id', $productId);

        if ($sizeId === null) {
            $query->whereNull('size_id');
        } else {
            $query->where('size_id', $sizeId);
        }

        if ($colorId === null) {
            $query->whereNull('color_id');
        } else {
            $query->where('color_id', $colorId);
        }

        if ($lock) {
            $query->lockForUpdate();
        }

        return $query->first();
    }

    /**
     * Start SSLCommerz hosted checkout.
     */
    private function startSslCommerzPayment(Order $order)
    {
        $storeId = config('services.sslcommerz.store_id');
        $storePassword = config('services.sslcommerz.store_password');

        if (! $storeId || ! $storePassword) {
            return $this->paymentStartFailed(
                $order,
                'Online payment is not configured. Please contact support.'
            );
        }

        $billing = $order->billingDetails()->first();

        if (! $billing) {
            return $this->paymentStartFailed(
                $order,
                'Billing details were not found.'
            );
        }

        $sandbox = filter_var(
            config('services.sslcommerz.sandbox', true),
            FILTER_VALIDATE_BOOLEAN
        );

        $baseUrl = $sandbox
            ? 'https://sandbox.sslcommerz.com'
            : 'https://securepay.sslcommerz.com';

        try {
            $response = Http::asForm()
                ->timeout(30)
                ->post($baseUrl . '/gwprocess/v4/api.php', [
                    'store_id' => $storeId,
                    'store_passwd' => $storePassword,

                    'total_amount' => number_format(
                        (float) $order->total,
                        2,
                        '.',
                        ''
                    ),
                    'currency' => 'BDT',
                    'tran_id' => $order->order_id,

                    'success_url' => route('payment.success'),
                    'fail_url' => route('payment.fail'),
                    'cancel_url' => route('payment.cancel'),
                    'ipn_url' => route('payment.ipn'),

                    'shipping_method' => 'NO',
                    'product_name' => 'Mini E-Commerce Order',
                    'product_category' => 'E-Commerce',
                    'product_profile' => 'general',

                    'cus_name' => $billing->name,
                    'cus_email' => $billing->email,
                    'cus_phone' => $billing->mobile_number,
                    'cus_add1' => $billing->address,
                    'cus_city' => 'Dhaka',
                    'cus_postcode' => $billing->zip ?: '1000',
                    'cus_country' => 'Bangladesh',

                    'value_a' => (string) $order->id,
                ]);

            $result = $response->json() ?? [];
            $gatewayUrl = $result['GatewayPageURL'] ?? null;
            $gatewayHost = is_string($gatewayUrl)
                ? parse_url($gatewayUrl, PHP_URL_HOST)
                : null;

            $allowedHosts = $sandbox
                ? ['sandbox.sslcommerz.com']
                : ['securepay.sslcommerz.com'];

            if (
                ! $response->successful()
                || strtoupper((string) ($result['status'] ?? '')) !== 'SUCCESS'
                || ! filter_var($gatewayUrl, FILTER_VALIDATE_URL)
                || ! in_array($gatewayHost, $allowedHosts, true)
            ) {
                report(new \RuntimeException(
                    'SSLCommerz session initialization failed. Order: '
                    . $order->order_id
                ));

                return $this->paymentStartFailed(
                    $order,
                    'Unable to start online payment. Please try again.'
                );
            }

            return Inertia::location($gatewayUrl);
        } catch (\Throwable $exception) {
            report($exception);

            return $this->paymentStartFailed(
                $order,
                'Unable to connect to the payment gateway. Please try again.'
            );
        }
    }

    private function paymentStartFailed(Order $order, string $message)
    {
        // Do not overwrite a payment that has already been confirmed.
        $order->refresh();

        if ($order->payment_status !== 'paid') {
            $order->update([
                'payment_status' => 'failed',
            ]);
        }

        return redirect()
            ->route('customer.checkout.index')
            ->with('error', $message);
    }
}