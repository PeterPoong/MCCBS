<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\mccbs_department;
use Illuminate\Support\Facades\Auth; // Ensure you have this use statement
use Inertia\Inertia;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;



class DepartmentController extends Controller
{
    public function index()
    {
        $departments = mccbs_department::paginate(10);
        // dd($departments);
        return Inertia::render('Department/DepartmentPage', [
            'auth' => ['user' => auth()->user()], // Example of passing authenticated user info
            // 'departments' => $departments
            'departments' => $departments
        ]);
    }

    public function create()
    {
        return Inertia::render('Department/AddDepartmentPage', [
            'auth' => ['user' => auth()->user()], // Example of passing authenticated user info
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'department_name' => 'required'
        ]);

        $department = mccbs_department::create(
            [
                'department_name' => $request->department_name,
            ]
        );

        return redirect(route('departmentPage'));
    }

    public function edit(mccbs_department $department)
    {
        
        return Inertia::render('Department/EditDepartmentPage',[
            'auth'=>['user'=>auth()->user()],
            'department'=>$department
        ]); 
    }

    public function update(Request $request)
    {



        $request->validate([
            'department_name'=>'required',
            'oldDepartmentID'=>'required'
        ]);
        $department=mccbs_department::find($request->oldDepartmentID);
        $department->update([
            'department_name' => $request->department_name,
            // Update other fields as necessary
        ]);
        return redirect(route('departmentPage'));

        
    }
}
