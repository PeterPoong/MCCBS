import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
        password: '',
        remember: false,
        countryCode: '+1', // Default country code
        contactNumber: '',
    });

    const [activeTab, setActiveTab] = useState('contact_number');

    useEffect(() => {
        return () => {
            resetFields();
        };
    }, []);

    const resetFields = () => {
        setData({
            login: '',
            password: '',
            remember: false,
            countryCode: '+1',
            contactNumber: '',
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const handleContactNumberInputChange = (e) => {
        setData('contactNumber', e.target.value);
    };

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        resetFields();
    };


    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="flex items-center justify-center mt-4">
                <b><h2>Login With</h2></b>
            </div>

            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'contact_number' ? 'active' : ''}`}
                    onClick={() => handleTabSwitch('contact_number')}                >
                    Phone-Num
                </button>
                
                <button
                    className={`tab ${activeTab === 'email_or_ic' ? 'active' : ''}`}
                    onClick={() => handleTabSwitch('email_or_ic')}                >
                    Email/IC
                </button>
            </div>

            <form onSubmit={submit}>
                {activeTab === 'email_or_ic' && (
                    <div>
                        <div>
                            <InputLabel htmlFor="login" value="Email / IC Number" />
                            <TextInput
                                id="login"
                                name="login"
                                value={data.login}
                                placeholder="Email or IC Number"
                                className="mt-1 block w-full"
                                autoComplete="login"
                                isFocused={true}
                                onChange={(e) => setData('login', e.target.value)}
                                required
                            />
                            <InputError message={errors.login} className="mt-2" />
                        </div>

                        {/* <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div> */}
                    </div>
                )}

                {activeTab === 'contact_number' && (
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
                                    <option value="+1">+1 (USA)</option>
                                    <option value="+44">+44 (UK)</option>
                                    <option value="+61">+61 (Australia)</option>
                                    <option value="+60">+60 (Malaysia)</option>
                                    {/* Add more options as needed */}
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
                            {errors.contactNumber && (
                                <InputError message={errors.contactNumber} className="mt-2" />
                            )}
                        </div>
                    </div>
                )}

                {/* Password Input */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}

                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

                <div className="flex items-center justify-center mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="flex items-center justify-center mt-4">
                    <Link
                        href={route('register')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Haven't Registered?
                    </Link>
                </div>
            </form>

            <style jsx>{`
                .tabs {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 1rem;
                }
                .tab {
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    border-bottom: none;
                }
                .tab.active {
                    background-color: #fff;
                    font-weight: bold;
                }
            `}</style>
        </GuestLayout>
    );
}
