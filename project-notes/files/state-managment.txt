// lib/context/AuthContext.js
'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            if (typeof window !== 'undefined') {
                const storedUser = localStorage.getItem('auth_user');
                setUser(storedUser ? JSON.parse(storedUser) : null);
            }
            setLoading(false);
        };

        checkAuth();

        const handleAuthChange = () => checkAuth();
        window.addEventListener('authStateChange', handleAuthChange);

        return () => {
            window.removeEventListener('authStateChange', handleAuthChange);
        };
    }, []);

    const login = (userData) => {
        localStorage.setItem('auth_user', JSON.stringify(userData));
        setUser(userData);
        window.dispatchEvent(new CustomEvent('authStateChange'));
    };

    const logout = () => {
        localStorage.removeItem('auth_user');
        setUser(null);
        window.dispatchEvent(new CustomEvent('authStateChange'));
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        redirectToLogin: (message = null) => {
            const currentUrl = window.location.pathname + window.location.search;
            localStorage.setItem('redirect_after_login', currentUrl);
            if (message) localStorage.setItem('login_message', message);
            window.location.href = '/login';
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};