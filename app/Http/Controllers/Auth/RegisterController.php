<?php

namespace App\Http\Controllers\Auth;

use App\Tenant;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

class RegisterController extends \Wave\Http\Controllers\Auth\RegisterController
{
    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        event(new Registered($user = $this->create($request->all())));

        if(setting('auth.verify_email')){
            // send email verification
            return redirect()->route('login')->with(['message' => 'Thanks for signing up! Please check your email to verify your account.', 'message_type' => 'success']);
        } else {
            $this->guard()->login($user);

            // update redirect path to tenant one
            $this->redirectTo = '/'.$user->username.'/dashboard';
            // create tenant
            Tenant::create(['id' => $user->username]);

            return $this->registered($request, $user)
                ?: redirect($this->redirectPath())->with(['message' => 'Thanks for signing up!', 'message_type' => 'success']);
        }
    }

    /**
     * Complete a new user registration after they have purchased
     *
     * @param  Request  $request
     * @return redirect
     */
    public function complete(Request $request){

        if(setting('auth.username_in_registration') && setting('auth.username_in_registration') == 'yes'){
            $request->validate([
                'name' => 'required|string|min:3|max:255',
                'username' => 'required|string|max:20|unique:users,username,' . auth()->user()->id,
                'password' => 'required|string|min:6'
            ]);
        } else {
            $request->validate([
                'name' => 'required|string|min:3|max:255',
                'password' => 'required|string|min:6'
            ]);
        }

        // Update the user info
        $user = auth()->user();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = bcrypt(config('default_password'));
        $user->save();

        // create tenant
        Tenant::create(['id' => $user->username]);

        return redirect()->route('tenancy.dashboard', $user->username)->with(['message' => 'Successfully updated your profile information.', 'message_type' => 'success']);
    }
}
