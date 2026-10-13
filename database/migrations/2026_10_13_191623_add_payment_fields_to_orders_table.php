<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('payment_status')
                ->default('pending')
                ->after('status');

            $table->string('transaction_id')
                ->nullable()
                ->unique()
                ->after('payment_status');

            $table->timestamp('paid_at')
                ->nullable()
                ->after('transaction_id');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropUnique(['transaction_id']);
            $table->dropColumn([
                'payment_status',
                'transaction_id',
                'paid_at',
            ]);
        });
    }
};