<?php

namespace App\Http\Controllers\Tenancy;

use App\Http\Controllers\Controller;

class BasicSettingsController extends Controller
{
    /**
     * Manage gateways
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function gateway(){
        return View('tenancy.basic.gateway');
    }

    /**
     * Manage gateways
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function group(){
        return View('tenancy.basic.group');
    }

    /**
     * Manage devices
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function device(){
        return View('tenancy.basic.device');
    }
}