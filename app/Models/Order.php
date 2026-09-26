<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'order_id',
        'customer_id',
        'sub_total',
        'total',
        'discount',
        'charge',
        'payment_method',
        'status',
    ];

    protected $casts = [
        'sub_total' => 'decimal:2',
        'total' => 'decimal:2',
        'discount' => 'decimal:2',
        'charge' => 'decimal:2',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function billingDetails(): HasMany
    {
        return $this->hasMany(BillingDetail::class);
    }

    public function orderProducts(): HasMany
    {
        return $this->hasMany(OrderProduct::class);
    }
}
