// lib/utils/auth.js
/**
 * Authentication Utilities
 */

// Check if user is authenticated
export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    const user = localStorage.getItem('auth_user');
    return user && user !== 'null';
};

// Get current user data
export const getCurrentUser = () => {
    if (!isAuthenticated()) return null;
    try {
        return JSON.parse(localStorage.getItem('auth_user'));
    } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
    }
};

// Redirect to login with return URL
export const redirectToLogin = (message = null) => {
    const currentUrl = window.location.pathname + window.location.search;
    localStorage.setItem('redirect_after_login', currentUrl);

    if (message) {
        localStorage.setItem('login_message', message);
    }

    window.location.href = '/login';
};

// Logout functionality
export const logout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('redirect_after_login');
    window.dispatchEvent(new CustomEvent('authStateChange'));
    localStorage.setItem('auth_change', Date.now().toString());
    window.location.href = '/';
};

// Setup authentication listeners
export const setupAuthListeners = (callback) => {
    const handleAuthChange = () => callback();
    const handleStorageChange = (e) => {
        if (e.key === 'auth_user' || e.key === 'auth_change') {
            callback();
        }
    };

    window.addEventListener('authStateChange', handleAuthChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('authStateChange', handleAuthChange);
        window.removeEventListener('storage', handleStorageChange);
    };
};

// React hook for authentication
export const useAuth = () => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const checkAuth = () => {
            const currentUser = getCurrentUser();
            setUser(currentUser);
            setLoading(false);
        };

        checkAuth();

        const cleanup = setupAuthListeners(checkAuth);
        return cleanup;
    }, []);

    return {
        user,
        isAuthenticated: !!user,
        loading,
        logout,
        redirectToLogin
    };
};