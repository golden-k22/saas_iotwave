<?php

namespace App\Http\Controllers\Tenancy;

use App\Http\Controllers\Controller;
use App\Tenant;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    /**
     * Show tenant dashboard
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Contracts\Foundation\Application
     */
    public function index()
    {
        $user = auth()->user();
        $tenant_id = $user->tenant_id? $user->tenant_id : $user->username;
        $tenant = Tenant::find($tenant_id);

        $gateway_added = 0;
        $sensor_added = 0;
        $sms_utilization = [];
        $gateway_response = Http::get(env('MIX_IOT_APP_URL', '').'/iot-service/v1/'.$tenant_id.'/gateways/counts', []);
        $sensor_response = Http::get(env('MIX_IOT_APP_URL', '').'/iot-service/v1/'.$tenant_id.'/devices/counts', []);
        $sms_utilization_response = Http::get(env('MIX_IOT_APP_URL', '').'/iot-service/v1/'.$tenant_id.'/utilizations', []);
        if($gateway_response->successful()){
            $gateway_added = json_decode($gateway_response->body())->count;
        }
        if($sensor_response->successful()){
            $sensor_added = json_decode($sensor_response->body())->count;
        }
        if($sms_utilization_response->successful()){
            $sms_utilization = json_decode($sms_utilization_response->body());
        }

        return View('tenancy.dashboard')
            ->with("tenant", $tenant)
            ->with("gateway_added", $gateway_added)
            ->with("sensor_added", $sensor_added)
            ->with("sms_utilization", $sms_utilization);
    }
}
