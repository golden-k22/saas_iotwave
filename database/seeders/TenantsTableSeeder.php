<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TenantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('tenants')->delete();

        \DB::table('tenants')->insert(array (
            0 =>
                array (
                    'id' => 'admin',
                    'created_at' => '2017-11-21 16:23:22',
                    'updated_at' => '2017-11-21 16:23:22',
                ),
        ));
    }
}
