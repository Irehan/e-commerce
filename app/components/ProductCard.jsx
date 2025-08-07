// app/components/ProductCard.jsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

    // Move productDetailsUrl inside the component where product is available
    const productDetailsUrl = `/product/${product.id}` || `/product/${product.slug}`;

    useEffect(() => {
        const loadImage = async () => {
            // If no imageSrc provided, use placeholder
            if (!product.imageSrc || typeof product.imageSrc !== 'string' || product.imageSrc.trim() === '') {
                setImageSrc('/placeholder.jpg');
                setIsLoading(false);
                return;
            }

            // Check if the original image exists
            const imageExists = await checkImageExists(product.imageSrc);

            if (imageExists) {
                setImageSrc(product.imageSrc);
            } else {
                setImageSrc('/placeholder.jpg');
            }

            setIsLoading(false);
        };

        loadImage();
    }, [product.imageSrc]);

    const handleImageError = () => {
        // Final fallback if image fails to load even after our check
        if (imageSrc !== '/placeholder.jpg') {
            setImageSrc('/placeholder.jpg');
        }
    };

    return (
        <Link href={productDetailsUrl} className="block">
            <div className="group">
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
                </div>
                <div className="mt-4 text-center">
                    <h3 className="text-base font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200">
                        {product.name}
                    </h3>
                    <Price product={product} />
                </div>
            </div>
        </Link>
    );
}