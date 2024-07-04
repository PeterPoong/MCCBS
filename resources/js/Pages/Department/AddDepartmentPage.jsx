import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

export default function DepartmentCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        department_name: '' // Assuming this matches your backend field name
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('department.store')); // Assuming 'departments.store' is your route name
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Add Department">
            <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add Department</h2>
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
                            onChange={(e) => setData('department_name', e.target.value)}
                            
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {/* Display validation error */}
                        {errors.department_name && (
                            <div className="text-red-500 text-sm mt-1">{errors.department_name}</div>
                        )}
                    </div>

                    {/* Add more fields as needed */}

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
                            disabled={processing} // Disable button during form submission
                        >
                            {processing ? 'Adding...' : 'Add Department'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
