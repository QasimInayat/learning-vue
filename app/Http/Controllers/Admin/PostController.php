<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = Post::with('category', 'user')->latest()->paginate(10);
        return response()->json($posts);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:posts',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $validated['user_id'] = $request->user()->id;

        $post = Post::create($validated);

        return response()->json($post, 201);
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(Post::with('category', 'user')->findOrFail($id));
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $post = Post::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:posts,slug,' . $post->id,
            'content' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($post->image) {
                $oldPath = str_replace('/storage/', '', $post->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('posts', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $post->update($validated);

        return response()->json($post);
    }

    public function destroy(string $id): JsonResponse
    {
        $post = Post::findOrFail($id);
        
        if ($post->image) {
             $oldPath = str_replace('/storage/', '', $post->image);
             Storage::disk('public')->delete($oldPath);
        }

        $post->delete();
        return response()->json(null, 204);
    }
}
