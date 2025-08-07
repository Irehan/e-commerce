// ALL UI Frontend
// D:\web-dev\nextjs-tut\e-commerce\app\login\page.jsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { loginSchema } from '../lib/schemas';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const [showOtp, setShowOtp] = useState(false);

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

                // ✅ Save user data to localStorage
                localStorage.setItem('auth_user', JSON.stringify(result));

                // ✅ Notify other components (like Header)
                window.dispatchEvent(new CustomEvent('authStateChange', {
                    detail: { type: 'login', user: result }
                }));

                // ✅ Sync across browser tabs
                localStorage.setItem('auth_change', Date.now().toString());

                // ✅ Navigate to homepage
                router.push('/');
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        }
    };



    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-100 px-4">
            <div className="bg-white border border-gray-200 shadow-xl rounded-2xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-tight">🔐 Welcome Back</h2>
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
-----------------------------------------------------------------

    // D:\web-dev\nextjs-tut\e-commerce\app\profile\page.jsx
    'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('Fetching user data from /api/users/me...');
                const response = await fetch('/api/users/me', {
                    credentials: 'include',
                });
                const data = await response.json();
                console.log('API Response:', data);

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch user');
                }
                setUser(data);
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error(error.message || 'An error occurred');
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/users/logout', {
                method: 'POST',
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to log out');
            }
            toast.success('Logged out successfully!');
            router.push('/login');
        } catch (error) {
            toast.error(error.message || 'An error occurred');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md text-white">
                <h2 className="text-3xl font-bold text-center mb-6 tracking-tight">👤 User Profile</h2>
                <div className="space-y-6">
                    <div>
                        <p className="text-sm text-gray-300 uppercase tracking-wide">Username</p>
                        <p className="text-xl font-semibold text-white mt-1">{user.username}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-300 uppercase tracking-wide">Email</p>
                        <p className="text-xl font-semibold text-white mt-1">{user.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-pink-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50 text-white font-semibold"
                    >
                        🚪 Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
------------------------------------------------------------------------------------

    // D:\web-dev\nextjs-tut\e-commerce\app\signup\page.jsx
    'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signupSchema } from '../lib/schemas';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to sign up');

            toast.success('Signup successful! Please log in.');
            router.push('/login');
        } catch (error) {
            toast.error(error.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl w-full max-w-md p-8 text-white">
                <h2 className="text-3xl font-bold text-center mb-8 tracking-tight">🚀 Create an Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm text-gray-300 mb-1">Username</label>
                        <input
                            id="username"
                            type="text"
                            {...register('username')}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition"
                            placeholder="Enter your username"
                        />
                        {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 text-white font-semibold disabled:opacity-60"
                    >
                        {isSubmitting ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <a href="/login" className="text-indigo-400 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
