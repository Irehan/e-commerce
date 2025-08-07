// D:\web-dev\nextjs-tut\e-commerce\app\components\AuthProvider.jsx
'use client';
import { useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';

export default function AuthProvider({ children }) {
    const { setAuth, clearAuth } = useAuthStore();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('/api/users/me', {
                    credentials: 'include',
                });

                if (response.ok) {
                    const userData = await response.json();
                    setAuth(userData);
                } else {
                    clearAuth();
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                clearAuth();
            }
        };

        checkAuthStatus();
    }, [setAuth, clearAuth]);

    return children;
}
