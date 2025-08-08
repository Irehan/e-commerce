// app/store/useCartStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useAuthStore from './useAuthStore'

// Single source of truth for auth, same as wishlist
const isAuthenticated = () => {
    if (typeof window === 'undefined') return false
    return useAuthStore.getState().isAuthenticated
}

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],

            clearCart: () => set({ cart: [] }),

            addToCart: (product, selectedSize, selectedColor, quantity = 1) => {
                // Gate by auth, but let the caller handle toast and navigation
                if (!isAuthenticated()) {
                    // Store the current URL for redirect after login
                    const currentUrl = window.location.pathname + window.location.search
                    localStorage.setItem('redirect_after_login', currentUrl)
                    return false
                }

                const cart = get().cart
                const existing = cart.find(
                    (item) =>
                        item.id === product.id &&
                        item.size === selectedSize &&
                        item.color === selectedColor
                )

                if (existing) {
                    existing.quantity += quantity
                    set({ cart: [...cart] })
                } else {
                    set({
                        cart: [
                            ...cart,
                            {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.imageSrc,
                                size: selectedSize,
                                color: selectedColor,
                                quantity
                            }
                        ]
                    })
                }
                return true
            },

            removeFromCart: (productId, size, color) => {
                const newCart = get().cart.filter(
                    (item) => !(item.id === productId && item.size === size && item.color === color)
                )
                set({ cart: newCart })
            },

            // Helper method to check if user can modify cart
            canModifyCart: () => isAuthenticated(),

            // Method to update cart quantity
            updateQuantity: (productId, size, color, newQuantity) => {
                if (!isAuthenticated()) return false

                const cart = get().cart
                const itemIndex = cart.findIndex(
                    (item) => item.id === productId && item.size === size && item.color === color
                )

                if (itemIndex !== -1) {
                    if (newQuantity <= 0) {
                        cart.splice(itemIndex, 1)
                    } else {
                        cart[itemIndex].quantity = newQuantity
                    }
                    set({ cart: [...cart] })
                    return true
                }
                return false
            }
        }),
        {
            name: 'cart-storage',
            // Only persist cart for authenticated users
            partialize: (state) => (isAuthenticated() ? { cart: state.cart } : { cart: [] })
        }
    )
)

export const useCartCount = () =>
    useCartStore((state) => state.cart.reduce((total, item) => total + item.quantity, 0))
