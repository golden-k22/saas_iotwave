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
        $inactive=["sensors"=>0, "gateways"=>0];
        $temperature_status = ["critical"=>0, "warning"=>0];
        $humidity_status = ["critical"=>0, "warning"=>0];
        $voltage_status = ["critical"=>0, "warning"=>0];

        $gateway_response = Http::get(env('MIX_IOT_APP_URL', '').'/iot-service/v1/'.$tenant_id.'/gateways/counts', []);
        $sensor_response = Http::get(env('MIX_IOT_APP_URL', '').'/iot-service/v1/'.$tenant_id.'/devices/counts', []);
        $sms_utilization_response = Http::get(env('MIX_IOT_APP_URL', '').'/iot-service/v1/'.$tenant_id.'/utilizations', []);
        $inactive_sensors_response = Http::get(env('MIX_IOT_APP_URL', '').'/iot-service/v1/'.$tenant_id.'/alarms/records/security/counts', []);
        $temperature_status_response = Http::get(env('MIX_IOT_APP_URL', '').'/iot-service/v1/'.$tenant_id.'/alarms/records/no_security/counts', ["type"=>0]);
        $humidity_status_response = Http::get(env('MIX_IOT_APP_URL', '').'/iot-service/v1/'.$tenant_id.'/alarms/records/no_security/counts', ["type"=>1]);
        $voltage_status_response = Http::get(env('MIX_IOT_APP_URL', '').'/iot-service/v1/'.$tenant_id.'/alarms/records/no_security/counts', ["type"=>2]);

        if($gateway_response->successful()){
            $gateway_added = json_decode($gateway_response->body())->count;
        }
        if($sensor_response->successful()){
            $sensor_added = json_decode($sensor_response->body())->count;
        }
        if($sms_utilization_response->successful()){
            $sms_utilization = json_decode($sms_utilization_response->body());
        }
        if($inactive_sensors_response->successful()){
            $inactive["sensors"] = json_decode($inactive_sensors_response->body())->devices;
            $inactive["gateways"] = json_decode($inactive_sensors_response->body())->gateways;
        }
        if($temperature_status_response->successful()){
            $temperature_status['critical'] = json_decode($temperature_status_response->body())->critical;
            $temperature_status['warning'] = json_decode($temperature_status_response->body())->warning;
        }
        if($humidity_status_response->successful()){
            $humidity_status['critical'] = json_decode($humidity_status_response->body())->critical;
            $humidity_status['warning'] = json_decode($humidity_status_response->body())->warning;
        }
        if($voltage_status_response->successful()){
            $voltage_status['critical'] = json_decode($voltage_status_response->body())->critical;
            $voltage_status['warning'] = json_decode($voltage_status_response->body())->warning;
        }

        return View('tenancy.dashboard')
            ->with("tenant", $tenant)
            ->with("gateway_added", $gateway_added)
            ->with("sensor_added", $sensor_added)
            ->with("sms_utilization", $sms_utilization)
            ->with("inactive", $inactive)
            ->with("temperature_status", $temperature_status)
            ->with("humidity_status", $humidity_status)
            ->with("voltage_status", $voltage_status);
    }
}
