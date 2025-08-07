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
