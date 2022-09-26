<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return auth()->user();
});

/*
 * Tenant Routes
 */
// Get the max counts of sensors and gateways for the tenant
Route::get('/subscription/plan', '\App\Http\Controllers\ApiController@getLimitation');
// Get list of email addresses and phone numbers to push notifications
Route::get('/notification/targets', '\App\Http\Controllers\ApiController@getNotificationTargets');
//Update SMS/Mail notification counts so far for the current plan
Route::get('/notification', '\App\Http\Controllers\ApiController@updateNoficationSentCount');

Wave::api();