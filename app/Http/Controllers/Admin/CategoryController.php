<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Category::latest()->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories',
        ]);

        $category = Category::create($validated);
        return response()->json($category, 201);
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(Category::findOrFail($id));
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $category = Category::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $category->id,
        ]);

        $category->update($validated);
        return response()->json($category);
    }

    public function destroy(string $id): JsonResponse
    {
        Category::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
