<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SubcategoryController extends Controller
{
    public function index(): Response
    {
        $subcategories = Subcategory::query()
            ->with('category')
            ->withCount('products')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Subcategories/Index', [
            'subcategories' => $subcategories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Subcategories/Create', [
            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'category_id' => [
                'required',
                'exists:categories,id',
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('subcategories', 'public');
        }

        Subcategory::create($validated);

        return redirect()
            ->route('admin.subcategories.index')
            ->with('success', 'Subcategory created successfully.');
    }

    public function show(Subcategory $subcategory): Response
    {
        $subcategory->load([
            'category',
            'products',
        ]);

        return Inertia::render('Admin/Subcategories/Show', [
            'subcategory' => $subcategory,
        ]);
    }

    public function edit(Subcategory $subcategory): Response
    {
        return Inertia::render('Admin/Subcategories/Edit', [
            'subcategory' => $subcategory,

            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function update(
        Request $request,
        Subcategory $subcategory
    ): RedirectResponse {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'category_id' => [
                'required',
                'exists:categories,id',
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ]);

        if ($request->hasFile('image')) {
            if (
                $subcategory->image &&
                Storage::disk('public')->exists($subcategory->image)
            ) {
                Storage::disk('public')->delete(
                    $subcategory->image
                );
            }

            $validated['image'] = $request
                ->file('image')
                ->store('subcategories', 'public');
        }

        $subcategory->update($validated);

        return redirect()
            ->route('admin.subcategories.index')
            ->with('success', 'Subcategory updated successfully.');
    }

    public function destroy(Subcategory $subcategory): RedirectResponse
    {
        if (
            $subcategory->image &&
            Storage::disk('public')->exists($subcategory->image)
        ) {
            Storage::disk('public')->delete(
                $subcategory->image
            );
        }

        $subcategory->delete();

        return redirect()
            ->route('admin.subcategories.index')
            ->with('success', 'Subcategory deleted successfully.');
    }
}