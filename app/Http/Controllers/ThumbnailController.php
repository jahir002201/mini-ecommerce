<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Thumbnail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ThumbnailController extends Controller
{
    /**
     * Display all thumbnails.
     */
    public function index()
    {
        return Inertia::render('Admin/Thumbnails/Index', [
            'admin' => auth()->user(),
            'thumbnails' => Thumbnail::with('product')
                ->latest()
                ->paginate(10),
        ]);
    }

    /**
     * Show the create form.
     */
    public function create()
    {
        return Inertia::render('Admin/Thumbnails/Create', [
            'admin' => auth()->user(),
            'products' => Product::select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    /**
     * Store a new thumbnail.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => [
                'required',
                'integer',
                'exists:products,id',
            ],
            'thumbnail' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ]);

        $path = $request->file('thumbnail')
            ->store('thumbnails', 'public');

        Thumbnail::create([
            'product_id' => $validated['product_id'],
            'thumbnail' => $path,
        ]);

        return redirect()
            ->route('admin.thumbnails.index')
            ->with('success', 'Thumbnail uploaded successfully.');
    }

    /**
     * Display a single thumbnail.
     */
    public function show(Thumbnail $thumbnail)
    {
        $thumbnail->load('product');

        return Inertia::render('Admin/Thumbnails/Show', [
            'admin' => auth()->user(),
            'thumbnail' => $thumbnail,
        ]);
    }

    /**
     * Show the edit form.
     */
    public function edit(Thumbnail $thumbnail)
    {
        return Inertia::render('Admin/Thumbnails/Edit', [
            'admin' => auth()->user(),
            'thumbnail' => $thumbnail,
            'products' => Product::select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    /**
     * Update a thumbnail.
     */
    public function update(Request $request, Thumbnail $thumbnail)
    {
        $validated = $request->validate([
            'product_id' => [
                'required',
                'integer',
                'exists:products,id',
            ],
            'thumbnail' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ]);

        $thumbnail->product_id = $validated['product_id'];

        if ($request->hasFile('thumbnail')) {
            $newPath = $request->file('thumbnail')
                ->store('thumbnails', 'public');

            $oldPath = $thumbnail->thumbnail;

            $thumbnail->thumbnail = $newPath;
            $thumbnail->save();

            if (
                $oldPath &&
                Storage::disk('public')->exists($oldPath)
            ) {
                Storage::disk('public')->delete($oldPath);
            }

            return redirect()
                ->route('admin.thumbnails.index')
                ->with('success', 'Thumbnail updated successfully.');
        }

        $thumbnail->save();

        return redirect()
            ->route('admin.thumbnails.index')
            ->with('success', 'Thumbnail updated successfully.');
    }

    /**
     * Delete a thumbnail and its image file.
     */
    public function destroy(Thumbnail $thumbnail)
    {
        if (
            $thumbnail->thumbnail &&
            Storage::disk('public')->exists($thumbnail->thumbnail)
        ) {
            Storage::disk('public')->delete($thumbnail->thumbnail);
        }

        $thumbnail->delete();

        return redirect()
            ->route('admin.thumbnails.index')
            ->with('success', 'Thumbnail deleted successfully.');
    }
}
