<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = [
        'name',
        'discount',
        'expire_date',
        'type',
    ];

    protected $casts = [
        'discount' => 'decimal:2',
        'expire_date' => 'date',
    ];
}
