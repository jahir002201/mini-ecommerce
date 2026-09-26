<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
             $table->unsignedInteger('quantity')->default(0);

            $table->foreignId('product_id')
                ->constrained('products')
                ->cascadeOnDelete();

            $table->foreignId('size_id')
                ->nullable()
                ->constrained('sizes')
                ->nullOnDelete();

            $table->foreignId('color_id')
                ->nullable()
                ->constrained('colors')
                ->nullOnDelete();
            $table->timestamps();
            $table->unique(['product_id', 'size_id', 'color_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
