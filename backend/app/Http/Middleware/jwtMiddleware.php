<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;

class jwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * O jwt valida sua autenticidade descriptografando o token
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::toUser($request->input('token'));
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return $next($request);
                return response()->json(['error'=>'Token invalido']);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return $next($request);
                return response()->json(['error'=>'Token expirado']);
            }else{
                return $next($request);
                return response()->json(['error'=>'Algo de errado aconteceu']);
            }
        }
        return $next($request);
    }
}
