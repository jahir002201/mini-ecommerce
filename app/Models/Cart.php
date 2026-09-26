<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cart extends Model
{
     protected $fillable = [
        'customer_id',
        'product_id',
        'color_id',
        'size_id',
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function color(): BelongsTo
    {
        return $this->belongsTo(Color::class);
    }

    public function size(): BelongsTo
    {
        return $this->belongsTo(Size::class);
    }
}
