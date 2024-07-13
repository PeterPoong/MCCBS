import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';


export default function Register({countryCode,contactNum}) {
    const [formatError, setFormatError] = useState('');
    // const [contactNumberError, setContactNumberError] = useState('');
    // const [countryCode, setCountryCode] = useState('+1');
    // const [lastContactNumber, setlastContactNumber] = useState();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        icNumber: '',
        countryCode: countryCode,
        password: '',
        contactNumber: contactNum,
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    // Regex pattern to allow only integers
    const integerPattern = /^\d{0,12}$/;
    const integerPatternContact = /^\d{0,15}$/;
    // const integerPatternContact = /^\+\d{0,15}$/;
    // const integerPatternContact = /^(\+\d{1,15}|\d{1,15})$/;
    // const [formatError, setFormatError] = useState('');

    const handleICNumberInputChange = (e) => {
        const { icNumber, value } = e.target;
        // Validate input against regex pattern
        if (value === '' || integerPattern.test(value)) {
            setFormatError('');
            setData('icNumber', value);
        } else {
            setFormatError('IC Number must contain only 12 digits (0-9).');
        }
    };

    // const handleContactNumberInputChange = (e) => {
    //     const { value } = e.target;
    //     // Validate input against regex pattern
    //     if (value === '' || integerPatternContact.test(value)) {
    //         setContactNumberError('');
    //         setData('contactNumber', value);
    //     } else {
    //         setContactNumberError('Contact Number must contain only 15 digits (0-9).');
    //     }
    // };

    // const handleCountryCodeChange = (e) => {
    //     setCountryCode(e.target.value); // Update countryCode state with selected value
    // };
    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };


    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder="username"
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Please fill in email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="IC Number" value="IC Number" />

                    <TextInput
                        id="icNumber"
                        name="icNumber"
                        value={data.icNumber}
                        placeholder="Please fill in IC Number without -"
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={handleICNumberInputChange}
                        // onChange={(e) => setData('icNumber', e.target.value)}
                        required
                    />


                    {formatError && (
                        <InputError message={formatError} className="mt-2" />
                    )}

                    {errors.icNumber && !formatError && (
                        <InputError message={errors.icNumber} className="mt-2" />
                    )}
                </div>


                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password must form by at least 8 letters"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        placeholder="Must be same as the password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>

                

                
            </form>
        </GuestLayout>
    );
}
