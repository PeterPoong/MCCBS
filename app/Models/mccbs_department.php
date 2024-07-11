<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mccbs_department extends Model
{

    protected $fillable = [
        'department_name',
        'department_status'
    ];

    use HasFactory;
    public function userDepartment()
    {
        return $this->belongsTo(User::class);
    }

    public function authority()
    {
        return $this->belongsToMany(mccbs_authority::class);
    }
}
