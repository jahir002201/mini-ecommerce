<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InventoryController extends Controller
{
    public function index(): Response
    {
        $inventories = Inventory::query()
            ->with([
                'product',
                'size',
                'color',
            ])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Inventories/Index', [
            'inventories' => $inventories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Inventories/Create', [
            'products' => Product::query()
                ->orderBy('name')
                ->get(['id', 'name']),

            'sizes' => Size::query()
                ->orderBy('name')
                ->get(['id', 'name']),

            'colors' => Color::query()
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                    'color_code',
                ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => [
                'required',
                'integer',
                'min:0',
            ],

            'product_id' => [
                'required',
                'exists:products,id',
            ],

            'size_id' => [
                'nullable',
                'exists:sizes,id',
            ],

            'color_id' => [
                'nullable',
                'exists:colors,id',
            ],
        ]);

        Inventory::create($validated);

        return redirect()
            ->route('admin.inventories.index')
            ->with(
                'success',
                'Inventory created successfully.'
            );
    }

    public function show(Inventory $inventory): Response
    {
        $inventory->load([
            'product',
            'size',
            'color',
        ]);

        return Inertia::render('Admin/Inventories/Show', [
            'inventory' => $inventory,
        ]);
    }

    public function edit(Inventory $inventory): Response
    {
        return Inertia::render('Admin/Inventories/Edit', [
            'inventory' => $inventory,

            'products' => Product::query()
                ->orderBy('name')
                ->get(['id', 'name']),

            'sizes' => Size::query()
                ->orderBy('name')
                ->get(['id', 'name']),

            'colors' => Color::query()
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                    'color_code',
                ]),
        ]);
    }

    public function update(
        Request $request,
        Inventory $inventory
    ): RedirectResponse {
        $validated = $request->validate([
            'quantity' => [
                'required',
                'integer',
                'min:0',
            ],

            'product_id' => [
                'required',
                'exists:products,id',
            ],

            'size_id' => [
                'nullable',
                'exists:sizes,id',
            ],

            'color_id' => [
                'nullable',
                'exists:colors,id',
            ],
        ]);

        $inventory->update($validated);

        return redirect()
            ->route('admin.inventories.index')
            ->with(
                'success',
                'Inventory updated successfully.'
            );
    }

    public function destroy(
        Inventory $inventory
    ): RedirectResponse {
        $inventory->delete();

        return redirect()
            ->route('admin.inventories.index')
            ->with(
                'success',
                'Inventory deleted successfully.'
            );
    }
}