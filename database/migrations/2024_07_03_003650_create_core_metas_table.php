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
        Schema::create('core_metas', function (Blueprint $table) {
            $table->id();
            $table->string('core_meta_type')->nullable();
            $table->string('core_meta_name')->nullable();
            $table->integer('core_meta_status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('core_metas');
    }
};
