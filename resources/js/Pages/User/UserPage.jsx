import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import '../../../css/pagination.css'
import DeletepopOut from '@/Components/DeletePopOut'


export default function UserPage({ auth, users, links }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">UserPage</h2>
                    {/* <Link
                        href={route('user.create')}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm shadow-md"
                    >
                        Add Department
                    </Link> */}
                </div>
            }

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
                                        {user.user_department ? user.user_department.department_name : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center">
                                        <Link
                                            href={route('user.edit', user.id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                                        >
                                            Edit
                                        </Link>
                                        <DeletepopOut className="max-w-xl" dataValue={user} disableRoute="user.disable" disableType="user" />

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

            <Pagination links={links} />



        </AuthenticatedLayout>
    );
}
