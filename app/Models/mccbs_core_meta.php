<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mccbs_core_meta extends Model
{
    use HasFactory;

    public function userRole()
    {
        return $this->belongsTo(User::class);
    }
}


