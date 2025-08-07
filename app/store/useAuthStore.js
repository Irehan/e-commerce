// D:\web-dev\nextjs-tut\e-commerce\app\store\useAuthStore.js
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            setAuth: (userData) => set({ isAuthenticated: true, user: userData }),
            clearAuth: () => set({ isAuthenticated: false, user: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;
