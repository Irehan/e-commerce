// components/AddToWishlist.js
'use client';

import React from 'react';
import { useWishlistStore } from '../store/useWishlistStore';

const AddToWishlist = ({ product }) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
    const [isInList, setIsInList] = React.useState(false);

    React.useEffect(() => {
        setIsInList(isInWishlist(product.id));
    }, [product.id, isInWishlist]);

    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('user_token'); // Replace 'user_token' with your actual key

    const handleWishlistClick = () => {
        if (!isAuthenticated) {
            const currentUrl = window.location.pathname + window.location.search;
            localStorage.setItem('redirect_after_login', currentUrl);
            window.location.href = '/login';
            return;
        }

        if (isInList) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                department: product.department,
                category: product.category,
                subcategory: product.subcategory
            });
        }
    };

    return (
        <button
            onClick={handleWishlistClick}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            aria-label={isInList ? "Remove from wishlist" : "Add to wishlist"}
        >
            {isInList ? '❤️' : '🤍'}
        </button>
    );
};

export default AddToWishlist;
