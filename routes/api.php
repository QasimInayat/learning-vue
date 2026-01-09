<?php
use Illuminate\Http\Request;

Route::get('/todos', function () {
    return [
        ['id' => 1, 'text' => 'Learn Laravel API', 'done' => false],
        ['id' => 2, 'text' => 'Connect Vue with Backend', 'done' => true],
        ['id' => 3, 'text' => 'Hello World', 'done' => true],

    ];
});

Route::post('/todos', function (Request $request) {
    return [
        'id' => rand(100, 999),
        'text' => $request->text,
        'done' => false
    ];
});
