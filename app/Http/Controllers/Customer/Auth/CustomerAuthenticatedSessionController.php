<?php

namespace App\Http\Controllers\Customer\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CustomerAuthenticatedSessionController extends Controller
{
    /**
     * Show customer login page.
     */
    public function create(): Response
    {
        return Inertia::render('Customer/Auth/Login');
    }

    /**
     * Handle customer login.
     */
    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['nullable', 'boolean'],
        ]);

        $remember = $credentials['remember'] ?? false;

        unset($credentials['remember']);

        if (! Auth::guard('customer')->attempt($credentials, $remember)) {
            return back()
                ->withErrors([
                    'email' => 'The provided credentials are incorrect.',
                ])
                ->onlyInput('email');
        }

        $request->session()->regenerate();

        return redirect()->intended(
            route('customer.account')
        );
    }

    /**
     * Logout customer.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('customer')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('customer.login');
    }
}