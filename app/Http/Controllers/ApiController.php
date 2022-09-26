<?php

namespace App\Http\Controllers;

use App\Tenant;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    /**
     * Get max sensor count and gateway count for current plan
     * @param Request $request
     * @return JsonResponse
     */
    public function getLimitation(Request $request){
        $res = [
            'gateways' => 0,
            'sensors' => 0
        ];

        // has tenant param
        if($request->query('tenant')){
            $tenant = Tenant::find($request->query('tenant'));
            // tenant is existed
            if($tenant){
                $res['gateways'] = $tenant->gateway;
                $res['sensors'] = $tenant->sensor;
            } else {
                return response()->json([
                    'message' => 'Not found tenant with name of '.$request->query('tenant')
                ], 400);
            }
        } // no tenant param in the request
        else {
            return response()->json([
                'message' => 'Not found tenant id'
            ], 400);
        }

        return response()->json($res);
    }

    /**
     * Get list of email addresses and phone numbers to push notifications via SMS and Email when new alarm is triggered
     * @param Request $request
     * @return JsonResponse
     */
    public function getNotificationTargets(Request $request){
        $res = [
            'emails' => [],
            'phones' => []
        ];

        // has tenant param
        if($request->query('tenant')){
            $tenant = Tenant::find($request->query('tenant'));
            // tenant is existed
            if($tenant){
                $available_email_count = $tenant->email_total - $tenant->email_sent;
                $available_sms_count = $tenant->sms_total - $tenant->email_sent;
                $emails = User::where('tenant_id', $request->query('tenant'))->where('mailable', true)->pluck('email')->toArray();
                $phones = User::where('tenant_id', $request->query('tenant'))->where('messagable', true)->whereNotNull('phone')->pluck('phone')->toArray();
                $res['emails'] = array_merge($res['emails'], array_slice($emails, 0, $available_email_count));
                $res['phones'] = array_merge($res['phones'], array_slice($phones, 0, $available_sms_count));
            } else {
                return response()->json([
                    'message' => 'Not found tenant with name of '.$request->query('tenant')
                ], 400);
            }
        } // no tenant param in the request
        else {
            return response()->json([
                'message' => 'Not found tenant id'
            ], 400);
        }

        return response()->json($res);
    }

    /**
     * Update SMS/Mail notification counts so far for the current plan
     * @param Request $request
     * @return JsonResponse
     */
    public function updateNoficationSentCount(Request $request){
        $tenant = Tenant::find($request->query('tenant'));
        // not set notification type
        if($request->query('type') == null){
            return response()->json([
                'message' => 'Invalid notification type: '.$request->query('type')
            ], 400);
        }
        // found tenant
        if ($tenant){
            if ($request->query('type') == 0 || $request->query('type') == 1){
                $request->query('type') == 0 ? $tenant->email_sent = $tenant->email_sent + 1 : $tenant->sms_sent = $tenant->sms_sent + 1;
                $tenant->save();
                return response()->json([], 200);
            } else {
                return response()->json([
                    'message' => 'Invalid notification type: '.$request->query('type')
                ], 400);
            }
        } else {
            return response()->json([
                'message' => 'Not found tenant with name of '.$request->query('tenant')
            ], 400);
        }
    }
}