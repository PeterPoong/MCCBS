<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mccbs_department extends Model
{

    protected $fillable = [
        'department_name',
    ];

    use HasFactory;
}
