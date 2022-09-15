<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;

// Authentication routes
Auth::routes();

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();

    // customized route to store tenant users
    Route::post('users', ['uses' => 'Voyager\WaveUserController@store', 'as' => 'voyager.users.store']);
    Route::put('users/{id}', ['uses' => 'Voyager\WaveUserController@update', 'as' => 'voyager.users.update']);
    Route::delete('users/{id}', ['uses' => 'Voyager\WaveUserController@destroy', 'as' => 'voyager.users.destroy']);
});

// Include Wave Routes
Wave::routes();

// Tenants Routes
Route::group([
    'prefix' => '/{tenant}',
    'middleware' => ['auth', InitializeTenancyByPath::class],
    'as'=> 'tenancy.'
], function () {
    // dashboard
    Route::get('dashboard', 'Tenancy\HomeController@index')->name('dashboard');
    // profile
    Route::get('@{username}', 'Tenancy\ProfileController@index')->name('profile');
    // settings
    Route::get('settings/{section?}', 'Tenancy\SettingsController@index')->name('settings');
    Route::post('settings/profile', 'Tenancy\SettingsController@profilePut')->name('settings.profile.put');
    Route::put('settings/security', 'Tenancy\SettingsController@securityPut')->name('settings.security.put');
    Route::post('settings/api', 'Tenancy\SettingsController@apiPost')->name('settings.api.post');
    Route::put('settings/api/{id?}', 'Tenancy\SettingsController@apiPut')->name('settings.api.put');
    Route::delete('settings/api/{id?}', 'Tenancy\SettingsController@apiDelete')->name('settings.api.delete');
    Route::get('settings/invoices/{invoice}', 'Tenancy\SettingsController@invoice')->name('invoice');
    // users
    Route::resource('users', 'Tenancy\UserController');
    // basic settings
    Route::get('basic/gateway', 'Tenancy\BasicSettingsController@gateway')->name('basic.gateway');
    Route::get('basic/group', 'Tenancy\BasicSettingsController@group')->name('basic.group');
    Route::get('basic/device', 'Tenancy\BasicSettingsController@device')->name('basic.device');
    // sensors
    Route::get('sensors/real-time', 'Tenancy\SensorsController@realTime')->name('sensors.real');
    Route::get('sensors/report', 'Tenancy\SensorsController@report')->name('sensors.report');
    // alarms
    Route::get('alarm/settings/{section?}', 'Tenancy\AlarmController@settings')->name('alarm.setting');
    Route::get('alarm/record', 'Tenancy\AlarmController@record')->name('alarm.record');
});
