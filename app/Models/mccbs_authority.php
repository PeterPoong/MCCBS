<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class mccbs_authority extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'department',
        'authority_status',
    ];

    public function AuthrityUser()
    {
        return $this->hasOne(User::class,'id','user_id');
    }

    public function AuthrityDepartment()
    {
        return $this->hasMany(mccbs_department::class,'id','department');
    }
}
