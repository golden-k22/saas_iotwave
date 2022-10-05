<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;
use \Storage;

class User extends \Wave\User
{

    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'username', 'phone', 'password', 'verification_code', 'verified', 'trial_ends_at', 'mailable', 'messagable', 'last_log_in'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'trial_ends_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'tenant_id'
    ];


    /**
     * The attribute for tenant id
     *
     * @return BelongsTo
     */
    public function tenant()
    {
        return $this->belongsTo(Tenant::class, "tenant_id");
    }
}
