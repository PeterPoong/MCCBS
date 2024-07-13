<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            // 'login' => 'email', 
            // 'login'=>['string'],
            'password' => ['required', 'string'],
        ];
    }

    // public function messages():array{
    //     return [
    //         'login.email'=>'The email field must be a valid email'
    //     ];
    // }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
    //   dd($this->all());
        $this->ensureIsNotRateLimited();
       
        if($this->contactNumber==null)
        {
            $key='login';
            $loginField='email';
            $loginValue=$this->login;
            if (! Auth::attempt([$loginField => $loginValue, 'password' => $this->password], $this->boolean('remember'))) {
                RateLimiter::hit($this->throttleKey());
        
                throw ValidationException::withMessages([
                    $key=> trans('auth.failed'),
                ]);
            }
        }else
        {
            $key='contactNumber';
            if (! Auth::attempt(['country_code' => $this->countryCode, 'contact_no'=>$this->contactNumber, 'password' => $this->password], $this->boolean('remember'))) {
                RateLimiter::hit($this->throttleKey());
        
                throw ValidationException::withMessages([
                    $key=> trans('auth.failed'),
                ]);
            }
        }  


      
        // if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
        //     RateLimiter::hit($this->throttleKey());

        //     throw ValidationException::withMessages([
        //         $key => trans('auth.failed'),
        //     ]);
        // }
        RateLimiter::clear($this->throttleKey());
    }

  

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
    }

    protected function isEmail($value)
    {
        return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;
    }
}
