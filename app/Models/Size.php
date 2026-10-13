<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Size extends Model
{
    protected $fillable = ['name'];

    public function inventories(): HasMany
    {
        return $this->hasMany(Inventory::class);
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }
}