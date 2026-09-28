<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class CustomerPasswordController extends Controller
{
    /**
     * Show password change page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Customer/Password/Edit');
    }

    /**
     * Update customer password.
     */
    public function update(Request $request): RedirectResponse
    {
        $customer = $request->user('customer');

        $validated = $request->validate([
            'current_password' => [
                'required',
                'string',
            ],

            'password' => [
                'required',
                'confirmed',
                Password::defaults(),
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Verify Current Password
        |--------------------------------------------------------------------------
        */

        if (! Hash::check(
            $validated['current_password'],
            $customer->password
        )) {
            return back()->withErrors([
                'current_password' => 'The current password is incorrect.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Prevent Same Password
        |--------------------------------------------------------------------------
        */

        if (Hash::check(
            $validated['password'],
            $customer->password
        )) {
            return back()->withErrors([
                'password' => 'Your new password must be different from your current password.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Password
        |--------------------------------------------------------------------------
        */

        $customer->update([
            'password' => $validated['password'],
        ]);

        return redirect()
            ->route('customer.account')
            ->with('success', 'Password changed successfully.');
    }
}