// app/login/page.jsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { loginSchema } from '../lib/schemas';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';

export default function LoginPage() {
    const { setAuth } = useAuthStore();
    const router = useRouter();
    const [redirectUrl, setRedirectUrl] = useState('/');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const [showOtp, setShowOtp] = useState(false);

    // Check for redirect URL on component mount
    useEffect(() => {
        const storedRedirectUrl = localStorage.getItem('redirect_after_login');
        if (storedRedirectUrl) {
            setRedirectUrl(storedRedirectUrl);
            // Optional: Show a message to user about redirect
            toast('You need to log in to add items to cart', { icon: 'ℹ️' });
        }
    }, []);

    const onSubmit = async (data) => {
        try {
            const body = { ...data, otp: showOtp ? data.otp : undefined };
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                credentials: 'include',
            });

            const result = await response.json();
            if (!response.ok) {
                if (result.requires2FA) {
                    setShowOtp(true);
                    setValue('otp', '');
                    toast.error('2FA required. Enter the code from your authenticator app.');
                } else {
                    throw new Error(result.error || 'Failed to log in');
                }
            } else {
                toast.success('Login successful!');

                // Update auth store
                setAuth(result.user);

                // Save user data to localStorage
                localStorage.setItem('auth_user', JSON.stringify(result.user));

                // Notify other components (like Header)
                window.dispatchEvent(new CustomEvent('authStateChange', {
                    detail: { type: 'login', user: result.user }
                }));

                // Clear redirect URL from storage
                localStorage.removeItem('redirect_after_login');

                // Navigate to redirect URL or homepage
                router.push(redirectUrl);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-100 px-4">
            <div className="bg-white border border-gray-200 shadow-xl rounded-2xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-tight">🔐 Welcome Back</h2>

                {/* Show redirect message if coming from cart action */}
                {redirectUrl !== '/' && (
                    <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-700 text-center">
                            Please log in to add items to your cart
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register('email')}
                            className="text-black w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            {...register('password')}
                            className="text-black w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {showOtp && (
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">2FA Code</label>
                            <input
                                id="otp"
                                type="text"
                                autoComplete="one-time-code"
                                {...register('otp', { required: showOtp ? '2FA code is required' : false })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                placeholder="123456"
                            />
                            {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all duration-300 shadow-md disabled:opacity-60"
                    >
                        {isSubmitting ? 'Logging in...' : showOtp ? 'Verify 2FA' : 'Log In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-indigo-600 hover:underline font-medium">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}