<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'categories' => Category::query()
                ->latest()
                ->take(8)
                ->get(),

            'featuredProducts' => Product::query()
                ->with([
                    'category',
                    'subcategory',
                    'thumbnails',
                ])
                ->latest()
                ->take(8)
                ->get(),

            'latestProducts' => Product::query()
                ->with([
                    'category',
                    'subcategory',
                    'thumbnails',
                ])
                ->latest()
                ->take(8)
                ->get(),
        ]);
    }
}