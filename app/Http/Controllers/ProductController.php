<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Subcategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->with([
                'category',
                'subcategory',
            ])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name']),

            'subcategories' => Subcategory::query()
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                    'category_id',
                ]),
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

            'brand' => [
                'nullable',
                'string',
                'max:255',
            ],

            'price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'discount' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'after_discount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'short_desp' => [
                'nullable',
                'string',
            ],

            'long_desp' => [
                'nullable',
                'string',
            ],

            'preview' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'slug' => [
                'nullable',
                'string',
                'max:255',
                'unique:products,slug',
            ],

            'category_id' => [
                'required',
                'exists:categories,id',
            ],

            'subcategory_id' => [
                'nullable',
                'exists:subcategories,id',
            ],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = $this->generateUniqueSlug(
                $validated['name']
            );
        }

        if ($request->hasFile('preview')) {
            $validated['preview'] = $request
                ->file('preview')
                ->store('products', 'public');
        }

        Product::create($validated);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    public function show(Product $product): Response
    {
        $product->load([
            'category',
            'subcategory',
            'thumbnails',
            'inventories',
        ]);

        return Inertia::render('Admin/Products/Show', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,

            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name']),

            'subcategories' => Subcategory::query()
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                    'category_id',
                ]),
        ]);
    }

    public function update(
        Request $request,
        Product $product
    ): RedirectResponse {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'brand' => [
                'nullable',
                'string',
                'max:255',
            ],

            'price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'discount' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'after_discount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'short_desp' => [
                'nullable',
                'string',
            ],

            'long_desp' => [
                'nullable',
                'string',
            ],

            'preview' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products', 'slug')
                    ->ignore($product->id),
            ],

            'category_id' => [
                'required',
                'exists:categories,id',
            ],

            'subcategory_id' => [
                'nullable',
                'exists:subcategories,id',
            ],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = $this->generateUniqueSlug(
                $validated['name'],
                $product->id
            );
        }

        if ($request->hasFile('preview')) {
            if (
                $product->preview &&
                Storage::disk('public')->exists($product->preview)
            ) {
                Storage::disk('public')->delete(
                    $product->preview
                );
            }

            $validated['preview'] = $request
                ->file('preview')
                ->store('products', 'public');
        }

        $product->update($validated);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        if (
            $product->preview &&
            Storage::disk('public')->exists($product->preview)
        ) {
            Storage::disk('public')->delete($product->preview);
        }

        $product->delete();

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }

    private function generateUniqueSlug(
        string $name,
        ?int $ignoreId = null
    ): string {
        $slug = Str::slug($name);

        if ($slug === '') {
            $slug = 'product';
        }

        $originalSlug = $slug;
        $counter = 1;

        while (
            Product::query()
                ->where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn ($query) => $query->where(
                        'id',
                        '!=',
                        $ignoreId
                    )
                )
                ->exists()
        ) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}