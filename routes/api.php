<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PostController;

Route::get('/posts/latest', [PostController::class, 'latest']);
Route::get('/posts/featured', [PostController::class, 'featured']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{slug}', [PostController::class, 'show']);

use App\Http\Controllers\AdminController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
        Route::get('/stats', [AdminController::class, 'stats']);
        Route::get('/users', [AdminController::class, 'users']);
        
        Route::apiResource('categories', \App\Http\Controllers\Admin\CategoryController::class);
        Route::apiResource('posts', \App\Http\Controllers\Admin\PostController::class);
    });
});
