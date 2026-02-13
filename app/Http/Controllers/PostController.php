<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return response()->json(Post::with('user:id,name')->latest()->paginate(10));
    }

    public function show($slug)
    {
        $post = Post::where('slug', $slug)->with('user:id,name')->firstOrFail();
        return response()->json($post);
    }
}
