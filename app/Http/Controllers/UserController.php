<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\mccbs_core_meta;
use App\Models\mccbs_department;
use App\Models\mccbs_authority;
use App\Models\mccbs_country;
use Illuminate\Support\Facades\Auth; // Ensure you have this use statement
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use App\Rules\UniqueContactNumber;





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
        $users = User::with('role')->with('user_department')->where('id', '!=', Auth::id())->whereIn('status', [1, 2])->paginate(10);
        // dd($users);
        return Inertia::render('User/UserPage', [
            'users' => $users, // Adjusted variable name to 'users'
            'links' => $users->toArray()['links'],
            'auth' => ['user' => auth()->user()], // Example of passing authenticated user info
        ]);
    }

    public function edit(User $user)
    {
        $role = mccbs_core_meta::where('core_meta_type', 'user_role')->where('core_meta_status', 1)->get();
        $department = mccbs_department::where('department_status', 1)->get();
        $getAuthDepartments = mccbs_authority::where('user_id', $user->id)->where('authority_status', 1)->get();
        $country = mccbs_country::get();

        // dd($getAuthDepartments);

        $departmentsAccess = [];
        $departmrntArray = [];
        $authArray = [];
        foreach ($getAuthDepartments as $d) {
            $dptment = $d->AuthrityDepartment;
            $departmentsAccess[] = $dptment[0];
            $authArray[] = $dptment[0]->id;
        }

        foreach ($department as $depart) {
            $departmrntArray[] = $depart->id;
        }
        $result = array_diff($departmrntArray, $authArray);
        $availableDepartment = mccbs_department::whereIn('id', $result)->get();
        // dd($availableDepartment);


        // dd($user->user_department);
        return Inertia::render('User/EditUserPage', [
            'auth' => ['user' => auth()->user()],
            'user' => $user,
            'roles' => $role,
            'departments' => $department,
            'availableDepart' => $availableDepartment,
            'departmentsAccess' => $departmentsAccess,
            'country' => $country
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('mccbs_users')->ignore($request->oldUserID)
            ],
            'ic' => [
                'required',
                'string',
                'max:255',
                Rule::unique('mccbs_users', 'ic_number')->ignore($request->oldUserID)
            ],
            // 'ic' => 'required',
            'contactNumber' => 'required'
        ], [
            'email.unique' => 'The email address has already been taken.',
        ]);


        $contactNumber = $request->contactNumber;
        $countryCode = $request->countryCode;
        $userId=$request->oldUserID;
        $validator = Validator::make($request->all(), [
            'contactNumber' => [new UniqueContactNumber($countryCode, $contactNumber,$userId)],
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    
        $user = User::find($request->oldUserID);

        $authDepartment = mccbs_authority::where('user_id', $request->oldUserID)->get();
        $authArray = [];
        foreach ($authDepartment as $auth) {
            if ($auth->authority_status == 1) {
                $authArray[] = $auth->department;
            }
        }

        $selectedDepartment = $request->authority;

        $selectedArray = array_column($selectedDepartment, 'id');

        $newAuth = array_diff($selectedArray, $authArray);
        $removeAuth = array_diff($authArray, $selectedArray);

        $newAuthData = [];
        $addedDepartments = [];
        foreach ($newAuth as $new) {
            $exists = false;
            foreach ($authDepartment as $auth) {
                if ($auth->department == $new && $auth->authority_status == 0) {
                    $authority = mccbs_authority::find($auth->id);
                    $authority->update([
                        'authority_status' => 1
                    ]);
                    $exists = true;
                    break;
                }
            }
            if (!$exists && !in_array($new, $addedDepartments)) {
                $newAuthData[] = [
                    'user_id' => $request->oldUserID,
                    'department' => $new
                ];
                $addedDepartments[] = $new;
            }
        }

        if (!empty($newAuthData)) {
            mccbs_authority::insert($newAuthData);
        }

        if (!empty($removeAuth)) {
            foreach ($removeAuth as $remove) {
                $data = mccbs_authority::where('department', $remove);
                $data->update([
                    'authority_status' => 0
                ]);
            }
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'ic_number' => $request->ic,
            'country_code' => $request->countryCode,
            'contact_no' => $request->contactNumber,
            'user_role' => $request->role,
            'department' => $request->department
        ]);

        return redirect(route('userPage'));
    }

    public function disable(Request $request)
    {
        $user = User::find($request->id);
        $user->update([
            'status' => $request->status
        ]);
        return redirect(route('userPage'));
    }
}
