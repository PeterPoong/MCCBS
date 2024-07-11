<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\mccbs_country;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\mccbs_department;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {


        $country = mccbs_country::get();
        // dd($country);
        return Inertia::render('Auth/RegisterContact', [
            'country' => $country
        ]);
    }

    public function checkContact(Request $request)
    {
        $contactNum = $request->countryCode . $request->contactNumber;
        $checkUser = User::where('contact_no', $contactNum)->exists();
        if ($checkUser) {
            return Inertia::render('Auth/Login');
        } else {
            return Inertia::render('Auth/Register');
        }
    }
    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route('registerContact'));
    // };

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // dd($request);
        $request->validate([
            'name' => 'required|string|max:255',
            'icNumber' => 'required|string|max:255|unique:' . User::class . ',ic_number',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'contactNumber' => 'required',
            'countryCode' => 'required'
        ], [
            'icNumber.unique' => 'IC Number has already been taken.',
            'email.unique' => 'The email address has already been taken.',
            'contactNumber.unique' => 'The contact number has already been taken.',
        ]);

        $contactNumber = $request->countryCode . '' . $request->contactNumber;

        // Custom validation for combined value
        $validator = Validator::make(['contactNumber' => $contactNumber], [
            'contactNumber' => 'unique:' . User::class . ',contact_no'
        ], [
            'contactNumber.unique' => 'The contact number with the country code has already been taken.',
        ]);

        // Check if the custom validation fails
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'ic_number' => $request->icNumber,
            'password' => Hash::make($request->password),
            'contact_no' => $contactNumber,
            'user_role' => 3,
        ]);

        event(new Registered($user));
        Auth::login($user);

        return redirect(route('login', absolute: false));
    }
}
