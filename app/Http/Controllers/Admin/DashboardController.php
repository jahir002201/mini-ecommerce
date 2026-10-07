<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\Customer;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $recentOrders = Order::query()
            ->with(['user'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'admin' => $request->user(),

            'stats' => [
                'products' => Product::count(),
                'categories' => Category::count(),

                'customers' => Customer::count(),

                'orders' => Order::count(),
            ],

            'recentOrders' => $recentOrders,
        ]);
    }
}