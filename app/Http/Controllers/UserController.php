<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth; // Ensure you have this use statement
use Inertia\Inertia;




class UserController extends Controller
{
    public function index()
    {
        //testing api 
        //******** */
        // $users=User::all();
        // return $users;
        // dd(Auth::user()->id);
        //******8 */
        
        $users = User::where('id', '!=', Auth::id())->get();
        return Inertia::render('UserPage', [
            'users' => $users, // Adjusted variable name to 'users'
            'auth' => ['user' => auth()->user()], // Example of passing authenticated user info
        ]);
    }
}
