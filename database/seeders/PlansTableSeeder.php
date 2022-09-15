<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PlansTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {


        \DB::table('plans')->delete();

        \DB::table('plans')->insert(array (
            0 =>
            array (
                'id' => 1,
                'name' => 'Basic',
                'slug' => 'basic',
                'description' => 'Signup for the Basic User Plan to access all the basic features.',
                'features' => 'Max Gateways 10, Max Sensors 100, Max Email Counts 200, Max SMS Counts 200',
                'gateway'=> 10,
                'sensor'=> 100,
                'sms'=> 200,
                'email'=> 200,
                'plan_id' => '1',
                'role_id' => 3,
                'default' => 0,
                'price' => '5',
                'trial_days' => 0,
                'created_at' => '2018-07-03 05:03:56',
                'updated_at' => '2018-07-03 17:17:24',
            ),
            1 =>
            array (
                'id' => 2,
                'name' => 'Premium',
                'slug' => 'premium',
                'description' => 'Signup for our premium plan to access all our Premium Features.',
                'features' => 'Max Gateways 25, Max Sensors 300, Max Email Counts 500, Max SMS Counts 500',
                'gateway'=> 25,
                'sensor'=> 300,
                'sms'=> 500,
                'email'=> 500,
                'plan_id' => '2',
                'role_id' => 5,
                'default' => 1,
                'price' => '8',
                'trial_days' => 0,
                'created_at' => '2018-07-03 16:29:46',
                'updated_at' => '2018-07-03 17:17:08',
            ),
            2 =>
            array (
                'id' => 3,
                'name' => 'Pro',
                'slug' => 'pro',
                'description' => 'Gain access to our pro features with the pro plan.',
                'features' => 'Max Gateways 50, Max Sensors 500, Max Email Counts 1500, Max SMS Counts 1500',
                'gateway'=> 50,
                'sensor'=> 500,
                'sms'=> 1500,
                'email'=> 1500,
                'plan_id' => '3',
                'role_id' => 4,
                'default' => 0,
                'price' => '12',
                'trial_days' => 0,
                'created_at' => '2018-07-03 16:30:43',
                'updated_at' => '2018-08-22 22:26:19',
            ),
        ));
    }
}
