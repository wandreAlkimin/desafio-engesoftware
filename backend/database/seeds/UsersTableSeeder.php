<?php

use App\Models\PhoneBook;
use App\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class)->create([
            'name'  => 'Wandre',
            'email' => 'wandre@mail.com',
        ]);

        $faker = Faker::create('pt_BR');

        foreach(range(1, 5) as $i)
        {
            PhoneBook::create([
                'name'      => $faker->name,
                'email'     => $faker->email,
                'telephone' => $faker->phoneNumber,
                'company'   => $faker->company,
                'user_id'   => 1
            ]);

        }

        foreach(range(1, 3) as $i)
        {

            $user = User::create([
                'name'  => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password'          => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            ]);

            foreach(range(1, 5) as $i)
            {
                PhoneBook::create([
                    'name'      => $faker->name,
                    'email'     => $faker->email,
                    'telephone' => $faker->phoneNumber,
                    'company'   => $faker->company,
                    'user_id'   => $user->id
                ]);

            }


        }


    }
}
