// D:\web-dev\nextjs-tut\e-commerce\app\components\AuthGuard.jsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../store/useAuthStore';

export default function AuthGuard({ children }) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    return children;
}
