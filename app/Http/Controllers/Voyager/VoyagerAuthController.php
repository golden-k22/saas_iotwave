<?php

namespace App\Http\Controllers\Voyager;

use TCG\Voyager\Http\Controllers\VoyagerAuthController as BaseVoyagerAuthController;

class VoyagerAuthController extends BaseVoyagerAuthController
{
    /**
     * Preempts $redirectTo member variable (from RedirectsUsers trait)
     * @return string
     */
    public function redirectTo()
    {
        $user = $this->guard()->user();
        if(!$user->hasRole('admin')){
            if($user->tenant){
                return '/'.$user->tenant->id.'/dashboard';
            } else {
                return '/'.$user->username.'/dashboard';
            }
        } else {
            return  '/admin';
        }
    }
}
