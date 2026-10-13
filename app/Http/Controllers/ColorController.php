<?php

namespace App\Http\Controllers;

use App\Models\Color;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ColorController extends Controller
{
    public function index()
    {
        $colors = Color::latest()->paginate(10);

        return Inertia::render('Admin/Colors/Index', [
            'colors' => $colors,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Colors/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50', 'unique:colors,name'],
            'color_code' => [
                'required',
                'string',
                'regex:/^#[0-9A-Fa-f]{6}$/',
            ],
        ]);

        Color::create($validated);

        return redirect()
            ->route('admin.colors.index')
            ->with('success', 'Color created successfully.');
    }

    public function show(Color $color)
    {
        return Inertia::render('Admin/Colors/Show', [
            'color' => $color,
        ]);
    }

    public function edit(Color $color)
    {
        return Inertia::render('Admin/Colors/Edit', [
            'color' => $color,
        ]);
    }

    public function update(Request $request, Color $color)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:50',
                Rule::unique('colors', 'name')->ignore($color->id),
            ],
            'color_code' => [
                'required',
                'string',
                'regex:/^#[0-9A-Fa-f]{6}$/',
            ],
        ]);

        $color->update($validated);

        return redirect()
            ->route('admin.colors.index')
            ->with('success', 'Color updated successfully.');
    }

    public function destroy(Color $color)
    {
        // Prevent deleting colors that are used by inventory or cart items.
        if (
            $color->inventories()->exists() ||
            $color->carts()->exists()
        ) {
            return back()->with(
                'error',
                'This color is currently in use and cannot be deleted.'
            );
        }

        $color->delete();

        return redirect()
            ->route('admin.colors.index')
            ->with('success', 'Color deleted successfully.');
    }
}