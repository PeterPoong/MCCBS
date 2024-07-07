import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';


export default function EditUserPage({ auth, user, roles ,departments}) {
    console.log('User:', user.id);
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name, // Assuming this matches your backend field name
        email: user.email,
        ic: user.ic_number,
        oldUserID: user.id,
        role:user.user_role,
        department:user.department
    });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;

    //     setData('name', value); // Set the data dynamically based on input name
    // };

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
                            type="number"
                            id="ic"
                            name="ic"
                            value={data.ic}
                            onChange={(e) => setData('ic', e.target.value)}
                            // onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {/* Display validation error */}
                        {errors.ix && (
                            <div className="text-red-500 text-sm mt-1">{errors.ic}</div>
                        )}
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
                        {/* Country Code Select */}
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




                    {/* Add more fields as needed */}
                    {/* <div className="flex items-center justify-center mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div> */}

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
