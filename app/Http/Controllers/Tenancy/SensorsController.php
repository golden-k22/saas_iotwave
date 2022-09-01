<?php

namespace App\Http\Controllers\Tenancy;

use App\Http\Controllers\Controller;

class SensorsController extends Controller
{
    /**
     * Show Real time monitoring view
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function realTime(){
        return View('tenancy.sensors.real');
    }

    /**
     * Show report view
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function report(){
        return View('tenancy.sensors.report');
    }
}