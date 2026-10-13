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
            'size_id' => ['nullable', 'integer', 'exists:sizes,id'],
            'color_id' => ['nullable', 'integer', 'exists:colors,id'],
        ]);

        $customerId = auth('customer')->id();

        $product = Product::findOrFail($validated['product_id']);

        $sizeId = $validated['size_id'] ?? null;
        $colorId = $validated['color_id'] ?? null;
        $quantity = (int) $validated['quantity'];

        $inventoryQuery = \App\Models\Inventory::query()
            ->where('product_id', $product->id);

        $sizeId === null
            ? $inventoryQuery->whereNull('size_id')
            : $inventoryQuery->where('size_id', $sizeId);

        $colorId === null
            ? $inventoryQuery->whereNull('color_id')
            : $inventoryQuery->where('color_id', $colorId);

        $inventory = $inventoryQuery->first();

        if (!$inventory || $inventory->quantity < $quantity) {
            return back()->withErrors([
                'quantity' => 'The selected size/color combination is unavailable or out of stock.',
            ]);
        }

        $cartQuery = Cart::where('customer_id', $customerId)
            ->where('product_id', $product->id);

        $sizeId === null
            ? $cartQuery->whereNull('size_id')
            : $cartQuery->where('size_id', $sizeId);

        $colorId === null
            ? $cartQuery->whereNull('color_id')
            : $cartQuery->where('color_id', $colorId);

        $cartItem = $cartQuery->first();

        if ($cartItem) {
            if ($inventory->quantity < $cartItem->quantity + $quantity) {
                return back()->withErrors([
                    'quantity' => 'Not enough stock for the requested quantity.',
                ]);
            }

            $cartItem->increment('quantity', $quantity);
        } else {
            Cart::create([
                'customer_id' => $customerId,
                'product_id' => $product->id,
                'size_id' => $sizeId,
                'color_id' => $colorId,
                'quantity' => $quantity,
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