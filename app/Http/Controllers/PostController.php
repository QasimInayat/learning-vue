<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return response()->json(Post::with('user:id,name')->latest()->paginate(9));
    }

    public function show($slug)
    {
        $post = Post::where('slug', $slug)->with('user:id,name')->firstOrFail();
        return response()->json($post);
    }

    public function featured()
    {
        // For demo purposes, we will just take 3 random posts
        $featuredPosts = Post::with('user:id,name')->inRandomOrder()->take(3)->get();
        return response()->json($featuredPosts);
    }

    public function latest()
    {
        // For demo purposes, we will just take 3 random posts
        $latestPosts = Post::with('user:id,name')->latest()->take(3)->get();
        return response()->json($latestPosts);
    }
}
