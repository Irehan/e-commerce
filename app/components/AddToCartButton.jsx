// components/AddToCartButton.jsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FiShoppingCart } from 'react-icons/fi'
import { useCartStore } from '../store/useCartStore'
import toast from 'react-hot-toast'

const AddToCartButton = ({ product, size = '', colour = '' }) => {
    const addToCart = useCartStore((state) => state.addToCart)
    const router = useRouter()

    const handleClick = () => {
        const ok = addToCart(product, size, colour, 1)
        if (!ok) {
            toast.error('Please log in to add items to your cart', { id: 'add-cart-auth' })
            // Ensure redirect is preserved for after login
            const currentUrl = window.location.pathname + window.location.search
            localStorage.setItem('redirect_after_login', currentUrl)
            router.push('/login')
            return
        }
        toast.success('Added to bag')
    }

    return (
        <button
            onClick={handleClick}
            className="inline-flex items-centre gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 font-semibold hover:bg-indigo-700 transition-colours"
        >
            <FiShoppingCart className="h-4 w-4" />
            Add to Cart
        </button>
    )
}

export default AddToCartButton
