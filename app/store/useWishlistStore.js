// stores/useWishlistStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Simple authentication check
const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    const user = localStorage.getItem('auth_user');
    return user && user !== 'null';
};

export const useWishlistStore = create(persist(
    (set, get) => ({
        wishlistItems: [],

        addToWishlist: (product) => {
            if (!isAuthenticated()) {
                const currentUrl = window.location.pathname + window.location.search;
                localStorage.setItem('redirect_after_login', currentUrl);
                window.location.href = '/login';
                return false;
            }

            const wishlistItems = get().wishlistItems;
            const existing = wishlistItems.find(item => item.id === product.id);

            if (!existing) {
                set({
                    wishlistItems: [
                        ...wishlistItems,
                        product
                    ]
                });
            }
            return true;
        },

        removeFromWishlist: (productId) => {
            const newWishlist = get().wishlistItems.filter(
                item => item.id !== productId
            );
            set({ wishlistItems: newWishlist });
        },

        clearWishlist: () => set({ wishlistItems: [] }),

        isInWishlist: (productId) => {
            return get().wishlistItems.some(item => item.id === productId);
        }
    }),
    {
        name: 'wishlist-storage',
        partialize: (state) => isAuthenticated() ? { wishlistItems: state.wishlistItems } : { wishlistItems: [] }
    }
));

export const useWishlistCount = () =>
    useWishlistStore((state) => state.wishlistItems.length);