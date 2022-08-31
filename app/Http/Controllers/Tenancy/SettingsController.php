<?php

namespace App\Http\Controllers\Tenancy;

class SettingsController extends \Wave\Http\Controllers\SettingsController
{
    public function index($section = ''){
        if(empty($section)){
            return redirect(route('tenancy.settings', ['section'=>'profile', 'tenant'=>tenant('id')]));
        }
        return view('tenancy.settings.index', compact('section'));
    }
}