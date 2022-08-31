<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;

class LoginController extends \Wave\Http\Controllers\Auth\LoginController
{
    protected function authenticated(Request $request, $user)
    {
        // set redirect
        $this->setRedirect($user);

        if(setting('auth.verify_email') && !$user->verified){
            $this->guard()->logout();
            return redirect()->back()->with(['message' => 'Please verify your email before logging into your account.', 'message_type' => 'warning']);
        }
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();
        $this->clearLoginAttempts($request);

        return $this->authenticated($request, $this->guard()->user())
            ?: redirect()->intended($this->redirectPath())->with(['message' => 'Successfully logged in.', 'message_type' => 'success']);
    }

    private function setRedirect($user) {
        if(!$user->hasRole('admin')){
            if($user->tenant){
                $this->redirectTo = '/'.$user->tenant->id.'/dashboard';
            } else {
                $this->redirectTo = '/'.$user->username.'/dashboard';
            }
        } else {
            $this->redirectTo = '/admin';
        }
    }
}
