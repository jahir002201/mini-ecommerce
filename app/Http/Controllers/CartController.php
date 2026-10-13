<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    /**
     * Display the customer's cart.
     */
    public function index(): Response
    {
        $customerId = auth('customer')->id();

        $cartItems = Cart::with([
            'product:id,name,slug,price,after_discount,preview',
            'color:id,name,color_code',
            'size:id,name',
        ])
            ->where('customer_id', $customerId)
            ->latest()
            ->get();

        $subtotal = $cartItems->sum(function ($item) {
            return (float) (
                $item->product?->after_discount
                ?? $item->product?->price
                ?? 0
            ) * $item->quantity;
        });

        return Inertia::render('Customer/Cart/Index', [
            'cartItems' => $cartItems,
            'subtotal' => round($subtotal, 2),
            'deliveryCharge' => (float) config('app.delivery_charge', 80),
        ]);
    }

    /**
     * Add a product to the cart.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1', 'max:100'],
            'size_id' => ['nullable', 'exists:sizes,id'],
            'color_id' => ['nullable', 'exists:colors,id'],
        ]);

        $customerId = auth('customer')->id();

        $product = Product::findOrFail($validated['product_id']);

        $sizeId = $validated['size_id'] ?? null;
        $colorId = $validated['color_id'] ?? null;

        $cartItem = Cart::where('customer_id', $customerId)
            ->where('product_id', $product->id)
            ->where('size_id', $sizeId)
            ->where('color_id', $colorId)
            ->first();

        if ($cartItem) {
            $cartItem->increment(
                'quantity',
                $validated['quantity']
            );
        } else {
            Cart::create([
                'customer_id' => $customerId,
                'product_id' => $product->id,
                'size_id' => $sizeId,
                'color_id' => $colorId,
                'quantity' => $validated['quantity'],
            ]);
        }

        return back()->with(
            'success',
            'Product added to cart successfully.'
        );
    }

    /**
     * Update cart quantity.
     */
    public function update(
        Request $request,
        Cart $cart
    ): RedirectResponse {
        abort_unless(
            (int) $cart->customer_id === (int) auth('customer')->id(),
            403
        );

        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:100'],
        ]);

        $cart->update([
            'quantity' => $validated['quantity'],
        ]);

        return back()->with(
            'success',
            'Cart updated successfully.'
        );
    }

    /**
     * Remove a product from the cart.
     */
    public function destroy(Cart $cart): RedirectResponse
    {
        abort_unless(
            (int) $cart->customer_id === (int) auth('customer')->id(),
            403
        );

        $cart->delete();

        return back()->with(
            'success',
            'Product removed from cart.'
        );
    }
}