import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function RegisterContact({ country }) {
    const [contactNumberError, setContactNumberError] = useState('');
    const [countries, setCountries] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        countryCode: '+60',
        contactNumber: '',
    });

    useEffect(() => {
        setCountries(country);
    }, [country]);

    const integerPatternContact = /^\d{0,15}$/;

    const handleContactNumberInputChange = (e) => {
        const { value } = e.target;
        if (value === '' || integerPatternContact.test(value)) {
            setContactNumberError('');
            setData('contactNumber', value);
        } else {
            setContactNumberError('Contact Number must contain only 15 digits (0-9).');
        }
    };

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route('registerContact'));
    // };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await post(route('registerContact'));
            const responseData = response.data; // Assuming response contains JSON data

            if (responseData === 'login') {
                setContactNumberError('Contact already exists. Please log in.');
            } else if (responseData === 'register') {
                // Optionally reset error state if needed
                setContactNumberError('');
                // Handle registration logic if needed
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setContactNumberError(error.response.data.error);
            } else {
                console.error('Failed to check contact:', error);
            }
        }
    };

    // const submit = async (e) => {
    //     e.preventDefault();
    //     const response = await post(route('registerContact'), {
    //         preserveScroll: true,
    //         onSuccess: (response) => {
    //             if (response === 'login') {
    //                 setContactNumberError('Contact Number must contain only 15 digits (0-9).');
    //             }
    //         }
    //     });
    // };


    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div className="mt-4 flex items-start">
                    {/* Country Code Select */}
                    <div className="flex-shrink-0">
                        <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">Country Code</label>
                        <div className="mt-1">
                            <select
                                id="countryCode"
                                name="countryCode"
                                value={data.countryCode}
                                onChange={(e) => setData('countryCode', e.target.value)}
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            >
                                {countries && countries.length > 0 && countries.map((country) => (
                                    <option key={country.country_code} value={country.country_code}>
                                        {country.country_code}({country.country_name})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Contact Number Input */}
                    <div className="ml-4 flex-1">
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <div className="mt-1">
                            <input
                                id="contactNumber"
                                name="contactNumber"
                                type="tel"
                                value={data.contactNumber}
                                onChange={handleContactNumberInputChange}
                                autoComplete="tel"
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        {contactNumberError && (
                            <InputError message={contactNumberError} className="mt-2" />
                        )}

                        {errors.contactNumber && !contactNumberError && (
                            <InputError message={errors.contactNumber} className="mt-2" />
                        )}
                    </div>
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
