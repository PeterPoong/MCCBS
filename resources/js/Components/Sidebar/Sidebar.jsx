import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import SidebarDropdown from './SidebarDropDown';

export default function Sidebar({ auth }) {
    const [isOpen, setIsOpen] = useState(true);
    // const user = auth.user;

    return (
        
        <div className={`bg-gray-800 text-white min-h-screen flex flex-col ${isOpen ? 'w-64' : 'w-20'}`}>
            {/* Sidebar Header */}
            <div className="p-4 flex items-center justify-between">
                {/* Sidebar Branding - Only visible when sidebar is open */}
                <h2 className={`text-xl font-bold ${isOpen ? 'block' : 'hidden'}`}>My App</h2>

                {/* Sidebar Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-400 hover:text-white focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className={`flex-1 ${isOpen ? 'block' : 'hidden'}`}>
                <ul>
                    {/* Dashboard Link */}
                    <li>
                        <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Dashboard
                        </Link>
                    </li>

                    {/* Profile Link */}

                    {auth.user_role === 1 && (
                        <li>
                            <Link href={route('userPage')} className="block py-2 px-4 rounded hover:bg-gray-700">
                                User
                            </Link>
                        </li>
                    )}
                    
                    

                    <li>
                        <Link href={route('departmentPage')} className="block py-2 px-4 rounded hover:bg-gray-700">
                            Department
                        </Link>
                    </li>

                    {/* Settings Dropdown */}
                    <li>
                        <SidebarDropdown
                            title="Settings"
                            links={[
                                { label: 'General', href: '/settings/general' },
                                { label: 'Account', href: '/settings/account' },
                                { label: 'Security', href: '/settings/security' },
                            ]}
                            isOpen={isOpen}
                        />
                    </li>
                </ul>
            </nav>
        </div>
    );
}
