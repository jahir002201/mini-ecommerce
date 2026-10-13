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
            return (float) (
                $item->product?->after_discount
                ?? $item->product?->price
                ?? 0
            ) * $item->quantity;
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

        $order = DB::transaction(function () use (
            $validated,
            $customerId
        ) {
            $cartItems = Cart::with('product')
                ->where('customer_id', $customerId)
                ->lockForUpdate()
                ->get();

            if ($cartItems->isEmpty()) {
                abort(422, 'Your cart is empty.');
            }

            $subtotal = 0;

            foreach ($cartItems as $item) {
                if (! $item->product) {
                    abort(422, 'A product in your cart is unavailable.');
                }

                $price = (float) (
                    $item->product->after_discount
                    ?? $item->product->price
                );

                if ($price < 0 || $item->quantity < 1) {
                    abort(422, 'Invalid product price or quantity.');
                }

                $subtotal += $price * $item->quantity;
            }

            $charge = (float) config('app.delivery_charge', 80);
            $subtotal = round($subtotal, 2);
            $total = round($subtotal + $charge, 2);

            $order = Order::create([
                'order_id' => 'ORD-'.now()->format('YmdHis').'-'.Str::upper(Str::random(6)),
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

            return $order;
        });

        // Cash on delivery: validate and decrement stock immediately.
        if ($validated['payment_method'] === 'cod') {
            $this->fulfillCodOrder($order);

            return redirect()
                ->route('customer.account')
                ->with('success', 'Your order has been placed.');
        }

        return $this->startSslCommerzPayment($order, $validated);
    }

    private function fulfillCodOrder(Order $order): void
    {
        DB::transaction(function () use ($order) {
            $order = Order::whereKey($order->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($order->status !== 'pending') {
                return;
            }

            $items = OrderProduct::where('order_id', $order->id)->get();

            // Check every item before changing any inventory.
            foreach ($items as $item) {
                $query = Inventory::where('product_id', $item->product_id);

                $item->size_id === null
                    ? $query->whereNull('size_id')
                    : $query->where('size_id', $item->size_id);

                $item->color_id === null
                    ? $query->whereNull('color_id')
                    : $query->where('color_id', $item->color_id);

                $inventory = $query->lockForUpdate()->first();

                if (! $inventory || $inventory->quantity < $item->quantity) {
                    abort(422, 'Insufficient stock for one or more products.');
                }
            }

            foreach ($items as $item) {
                $query = Inventory::where('product_id', $item->product_id);

                $item->size_id === null
                    ? $query->whereNull('size_id')
                    : $query->where('size_id', $item->size_id);

                $item->color_id === null
                    ? $query->whereNull('color_id')
                    : $query->where('color_id', $item->color_id);

                $inventory = $query->lockForUpdate()->firstOrFail();
                $inventory->decrement('quantity', $item->quantity);
            }

            $order->update([
                'status' => 'processing',
                'payment_status' => 'pending',
            ]);

            Cart::where('customer_id', $order->customer_id)->delete();
        });
    }

    private function startSslCommerzPayment(
        Order $order,
        array $billing
    ) {
        $sandbox = (bool) config('services.sslcommerz.sandbox');

        $baseUrl = $sandbox
            ? 'https://sandbox.sslcommerz.com'
            : 'https://securepay.sslcommerz.com';

        $response = Http::asForm()
            ->timeout(30)
            ->post($baseUrl.'/gwprocess/v4/api.php', [
                'store_id' => config('services.sslcommerz.store_id'),
                'store_passwd' => config('services.sslcommerz.store_password'),
                'total_amount' => number_format((float) $order->total, 2, '.', ''),
                'currency' => 'BDT',
                'tran_id' => $order->order_id,
                'success_url' => route('payment.success'),
                'fail_url' => route('payment.fail'),
                'cancel_url' => route('payment.cancel'),
                'ipn_url' => route('payment.ipn'),
                'shipping_method' => 'NO',
                'product_name' => 'Mini E-Commerce Order '.$order->order_id,
                'product_category' => 'E-Commerce',
                'product_profile' => 'general',
                'cus_name' => $billing['name'],
                'cus_email' => $billing['email'],
                'cus_add1' => $billing['address'],
                'cus_city' => 'Dhaka',
                'cus_postcode' => $billing['zip'] ?? '0000',
                'cus_country' => 'Bangladesh',
                'cus_phone' => $billing['mobile_number'],
                'value_a' => (string) $order->id,
            ]);

        $gatewayUrl = $response->json('GatewayPageURL');

        if (! $response->successful() || ! $gatewayUrl) {
            return back()->with(
                'error',
                'Unable to start payment. Please try again.'
            );
        }

        return Inertia::location($gatewayUrl);
    }
}