<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    public function stats(): JsonResponse
    {
        return response()->json([
            'users_count' => User::count(),
            'posts_count' => Post::count(),
        ]);
    }

    public function users(): JsonResponse
    {
        return response()->json(User::latest()->paginate(10));
    }
}
