<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;
use App\Models\Wishlist;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'customer' => Auth::guard('customer')->user(),
            ],


            'cartCount' => fn () => Auth::guard('customer')->check()
                ? Cart::where('customer_id', Auth::guard('customer')->id())
                    ->sum('quantity')
                : 0,

            'wishlistCount' => fn () => Auth::guard('customer')->check()
                ? Wishlist::where('customer_id', Auth::guard('customer')->id())
                    ->count()
                : 0,

            'flash' => [
            'success' => fn () => $request->session()->get('success'),
            'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
