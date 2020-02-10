<?php

namespace App;

use App\Models\PhoneBook;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'auth_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Obtem o token que será armazenado na solicitação do JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Retorna uma matriz de dados contendo quaisquer tokens personalizados na solicitação a serem add no JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * <b>PhonesBook</b> Método responsável em definir o relacionamento entre suas tabelas
     */
    public function phonesBook()
    {
        return $this->hasMany(PhoneBook::class, 'user_id')->orderBy('name', 'asc');
    }
}
