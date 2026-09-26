<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function category():BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function subcategory():BelongsTo
    {
        return $this->belongsTo(Subcategory::class);
    }

}