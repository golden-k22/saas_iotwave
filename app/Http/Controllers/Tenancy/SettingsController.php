<?php

namespace App\Http\Controllers\Tenancy;

use Illuminate\Http\Request;

class SettingsController extends \Wave\Http\Controllers\SettingsController
{
    public function index($section = ''){
        if(empty($section)){
            return redirect(route('tenancy.settings', ['section'=>'profile', 'tenant'=>tenant('id')]));
        }
        return view('tenancy.settings.index', compact('section'));
    }

    public function invoice(Request $request, $invoiceId) {
        return $request->user()->downloadInvoice($invoiceId, [
            'vendor'  => setting('site.title', 'Wave'),
            'product' => ucfirst(auth()->user()->role->name) . ' Subscription Plan',
        ]);
    }
}