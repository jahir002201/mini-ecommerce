<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderProduct extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'price',
        'color_id',
        'size_id',
        'quantity',
        'review',
        'star',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'quantity' => 'integer',
        'star' => 'integer',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
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
