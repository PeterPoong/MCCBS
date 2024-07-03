<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth; // Ensure you have this use statement
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = User::with('role')->where('id', '=', Auth::id())->get();
      
        return Inertia::render('Dashboard', [
            'auth' => ['user' => auth()->user()], // Example of passing authenticated user info
        ]);
    }
}
