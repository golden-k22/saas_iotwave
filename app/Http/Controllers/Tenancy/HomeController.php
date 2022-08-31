<?php

namespace App\Http\Controllers\Tenancy;

use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    /**
     * Show tenant dashboard
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Contracts\Foundation\Application
     */
    public function index()
    {
        return View('tenancy.dashboard')->with("tenancy", tenant('id'));
    }
}
