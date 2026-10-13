<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SizeController extends Controller
{
    public function index()
    {
        $sizes = Size::latest()->paginate(10);

        return Inertia::render('Admin/Sizes/Index', [
            'sizes' => $sizes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Sizes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50', 'unique:sizes,name'],
        ]);

        Size::create($validated);

        return redirect()
            ->route('admin.sizes.index')
            ->with('success', 'Size created successfully.');
    }

    public function show(Size $size)
    {
        return Inertia::render('Admin/Sizes/Show', [
            'size' => $size,
        ]);
    }

    public function edit(Size $size)
    {
        return Inertia::render('Admin/Sizes/Edit', [
            'size' => $size,
        ]);
    }

    public function update(Request $request, Size $size)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:50',
                Rule::unique('sizes', 'name')->ignore($size->id),
            ],
        ]);

        $size->update($validated);

        return redirect()
            ->route('admin.sizes.index')
            ->with('success', 'Size updated successfully.');
    }

    public function destroy(Size $size)
    {
        // Prevent deleting sizes that are used by inventory or cart items.
        if (
            $size->inventories()->exists() ||
            $size->carts()->exists()
        ) {
            return back()->with(
                'error',
                'This size is currently in use and cannot be deleted.'
            );
        }

        $size->delete();

        return redirect()
            ->route('admin.sizes.index')
            ->with('success', 'Size deleted successfully.');
    }
}