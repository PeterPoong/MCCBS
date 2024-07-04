<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {

//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard')->middleware('auth');

Route::prefix('department')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/',[DepartmentController::class,'index'])->name('departmentPage');
    //create new department
    Route::get('/addDepartments',[DepartmentController::class,'create'])->name('department.create');//display form
    Route::post('/departments',[DepartmentController::class,'store'])->name('department.store');//store new data

    //update old department
    Route::get('/departments/{department}/edit',[DepartmentController::class,'edit'])->name('department.edit');//displat form
    Route::patch('/departments',[DepartmentController::class,'update'])->name('department.update');//update the department
});

//testing postman 
// Route::get('/userPageApi',[UserController::class,'index'])->name('userPageApi');


Route::prefix('user')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/userPage',[UserController::class,'index'])->name('userPage');
    // Route::get('/', function () {
    //     return Inertia::render('UserPage');
    // })->name('userPage');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
