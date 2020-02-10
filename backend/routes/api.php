<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// rotas protegidas
Route::group(['middleware' => ['jwt.auth','apireader']], function () {

    Route::apiResource('phones', 'Api\PhoneBookController');
    Route::post('phones/update/{id}', 'Api\PhoneBookController@update1');
    Route::post('phones/delete/{id}', 'Api\PhoneBookController@destroy');


});

// Rota para quem ainda não tem o token
Route::group(['middleware' => 'apireader'], function () {

    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
});
