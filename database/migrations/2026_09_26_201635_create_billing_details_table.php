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
        Schema::create('billing_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')
                ->constrained('orders')
                ->cascadeOnDelete();

            $table->foreignId('customer_id')
                ->constrained('customers')
                ->cascadeOnDelete();

            $table->string('name');
            $table->string('email');
            $table->string('mobile_number');

            $table->string('company')->nullable();
            $table->text('address');

            $table->unsignedBigInteger('country_id')->nullable();
            $table->unsignedBigInteger('city_id')->nullable();

            $table->string('zip')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billing_details');
    }
};
