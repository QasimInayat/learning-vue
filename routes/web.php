<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome', [
        'username' => 'Qasim Inayat',
        'role' => 'Admin',
        'tasks' => [
            ['text' => 'Arrive office at 10:00 AM', 'done' => true],
            ['text' => 'Import data to new Database', 'done' => false],
            ['text' => 'Contact Us Form', 'done' => true],
        ]
    ]);
});
