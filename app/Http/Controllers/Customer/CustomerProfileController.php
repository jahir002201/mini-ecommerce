<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CustomerProfileController extends Controller
{
    /**
     * Show customer profile edit page.
     */
    public function edit(Request $request): Response
    {
        $customer = $request->user('customer');

        return Inertia::render('Customer/Profile/Edit', [
            'customer' => $customer,
        ]);
    }

    /**
     * Update customer profile.
     */
    public function update(Request $request): RedirectResponse
    {
        $customer = $request->user('customer');

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('customers', 'email')
                    ->ignore($customer->id),
            ],

            'country' => [
                'nullable',
                'string',
                'max:255',
            ],

            'address' => [
                'nullable',
                'string',
                'max:1000',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:30',
            ],
        ]);

        $customer->update($validated);

        return redirect()
            ->route('customer.profile.edit')
            ->with('success', 'Profile updated successfully.');
    }
}