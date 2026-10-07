<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShopController extends Controller
{
    // Display a listing of the products.
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $category = $request->input('category');
        $subcategory = $request->input('subcategory');
        $brand = $request->input('brand');

        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');

        $sort = $request->input('sort', 'latest');

        $productsQuery = Product::query()
            ->with([
                'category:id,name,slug',
                'subcategory:id,name,slug',
                'thumbnails',
                'inventories',
            ])

            // Search
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('brand', 'like', "%{$search}%")
                        ->orWhere(
                            'short_desp',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'long_desp',
                            'like',
                            "%{$search}%"
                        );
                });
            })

            // Category Filter
            ->when($category, function ($query, $category) {
                $query->whereHas('category', function ($query) use ($category) {
                    $query->where('slug', $category)
                        ->orWhere('id', $category);
                });
            })

            // Subcategory Filter
            ->when($subcategory, function ($query, $subcategory) {
                $query->whereHas('subcategory', function ($query) use ($subcategory) {
                    $query->where('slug', $subcategory)
                        ->orWhere('id', $subcategory);
                });
            })

            // Brand Filter
            ->when($brand, function ($query, $brand) {
                $query->where('brand', $brand);
            })

            // Minimum Price
            ->when(
                $minPrice !== null && $minPrice !== '',
                function ($query) use ($minPrice) {
                    $query->where('price', '>=', $minPrice);
                }
            )

            // Maximum Price
            ->when(
                $maxPrice !== null && $maxPrice !== '',
                function ($query) use ($maxPrice) {
                    $query->where('price', '<=', $maxPrice);
                }
            );

        // Sorting
        switch ($sort) {
            case 'price_low':
                $productsQuery->orderBy('price', 'asc');
                break;

            case 'price_high':
                $productsQuery->orderBy('price', 'desc');
                break;

            case 'name_asc':
                $productsQuery->orderBy('name', 'asc');
                break;

            case 'name_desc':
                $productsQuery->orderBy('name', 'desc');
                break;

            case 'latest':
            default:
                $productsQuery->latest();
                break;
        }

        // Pagination

        $products = $productsQuery
            ->paginate(12)
            ->withQueryString();

        // Categories

        $categories = Category::query()
            ->withCount('products')
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'slug',
            ]);

        // Subcategories
        $subcategories = Subcategory::query()
            ->withCount('products')
            ->orderBy('name')
            ->get([
                'id',
                'category_id',
                'name',
                'slug',
            ]);

        // Brands

        $brands = Product::query()
            ->whereNotNull('brand')
            ->where('brand', '!=', '')
            ->distinct()
            ->orderBy('brand')
            ->pluck('brand');

        // Price Range
        $priceRange = [
            'min' => (float) (Product::min('price') ?? 0),
            'max' => (float) (Product::max('price') ?? 0),
        ];

        // Send Data To Inertia
        return Inertia::render('Shop/Index', [
            'products' => $products,

            'categories' => $categories,

            'subcategories' => $subcategories,

            'brands' => $brands,

            'priceRange' => $priceRange,

            'filters' => [
                'search' => $search,
                'category' => $category,
                'subcategory' => $subcategory,
                'brand' => $brand,
                'min_price' => $minPrice,
                'max_price' => $maxPrice,
                'sort' => $sort,
            ],
        ]);
    }

    // Display a single product.
    public function show(Product $product): Response
    {
        // Load Product Relationships
        $product->load([
            'category:id,name,slug',
            'subcategory:id,name,slug',
            'thumbnails',
            'inventories',
        ]);

        // Related Products
        $relatedProducts = Product::query()
            ->with([
                'category:id,name,slug',
                'subcategory:id,name,slug',
                'thumbnails',
            ])
            ->where('id', '!=', $product->id)
            ->where(function ($query) use ($product) {
                $query->where(
                    'category_id',
                    $product->category_id
                );

                // Only use subcategory when product has one
                if ($product->subcategory_id) {
                    $query->orWhere(
                        'subcategory_id',
                        $product->subcategory_id
                    );
                }
            })
            ->latest()
            ->take(4)
            ->get();

        // Product Details Page
        return Inertia::render('Shop/Show', [
            'product' => $product,

            'relatedProducts' => $relatedProducts,
        ]);
    }
}