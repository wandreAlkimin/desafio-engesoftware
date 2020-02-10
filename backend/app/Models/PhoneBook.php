<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhoneBook extends Model
{
    protected $table = 'phones_book';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'telephone', 'company','user_id'
    ];
}
