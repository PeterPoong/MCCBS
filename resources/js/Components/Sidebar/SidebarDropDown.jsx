import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function SidebarDropdown({ title, links, isOpen }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 focus:outline-none flex items-center justify-between"
            >
                <span className={`${isOpen ? 'block' : 'hidden'}`}>{title}</span>
                <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {isDropdownOpen && isOpen && (
                <ul className="bg-gray-700 rounded shadow-lg mt-2">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link
                                href={link.href}
                                className="block py-2 px-4 hover:bg-gray-600"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
