<?php

return [

	'profile_fields' => [
		'about'
	],

	'api' => [
		'auth_token_expires' 	=> 60,
		'key_token_expires'		=> 1,
	],

	'auth' => [
		'min_password_length' => 5,
	],

	'user_model' => App\User::class,
	'show_docs' => env('WAVE_DOCS', false),
    'demo' => env('WAVE_DEMO', false),
    'dev_bar' => env('WAVE_BAR', false),

    'paddle' => [
        'vendor' => env('PADDLE_VENDOR_ID', ''),
        'auth_code' => env('PADDLE_VENDOR_AUTH_CODE', ''),
        'env' => env('PADDLE_ENV', 'sandbox'),
        'sms_product_id' => env('PADDLE_SMS_PRODUCT_ID', ''),
        'sms_product_price' => env('PADDLE_SMS_PRODUCT_PRICE', 0),
        'sms_product_sms_count' => env('PADDLE_SMS_PRODUCT_SMS_COUNT', 100),
        'sms_product_email_count' => env('PADDLE_SMS_PRODUCT_EMAIL_COUNT', 100),
    ]

];
