<?php

namespace App\Http\Controllers\Api;

use App\Models\PhoneBook;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PhoneBookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Auth::user();
        $phonesBook = $data->phonesBook;

        $response = ['success'=>true, 'data'=>$phonesBook];
        return response()->json($response, 201);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name'      => 'required',
            'email'     => 'required',
            'telephone' => 'required',
        ]);


        if ($validator->fails()) {

            $errors = $validator->errors();

            $response = ['success'=>false, 'data'=>$errors];
            return response()->json($response, 201);
        }

        $user = Auth::user();

        $data = PhoneBook::create([
            'name'      => $request->input('name'),
            'email'     => $request->input('email'),
            'telephone' => $request->input('telephone'),
            'company'   => $request->input('company'),
            'user_id'   => $user->id
        ]);

        $response = ['success'=>true, 'data'=>$data];
        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       $data = PhoneBook::find($id);

       $user = Auth::user();

        if($data['user_id'] != $user->id){

            $errors = "Este numero não percente a lista de visulização do usuario logado.";

            $response = ['success'=>false, 'data'=>$errors];
            return response()->json($response, 201);
        }


        $response = ['success'=>true, 'data'=>$data];
        return response()->json($response, 201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = PhoneBook::find($id);

        $user = Auth::user();

        if($data['user_id'] != $user->id){

            $errors = "Este numero não percente a lista de visulização do usuario logado.";

            $response = ['success'=>false, 'data'=>$errors];
            return response()->json($response, 201);
        }


        $response = ['success'=>true, 'data'=>$data];
        return response()->json($response, 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = PhoneBook::find($id);

        $user = Auth::user();

        if($data['user_id'] != $user->id){

            $errors = "Este numero não percente a lista de visulização do usuario logado.";

            $response = ['success'=>false, 'data'=>$errors];
            return response()->json($response, 201);
        }

        $data->delete();

        $response = ['success'=>true, 'data'=>[]];
        return response()->json($response, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update1(Request $request, $id)
    {

//        dd('update');
//        dd($id,$request->all());


        $data = PhoneBook::find($id);

        $user = Auth::user();

        if($data['user_id'] != $user->id){

            $errors = "Este numero não percente a lista de visulização do usuario logado.";

            $response = ['success'=>false, 'data'=>$errors];
            return response()->json($response, 201);
        }

        $validator = Validator::make($request->all(), [
            'name'      => 'required',
            'email'     => 'required',
            'telephone' => 'required',
        ]);


        if ($validator->fails()) {

            $errors = $validator->errors();

            $response = ['success'=>false, 'data'=>$errors];
            return response()->json($response, 201);
        }

        $data->name      = $request->input('name');
        $data->email     = $request->input('email');
        $data->telephone = $request->input('telephone');
        $data->company   = $request->input('company');
        $data->save();

        $response = ['success'=>true, 'data'=>$data];
        return response()->json($response, 201);
    }


}
