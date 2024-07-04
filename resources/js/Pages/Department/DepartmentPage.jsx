import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';


export default function DepartmentPage({ auth, departments }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Department</h2>
                    <Link
                        href={route('department.create')}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm shadow-md"
                    >
                        Add Department
                    </Link>
                </div>
            }
        >
            <Head title="Department Page" />

            <div className="overflow-x-auto">

                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Department Name
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Department Status
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {departments.data.map((department) => {
                            const status = department.department_status === 1 ? 'Active' : 'Inactive';
                            const statusClass = department.department_status === 1 ? 'text-green-500' : 'text-red-500';
                            return (

                                <tr key={department.id}>
                                    <td className="px-6 py-4 text-center whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                        {department.department_name}
                                    </td>

                                    <td className={`px-6 py-4 font-bold text-center whitespace-no-wrap text-sm leading-5 text-gray-500 ${statusClass}`}>
                                        {status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center">
                                        <Link
                                            href={route('department.edit', department.id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                                        >
                                            Edit
                                        </Link>
                                        <button className="text-red-600 hover:text-red-900 ml-2">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination links */}
            <div className="mt-4">
                {departments.links && (
                    <ul className="pagination">
                        {/* Previous page link */}
                        {departments.links.prev && (
                            <li className="page-item">
                                <Link href={departments.links.prev} className="page-link">
                                    Previous
                                </Link>
                            </li>
                        )}

                        {/* Next page link */}
                        {departments.links.next && (
                            <li className="page-item">
                                <Link href={departments.links.next} className="page-link">
                                    Next
                                </Link>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
