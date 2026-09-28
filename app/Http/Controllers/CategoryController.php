<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display all categories.
     */
    public function index(): Response
    {
        $categories = Category::query()
            ->withCount([
                'subcategories',
                'products',
            ])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show create category page.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Categories/Create');
    }

    /**
     * Store a new category.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:categories,name',
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'icon' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Upload Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('categories', 'public');
        }

        Category::create($validated);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Category created successfully.');
    }

    /**
     * Display a single category.
     */
    public function show(Category $category): Response
    {
        $category->load([
            'subcategories',
            'products',
        ]);

        return Inertia::render('Admin/Categories/Show', [
            'category' => $category,
        ]);
    }

    /**
     * Show edit category page.
     */
    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update category.
     */
    public function update(
        Request $request,
        Category $category
    ): RedirectResponse {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'name')
                    ->ignore($category->id),
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'icon' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Replace Existing Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {
            if (
                $category->image &&
                Storage::disk('public')->exists($category->image)
            ) {
                Storage::disk('public')->delete($category->image);
            }

            $validated['image'] = $request
                ->file('image')
                ->store('categories', 'public');
        }

        $category->update($validated);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Delete category.
     */
    public function destroy(Category $category): RedirectResponse
    {
        /*
        |--------------------------------------------------------------------------
        | Delete Image
        |--------------------------------------------------------------------------
        */

        if (
            $category->image &&
            Storage::disk('public')->exists($category->image)
        ) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}