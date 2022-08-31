<?php

namespace App\Http\Controllers\Tenancy;

class ProfileController extends \Wave\Http\Controllers\ProfileController
{
    public function index($username)
    {
        $user = config('wave.user_model')::where('username', '=', $username)->firstOrFail();
        return view('tenancy.profile', compact('user'));
    }
}