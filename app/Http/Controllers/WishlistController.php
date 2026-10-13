<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    /**
     * Display the customer's wishlist.
     */
    public function index(): Response
    {
        $wishlists = Wishlist::with([
            'product:id,name,slug,price,after_discount,preview',
        ])
            ->where('customer_id', auth('customer')->id())
            ->latest()
            ->get();

        return Inertia::render('Customer/Wishlist/Index', [
            'wishlists' => $wishlists,
        ]);
    }

    /**
     * Add a product to the wishlist.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
        ]);

        Wishlist::firstOrCreate([
            'customer_id' => auth('customer')->id(),
            'product_id' => $validated['product_id'],
        ]);

        return back()->with(
            'success',
            'Product added to wishlist successfully.'
        );
    }

    /**
     * Remove a product from the wishlist.
     */
    public function destroy(
        Wishlist $wishlist
    ): RedirectResponse {
        abort_unless(
            (int) $wishlist->customer_id === (int) auth('customer')->id(),
            403
        );

        $wishlist->delete();

        return back()->with(
            'success',
            'Product removed from wishlist.'
        );
    }
}