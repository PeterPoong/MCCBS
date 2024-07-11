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
        Schema::create('mccbs_authorities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('department')->nullable();
            $table->integer('authority_status')->default(1);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('mccbs_users')->onDelete('set null');
            $table->foreign('department')->references('id')->on('mccbs_departments')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mccbs_authorities');
    }
};
