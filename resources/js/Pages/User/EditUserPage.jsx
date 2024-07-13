import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';




export default function EditUserPage({ auth, user, roles, departments, availableDepart, departmentsAccess, country }) {
    // const [selectedDepartments, setSelectedDepartments] = useState([]);

    const [availableDepartments, setAvailableDepartments] = useState(availableDepart);
    const [selectedDepartments, setSelectedDepartments] = useState(departmentsAccess);
    const [formatError, setFormatError] = useState('');
    const [contactNumberError, setContactNumberError] = useState('');
    const [countries, setCountries] = useState([]);


    const { data, setData, patch, processing, errors } = useForm({
        name: user.name, // Assuming this matches your backend field name
        email: user.email,
        ic: user.ic_number,
        oldUserID: user.id,
        role: user.user_role,
        department: user.department,
        authority: [],
        countryCode: user.country_code, // Default country code
        contactNumber: user.contact_no,
    });


    const integerPattern = /^\d{0,12}$/;
    const handleICNumberInputChange = (e) => {
        const { value } = e.target;
        if (integerPattern.test(value)) {
            setData('ic', value);
        } else {
            setFormatError('IC Number must contain only 12 digits (0-9).');

        }
    };





    const handleAddDepartment = (department) => {
        setAvailableDepartments(availableDepartments.filter(dep => dep.id !== department.id));
        setSelectedDepartments([...selectedDepartments, department]);
    };

    const handleRemoveDepartment = (department) => {
        setSelectedDepartments(selectedDepartments.filter(dep => dep.id !== department.id));
        setAvailableDepartments([...availableDepartments, department]);
    };

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

    useEffect(() => {
        setData('authority', selectedDepartments);
    }, [selectedDepartments]);


    useEffect(() => {
        setCountries(country);
    }, [country]);




    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('user.update')); // Assuming 'departments.store' is your route name
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Add Department">
            <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            User name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            // onChange={handleChange}

                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {/* Display validation error */}
                        {errors.name && (
                            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            // onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {/* Display validation error */}
                        {errors.email && (
                            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="ic" className="block text-sm font-medium text-gray-700">
                            IC_Number
                        </label>
                        <input
                            id="ic"
                            name="ic"
                            value={data.ic}
                            onChange={handleICNumberInputChange}
                            // onChange={(e) => setData('ic', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {/* Display validation error */}
                        {formatError && (
                            <div className="text-red-500 text-sm mt-1">{formatError}</div>
                        )}
                        {errors.ic && (
                            <div className="text-red-500 text-sm mt-1">{errors.ic}</div>
                        )}
                    </div>

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
                                    
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            {contactNumberError && (
                                <InputError message={contactNumberError} className="mt-2" />
                            )}

                            {/* {errors.contactNumber && (
                                <div className="text-red-500 text-sm mt-1">{errors.contactNumber}</div>
                            )} */}

                            {errors.contactNumber && !contactNumberError && (
                                <InputError message={errors.contactNumber} className="mt-2" />
                            )}
                        </div>
                    </div>

                    <div className="mt-4 flex items-start">
                        {/* Country Code Select */}
                        <div className="flex-shrink-0">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">User Role</label>
                            <div className="mt-1">
                                <select
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    // onChange={(e) => setData('countryCode', 1)}
                                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                >
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.core_meta_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className="mt-4 flex items-start">
                        <div className="flex-shrink-0">
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                            <div className="mt-1">
                                <select
                                    id="department"
                                    name="department"
                                    value={data.department}
                                    onChange={(e) => setData('department', e.target.value)}
                                    // onChange={(e) => setData('countryCode', 1)}
                                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                >
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.department_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 flex flex-col items-start" style={{ width: '60%' }}>
                        <div className="w-full">
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-4">Authority</label>

                            <div className="border border-gray-300 rounded p-4 relative">
                                <div className="absolute -top-4 left-4 bg-white px-2">
                                    <h2 className="block text-sm font-medium text-gray-700">Available Departments</h2>
                                </div>
                                <ul className="space-y-2 mt-1">
                                    {availableDepartments.map(department => (
                                        <li key={department.id} className="flex items-center">
                                            <span className="block text-sm font-medium text-gray-700 mr-3">{department.department_name}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleAddDepartment(department)}
                                                className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md text-sm shadow-md"
                                            >
                                                Add
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col items-start" style={{ width: '60%' }}>
                        <div className="w-full">
                            <div className="border border-gray-300 rounded p-4 relative">
                                <div className="absolute -top-4 left-4 bg-white px-2">
                                    <h2 className="block text-sm font-medium text-gray-700">Selected Departments</h2>
                                </div>
                                <ul className="space-y-2 mt-1">
                                    {selectedDepartments.map(department => (
                                        <li key={department.id} className="flex items-center">
                                            <span className="block text-sm font-medium text-gray-700 mr-3">{department.department_name}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveDepartment(department)}
                                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md text-sm shadow-md"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>














                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
                            disabled={processing} // Disable button during form submission
                        >
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>

            </div>
        </AuthenticatedLayout>
    );
}
