<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Rule;
use App\Models\User;

class UniqueContactNumber implements Rule
{
    protected $countryCode;
    protected $contactNumber;
    protected $userId;

    public function __construct($countryCode, $contactNumber,$userId)
    {
        $this->countryCode = $countryCode;
        $this->contactNumber = $contactNumber;
        $this->userId=$userId;
    }

    public function passes($attribute, $value)
    {
        return !User::where('country_code', $this->countryCode)
                    ->where('contact_no', $this->contactNumber)
                    ->where('id', '!=', $this->userId)
                    ->exists();
    }

    public function message()
    {
        return 'The contact number with the country code has already been taken.';
    }
}
