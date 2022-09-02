<?php

namespace App\Http\Controllers\Tenancy;

use App\Http\Controllers\Controller;

class AlarmController extends Controller
{
    /**
     * Show alarm settings page
     * @param string $section
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function settings($section = ''){
        if(empty($section)){
            return redirect(route('tenancy.alarm.setting', ['section'=>'temperature', 'tenant'=>tenant('id')]));
        }
        return view('tenancy.alarm.settings', compact('section'));
    }


    /**
     * Show alarm records
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function record(){
        return view('tenancy.alarm.record');
    }
}