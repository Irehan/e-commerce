// app/components/ProductCard.jsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';
import { useWishlistStore } from '../store/useWishlistStore';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';

const SaleBadge = () => (
    <div className="absolute top-4 left-4 bg-[#DB4444] text-white text-[11px] font-medium tracking-wide px-3 py-1 rounded-sm">
        Sale
    </div>
);

const Price = ({ product }) => (
    <div className="mt-2 text-base">
        {product.onSale ? (
            <div className="flex items-center justify-center gap-3">
                <span className="text-gray-900 font-semibold">${product.price.toFixed(2)}</span>
                <span className="text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            </div>
        ) : (
            <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
        )}
    </div>
);

// Function to check if image exists without triggering 404 in console
const checkImageExists = async (src) => {
    try {
        const response = await fetch(src, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
};

export default function ProductCard({ product }) {
    const [imageSrc, setImageSrc] = useState('/placeholder.jpg');
    const [isLoading, setIsLoading] = useState(true);

    // Wishlist store
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
    const inWishlist = isInWishlist(product.id);

    // Move productDetailsUrl inside the component where product is available
    const productDetailsUrl = `/product/${product.id}` || `/product/${product.slug}`;

    useEffect(() => {
        const loadImage = async () => {
            // Try different possible image sources
            const possibleImageSrc = product.imageSrc || product.image || product.images?.[0];

            // If no image source provided, use placeholder
            if (!possibleImageSrc || typeof possibleImageSrc !== 'string' || possibleImageSrc.trim() === '') {
                setImageSrc('/placeholder.jpg');
                setIsLoading(false);
                return;
            }

            // Check if the original image exists
            const imageExists = await checkImageExists(possibleImageSrc);

            if (imageExists) {
                setImageSrc(possibleImageSrc);
            } else {
                setImageSrc('/placeholder.jpg');
            }

            setIsLoading(false);
        };

        loadImage();
    }, [product.imageSrc, product.image, product.images]);

    const handleImageError = () => {
        // Final fallback if image fails to load even after our check
        if (imageSrc !== '/placeholder.jpg') {
            setImageSrc('/placeholder.jpg');
        }
    };

    const handleWishlistClick = (e) => {
        e.preventDefault(); // Prevent navigation to product details
        e.stopPropagation();

        const isAuthenticated = useAuthStore.getState().isAuthenticated;

        if (!isAuthenticated) {
            toast.error('Please login to add items to your wishlist');
            return;
        }

        const wishlistProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            imageSrc: product.imageSrc || product.image || product.images?.[0] || '/placeholder.jpg',
            department: product.department,
            category: product.category,
            subcategory: product.subcategory
        };

        if (inWishlist) {
            removeFromWishlist(product.id);
            toast.success('Removed from wishlist');
        } else {
            const success = addToWishlist(wishlistProduct);
            if (success) {
                toast.success('Added to wishlist');
            }
        }
    };

    return (
        <div className="group relative">
            <Link href={productDetailsUrl} className="block">
                <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden cursor-pointer">
                    {isLoading ? (
                        <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                            <div className="text-gray-400 text-sm">Loading...</div>
                        </div>
                    ) : (
                        <img
                            src={imageSrc}
                            alt={product.name}
                            onError={handleImageError}
                            className="object-contain object-center w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                    )}
                    {product.onSale && <SaleBadge />}

                    {/* Wishlist Button - positioned absolutely over the image */}
                    <button
                        onClick={handleWishlistClick}
                        className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 z-10 ${inWishlist
                            ? 'bg-red-500 text-white shadow-lg'
                            : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                            } opacity-0 group-hover:opacity-100 hover:scale-110`}
                        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <FiHeart
                            className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`}
                        />
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <h3 className="text-base font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200">
                        {product.name}
                    </h3>
                    <Price product={product} />
                </div>
            </Link>
        </div>
    );
}