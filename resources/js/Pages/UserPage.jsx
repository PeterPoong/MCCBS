import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function UserPage({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">UserPage</h2>}
        >
            <Head title="User Page" />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Department
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.data.map((user) => {
                            const status = user.status === 1 ? 'Active' : 'Inactive';
                            const statusClass = user.status === 1 ? 'text-green-500' : 'text-red-500';
                            return (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 text-center whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {user.role ? user.role.core_meta_name : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {user.department ? user.department.core_meta_name : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:text-red-900 ml-2">
                                            Delete
                                        </button>
                                    </td>
                                    <td className={`px-6 py-4 font-bold text-center whitespace-no-wrap text-sm leading-5 text-gray-500 ${statusClass}`}>
                                        {status}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4">
                {users.links && (
                    <ul className="pagination">
                        {/* Previous page link */}
                        {users.links.prev && (
                            <li className="page-item">
                                <Link href={users.links.prev} className="page-link">
                                    Previous
                                </Link>
                            </li>
                        )}

                        {/* Next page link */}
                        {users.links.next && (
                            <li className="page-item">
                                <Link href={users.links.next} className="page-link">
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
