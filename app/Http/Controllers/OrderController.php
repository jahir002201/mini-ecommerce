<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     */
    public function index(): Response
    {
        $orders = Order::query()
            ->with('customer')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show the form for creating a new order.
     */
    public function create(): Response
    {
        $customers = Customer::query()
            ->select('id', 'name', 'email')
            ->latest()
            ->get();

        return Inertia::render('Admin/Orders/Create', [
            'customers' => $customers,
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'order_id' => [
                'required',
                'string',
                'max:255',
                'unique:orders,order_id',
            ],
            'customer_id' => [
                'required',
                'exists:customers,id',
            ],
            'sub_total' => [
                'required',
                'numeric',
                'min:0',
            ],
            'discount' => [
                'nullable',
                'numeric',
                'min:0',
            ],
            'charge' => [
                'nullable',
                'numeric',
                'min:0',
            ],
            'total' => [
                'required',
                'numeric',
                'min:0',
            ],
            'paymentmethod' => [
                'required',
                'string',
                'max:100',
            ],
            'status' => [
                'required',
                'string',
                'max:50',
            ],
        ]);

        Order::create($validated);

        return redirect()
            ->route('admin.orders.index')
            ->with('success', 'Order created successfully.');
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order): Response
    {
        $order->load([
            'customer',
            'billingDetail',
            'orderProducts.product',
            'orderProducts.color',
            'orderProducts.size',
        ]);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified order.
     */
    public function edit(Order $order): Response
    {
        $order->load('customer');

        return Inertia::render('Admin/Orders/Edit', [
            'order' => $order,
        ]);
    }

    /**
     * Update the specified order.
     */
    public function update(
        Request $request,
        Order $order
    ): RedirectResponse {
        $validated = $request->validate([
            'status' => [
                'required',
                'string',
                'max:50',
            ],
            'paymentmethod' => [
                'required',
                'string',
                'max:100',
            ],
            'discount' => [
                'nullable',
                'numeric',
                'min:0',
            ],
            'charge' => [
                'nullable',
                'numeric',
                'min:0',
            ],
            'total' => [
                'required',
                'numeric',
                'min:0',
            ],
        ]);

        $order->update($validated);

        return redirect()
            ->route('admin.orders.index')
            ->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified order.
     */
    public function destroy(Order $order): RedirectResponse
    {
        $order->delete();

        return redirect()
            ->route('admin.orders.index')
            ->with('success', 'Order deleted successfully.');
    }
}