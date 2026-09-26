<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Thumbnail extends Model
{
    protected $fillable = [
        'thumbnail',
        'product_id',
    ];

    public function product():BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
