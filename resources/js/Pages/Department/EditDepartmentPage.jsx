import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';


export default function EditDepartmentPage({ auth, department }) {
    const { data, setData, patch, processing, errors } = useForm({
        department_name: department.department_name, // Assuming this matches your backend field name
        oldDepartmentID:department.id
    });

    const handleChange = (e) => {
        const { department_name, value } = e.target;
    
        setData('department_name', value); // Set the data dynamically based on input name
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('department.update')); // Assuming 'departments.store' is your route name
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Add Department">
            <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Update Department</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="department_name" className="block text-sm font-medium text-gray-700">
                            Department Name
                        </label>
                        <input
                            type="text"
                            id="department_name"
                            name="department_name"
                            value={data.department_name}
                            // onChange={(e) => setData('department_name', e.target.value)}
                            onChange={handleChange}

                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {/* Display validation error */}
                        {errors.department_name && (
                            <div className="text-red-500 text-sm mt-1">{errors.department_name}</div>
                        )}
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
