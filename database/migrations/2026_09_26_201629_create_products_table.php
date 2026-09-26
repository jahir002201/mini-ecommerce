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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
             $table->string('name');
            $table->string('brand')->nullable();

            $table->decimal('price', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('after_discount', 10, 2);

            $table->string('short_desp')->nullable();
            $table->longText('long_desp')->nullable();

            $table->string('preview')->nullable();
            $table->string('slug')->unique();

            $table->foreignId('category_id')
                ->constrained('categories')
                ->cascadeOnDelete();

            $table->foreignId('subcategory_id')
                ->nullable()
                ->constrained('subcategories')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
