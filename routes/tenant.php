<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;
use Stancl\Tenancy\Middleware\ScopeSessions;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/
/*Route::group([
    'prefix' => '/{tenant}',
    'middleware' => ['universal', InitializeTenancyByPath::class],
], function () {
    Route::get('/dashboard', function () {
        var_dump(auth()->user());
        return 'This is your multi-tenant application. The id of the current tenant is ' . tenant('id');
    });
});*/
