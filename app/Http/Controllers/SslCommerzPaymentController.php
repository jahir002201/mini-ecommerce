<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Inventory;
use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SslCommerzPaymentController extends Controller
{
    public function success(Request $request)
    {
        [$paid, $message] = $this->verifyAndFinalize($request);

        if (! $paid) {
            return redirect()
                ->route('customer.checkout.index')
                ->with('error', $message);
        }

        return redirect()
            ->route('customer.account')
            ->with('success', $message);
    }

    public function fail(Request $request)
    {
        $this->markUnpaid($request, 'failed');

        return redirect()
            ->route('customer.checkout.index')
            ->with('error', 'Payment failed. You can try again.');
    }

    public function cancel(Request $request)
    {
        $this->markUnpaid($request, 'cancelled');

        return redirect()
            ->route('customer.checkout.index')
            ->with('error', 'Payment was cancelled.');
    }

    public function ipn(Request $request)
    {
        [$paid, $message] = $this->verifyAndFinalize($request);

        return response($paid ? 'OK' : $message, $paid ? 200 : 422);
    }

    private function verifyAndFinalize(Request $request): array
    {
        $tranId = $request->input('tran_id');
        $valId = $request->input('val_id');

        if (! $tranId || ! $valId) {
            return [false, 'Payment validation information is missing.'];
        }

        $order = Order::where('order_id', $tranId)
            ->where('payment_method', 'sslcommerz')
            ->first();

        if (! $order) {
            return [false, 'Order not found.'];
        }

        // Idempotency: callbacks must never charge/decrement stock twice.
        if ($order->payment_status === 'paid') {
            return [true, 'Payment has already been confirmed.'];
        }

        $sandbox = (bool) config('services.sslcommerz.sandbox');

        $baseUrl = $sandbox
            ? 'https://sandbox.sslcommerz.com'
            : 'https://securepay.sslcommerz.com';

        $response = Http::timeout(20)->get(
            $baseUrl.'/validator/api/validationserverAPI.php',
            [
                'val_id' => $valId,
                'store_id' => config('services.sslcommerz.store_id'),
                'store_passwd' => config('services.sslcommerz.store_password'),
                'format' => 'json',
            ]
        );

        if (! $response->successful()) {
            return [false, 'Unable to verify payment with the gateway.'];
        }

        $data = $response->json();

        if (! in_array(
            strtoupper((string) ($data['status'] ?? '')),
            ['VALID', 'VALIDATED'],
            true
        )) {
            return [false, 'The gateway did not validate this payment.'];
        }

        if (($data['tran_id'] ?? null) !== $order->order_id) {
            return [false, 'Transaction ID does not match the order.'];
        }

        $gatewayAmount = (float) ($data['amount'] ?? 0);
        $orderAmount = (float) $order->total;
        $currency = strtoupper((string) (
            $data['currency_type'] ?? $data['currency'] ?? ''
        ));

        if (abs($gatewayAmount - $orderAmount) >= 0.01) {
            return [false, 'Payment amount does not match the order total.'];
        }

        if ($currency !== 'BDT') {
            return [false, 'Payment currency does not match.'];
        }

        try {
            DB::transaction(function () use ($order, $data) {
                $lockedOrder = Order::whereKey($order->id)
                    ->lockForUpdate()
                    ->firstOrFail();

                // A second callback may arrive while the first is processing.
                if ($lockedOrder->payment_status === 'paid') {
                    return;
                }

                $items = OrderProduct::where(
                    'order_id',
                    $lockedOrder->id
                )->get();

                // Lock and validate all inventory rows before decrementing.
                $inventoryRows = [];

                foreach ($items as $item) {
                    $query = Inventory::where(
                        'product_id',
                        $item->product_id
                    );

                    $item->size_id === null
                        ? $query->whereNull('size_id')
                        : $query->where('size_id', $item->size_id);

                    $item->color_id === null
                        ? $query->whereNull('color_id')
                        : $query->where('color_id', $item->color_id);

                    $inventory = $query->lockForUpdate()->first();

                    if (
                        ! $inventory
                        || $inventory->quantity < $item->quantity
                    ) {
                        // Payment is verified, but stock needs manual review.
                        $lockedOrder->update([
                            'payment_status' => 'paid',
                            'status' => 'stock_issue',
                            'transaction_id' => $data['bank_tran_id']
                                ?? $lockedOrder->order_id,
                            'paid_at' => now(),
                        ]);

                        return;
                    }

                    $inventoryRows[] = [
                        'inventory' => $inventory,
                        'quantity' => $item->quantity,
                    ];
                }

                foreach ($inventoryRows as $row) {
                    $row['inventory']->decrement(
                        'quantity',
                        $row['quantity']
                    );
                }

                $lockedOrder->update([
                    'payment_status' => 'paid',
                    'status' => 'processing',
                    'transaction_id' => $data['bank_tran_id']
                        ?? $lockedOrder->order_id,
                    'paid_at' => now(),
                ]);

                // Remove purchased cart lines only.
                foreach ($items as $item) {
                    $cartQuery = Cart::where(
                        'customer_id',
                        $lockedOrder->customer_id
                    )->where('product_id', $item->product_id);

                    $item->size_id === null
                        ? $cartQuery->whereNull('size_id')
                        : $cartQuery->where('size_id', $item->size_id);

                    $item->color_id === null
                        ? $cartQuery->whereNull('color_id')
                        : $cartQuery->where('color_id', $item->color_id);

                    $cartQuery->delete();
                }
            });
        } catch (\Throwable $exception) {
            report($exception);

            return [false, 'Could not finalize the order. Please contact support.'];
        }

        $order->refresh();

        if ($order->status === 'stock_issue') {
            return [
                true,
                'Payment received. Your order needs a stock review; please contact support.',
            ];
        }

        return [true, 'Payment successful. Your order is being processed.'];
    }

    private function markUnpaid(Request $request, string $paymentStatus): void
    {
        $tranId = $request->input('tran_id');

        if (! $tranId) {
            return;
        }

        $order = Order::where('order_id', $tranId)
            ->where('payment_method', 'sslcommerz')
            ->first();

        if ($order && $order->payment_status !== 'paid') {
            $order->update([
                'payment_status' => $paymentStatus,
            ]);
        }
    }
}