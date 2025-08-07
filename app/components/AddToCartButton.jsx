// components/AddToCartButton.jsx
'use client';

import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { FiShoppingCart } from 'react-icons/fi';

const AddToCartButton = ({ product, size = 'medium' }) => {
    const addToCart = useCartStore(state => state.addToCart);

    const handleClick = () => {
        // Use default values for size and color
        addToCart(
            product,
            '', // default size
            '', // default color
            1   // default quantity
        );
    };

    // Determine button classes based on size
    const buttonClasses = {
        small: 'text-xs px-2 py-1',
        medium: 'text-sm px-3 py-2',
        large: 'text-base px-4 py-2'
    }[size] || 'text-sm px-3 py-2';

    return (
        <button
            onClick={handleClick}
            className={`${buttonClasses} bg-black text-white rounded flex items-center justify-center gap-1 hover:bg-gray-800 transition-colors`}
        >
            <FiShoppingCart className="text-sm" />
            <span>Add</span>
        </button>
    );
};

export default AddToCartButton;