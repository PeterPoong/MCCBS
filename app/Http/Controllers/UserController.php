<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\mccbs_core_meta;
use App\Models\mccbs_department;
use Illuminate\Support\Facades\Auth; // Ensure you have this use statement
use Inertia\Inertia;
use Illuminate\Http\Request;




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

        // $users = User::where('id', '!=', Auth::id())->get();
        // $users=User::all();
        $users = User::with('role')->with('user_department')->where('id', '!=', Auth::id())->where('status',1)->paginate(10);

        // dd($users);
        return Inertia::render('User/UserPage', [
            'users' => $users, // Adjusted variable name to 'users'
            'links' => $users->toArray()['links'],
            'auth' => ['user' => auth()->user()], // Example of passing authenticated user info
        ]);
    }

    public function edit(User $user)
    {

        $role=mccbs_core_meta::where('core_meta_type','user_role')->where('core_meta_status',1)->get();
        $department=mccbs_department::where('department_status',1)->get();
        // dd($user->user_department);
        return Inertia::render('User/EditUserPage',[
            'auth'=>['user'=>auth()->user()],
            'user' => $user,
            'roles'=>$role,
            'departments'=>$department
        ]);
    }

    public function update(Request $request)
    {
        dd($request);
    }

    public function disable(Request $request)
    {
        $user=User::find($request->id);
        $user->update([
            'status'=>$request->status
        ]);
        return redirect(route('userPage'));
    }
}
