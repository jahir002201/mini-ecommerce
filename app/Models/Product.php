<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'brand',
        'price',
        'discount',
        'after_discount',
        'short_desp',
        'long_desp',
        'preview',
        'slug',
        'category_id',
        'subcategory_id',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'discount' => 'decimal:2',
            'after_discount' => 'decimal:2',
        ];
    }

    public function sizes(): BelongsToMany
    {
        return $this->belongsToMany(
            Size::class,
            'inventories',
            'product_id',
            'size_id'
        )
            ->whereNotNull('sizes.id')
            ->distinct();
    }

    public function colors(): BelongsToMany
    {
        return $this->belongsToMany(
            Color::class,
            'inventories',
            'product_id',
            'color_id'
        )
            ->whereNotNull('colors.id')
            ->distinct();
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function thumbnails(): HasMany
    {
        return $this->hasMany(Thumbnail::class);
    }

    public function inventories(): HasMany
    {
        return $this->hasMany(Inventory::class);
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function orderProducts(): HasMany
    {
        return $this->hasMany(OrderProduct::class);
    }

}