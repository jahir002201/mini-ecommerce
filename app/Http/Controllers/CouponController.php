<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CouponController extends Controller
{
    public function index(): Response
    {
        $coupons = Coupon::query()
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Coupons/Index', [
            'coupons' => $coupons,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Coupons/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:coupons,name',
            ],

            'discount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'expire_date' => [
                'required',
                'date',
            ],

            'type' => [
                'required',
                Rule::in([
                    'percentage',
                    'fixed',
                ]),
            ],
        ]);

        if (
            $validated['type'] === 'percentage' &&
            $validated['discount'] > 100
        ) {
            return back()
                ->withErrors([
                    'discount' =>
                        'Percentage discount cannot be greater than 100.',
                ])
                ->withInput();
        }

        Coupon::create($validated);

        return redirect()
            ->route('admin.coupons.index')
            ->with(
                'success',
                'Coupon created successfully.'
            );
    }

    public function show(Coupon $coupon): Response
    {
        return Inertia::render('Admin/Coupons/Show', [
            'coupon' => $coupon,
        ]);
    }

    public function edit(Coupon $coupon): Response
    {
        return Inertia::render('Admin/Coupons/Edit', [
            'coupon' => $coupon,
        ]);
    }

    public function update(
        Request $request,
        Coupon $coupon
    ): RedirectResponse {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('coupons', 'name')
                    ->ignore($coupon->id),
            ],

            'discount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'expire_date' => [
                'required',
                'date',
            ],

            'type' => [
                'required',
                Rule::in([
                    'percentage',
                    'fixed',
                ]),
            ],
        ]);

        if (
            $validated['type'] === 'percentage' &&
            $validated['discount'] > 100
        ) {
            return back()
                ->withErrors([
                    'discount' =>
                        'Percentage discount cannot be greater than 100.',
                ])
                ->withInput();
        }

        $coupon->update($validated);

        return redirect()
            ->route('admin.coupons.index')
            ->with(
                'success',
                'Coupon updated successfully.'
            );
    }

    public function destroy(
        Coupon $coupon
    ): RedirectResponse {
        $coupon->delete();

        return redirect()
            ->route('admin.coupons.index')
            ->with(
                'success',
                'Coupon deleted successfully.'
            );
    }
}