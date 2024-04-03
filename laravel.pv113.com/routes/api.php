<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Api\CategoriesController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/categories', [CategoriesController::class, 'getList']);
Route::get('/categories/{id}', [CategoriesController::class, 'getById']);
Route::post('/categories/create', [CategoriesController::class, 'create']);
Route::delete("/categories/{id}", [CategoriesController::class, "delete"]);
Route::post("/categories/edit/{id}", [CategoriesController::class, "edit"]);

Route::post('/categories/send', [CategoriesController::class, 'send']);
