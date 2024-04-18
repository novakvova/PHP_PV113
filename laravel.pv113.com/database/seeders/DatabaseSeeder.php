<?php

namespace Database\Seeders;

use App\Models\Categories;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if(User::count()==0) {
            User::factory(10)->create();
        }
        
        if(Categories::count()==0) {
            Categories::factory(20)->create();
        }
//        Categories::factory()->create([
//
//        ]);

//        User::factory(1)->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//            'password' => Hash::make('123456'),
//        ]);
    }
}
