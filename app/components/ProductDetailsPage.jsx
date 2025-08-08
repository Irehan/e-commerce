// D:\web-dev\nextjs-tut\e-commerce\app\components\ProductDetailsPage.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
    FiHeart, FiShare2, FiShoppingCart, FiStar, FiCheck,
    FiTruck, FiRefreshCw, FiShield, FiZap, FiEye, FiThumbsUp,
    FiMinus, FiPlus, FiShoppingBag, FiArrowRight
} from 'react-icons/fi';
import { useCartStore } from '../store/useCartStore'; // Import cart store
import { useWishlistStore } from '../store/useWishlistStore'; // Import wishlist store
import { isAuthenticated } from '../lib/utils/auth'; // Import auth utility

// Animation Variants for Framer Motion
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProductDetailsPage({ product = mockProduct }) {
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState(product.colors?.find(c => c.available)?.name || '');
    const [quantity, setQuantity] = useState(1);
    const [userAuthenticated, setUserAuthenticated] = useState(false); // Track auth state
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    // Get cart store methods
    const { addToCart } = useCartStore();

    // Get wishlist store methods
    const { addToWishlist, removeFromWishlist, isInWishlist: checkIsInWishlist } = useWishlistStore();

    // Check if product is in wishlist
    const isInWishlist = checkIsInWishlist(product.id);

    const getSafeArray = (arr) => Array.isArray(arr) ? arr : [];

    // Check authentication status on component mount and set up listeners
    useEffect(() => {
        const checkAuthStatus = () => {
            setUserAuthenticated(isAuthenticated());
        };

        // Initial check
        checkAuthStatus();

        // Listen for auth state changes
        const handleAuthChange = () => {
            checkAuthStatus();
        };

        const handleStorageChange = (e) => {
            if (e.key === 'auth_user' || e.key === 'auth_change') {
                checkAuthStatus();
            }
        };

        window.addEventListener('authStateChange', handleAuthChange);
        window.addEventListener('storage', handleStorageChange);

        // Cleanup listeners
        return () => {
            window.removeEventListener('authStateChange', handleAuthChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        getSafeArray(product.images).forEach(imageSrc => {
            const img = new Image();
            img.src = imageSrc;
        });
    }, [product.images]);

    const handleAddToCart = () => {
        // Validate size selection
        if (getSafeArray(product.sizes).length > 0 && !selectedSize) {
            toast.error('Please select a size', {
                style: {
                    borderRadius: '12px',
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fecaca'
                },
                iconTheme: {
                    primary: '#dc2626',
                    secondary: '#fef2f2'
                }
            });
            return;
        }

        // Validate color selection
        if (getSafeArray(product.colors).length > 0 && !selectedColor) {
            toast.error('Please select a color', {
                style: {
                    borderRadius: '12px',
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fecaca'
                },
                iconTheme: {
                    primary: '#dc2626',
                    secondary: '#fef2f2'
                }
            });
            return;
        }

        // Attempt to add to cart (this will handle authentication redirect internally)
        const success = addToCart(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                imageSrc: product.images?.[0] || '/placeholder.jpg'
            },
            selectedSize,
            selectedColor,
            quantity
        );

        // Only show success toast if the item was actually added to cart
        if (success) {
            toast.success('Item added to cart', {
                style: {
                    borderRadius: '12px',
                    background: '#f0fdf4',
                    color: '#16a34a',
                    border: '1px solid #bbf7d0',
                    fontWeight: '600'
                },
                iconTheme: {
                    primary: '#16a34a',
                    secondary: '#f0fdf4'
                },
                duration: 3000
            });
        }
        // If success is false, the user has been redirected to login
    };

    const handleWishlistToggle = () => {
        // Create the product object for the wishlist
        const wishlistProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            imageSrc: product.images?.[0] || '/placeholder.jpg',
            department: product.department,
            category: product.category,
            subcategory: product.subcategory
        };

        if (isInWishlist) {
            removeFromWishlist(product.id);
            toast('Removed from wishlist', {
                style: {
                    borderRadius: '12px',
                    background: '#f8fafc',
                    color: '#64748b',
                    border: '1px solid #e2e8f0'
                }
            });
        } else {
            const success = addToWishlist(wishlistProduct);
            if (success) {
                toast.success('Added to wishlist', {
                    style: {
                        borderRadius: '12px',
                        background: '#fef7f0',
                        color: '#ea580c',
                        border: '1px solid #fed7aa'
                    },
                    iconTheme: {
                        primary: '#ea580c',
                        secondary: '#fef7f0'
                    }
                });
            }
            // If success is false, user was redirected to login
        }
    };

    const tabs = [
        { id: 'description', label: 'Description', icon: FiEye },
        { id: 'specs', label: 'Specifications', icon: FiZap },
        { id: 'reviews', label: 'Reviews', icon: FiThumbsUp }
    ];

    if (!product) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800 p-10">Product not found.</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
            <Toaster position="top-center" />

            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 left-0 w-1/3 h-2/3 bg-gradient-to-br from-indigo-200 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-200 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto p-4 sm:p-8 lg:p-12">
                <motion.div
                    className="grid lg:grid-cols-2 lg:gap-16 items-start"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* --- Image Gallery --- */}
                    <motion.div className="w-full lg:sticky lg:top-8 space-y-4" variants={itemVariants}>
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-2xl shadow-slate-200">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedImage}
                                    src={product.images?.[selectedImage] || '/placeholder.jpg'}
                                    alt={product.name}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {getSafeArray(product.images).map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ${selectedImage === index
                                        ? 'ring-2 ring-indigo-500 shadow-lg'
                                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                                        }`}
                                >
                                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* --- Product Info --- */}
                    <motion.div className="space-y-8 mt-12 lg:mt-0" variants={itemVariants}>
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">{product.department}</span>
                                <div className="flex items-center gap-3">
                                    {/* <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded-full transition-colors duration-300 ${isLiked ? 'text-red-500 bg-red-100' : 'text-slate-500 hover:bg-slate-100'}`}>
                                        <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                    </button> */}
                                    <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors duration-300"><FiShare2 className="w-5 h-5" /></button>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">{product.name}</h1>
                        </div>

                        {/* Rating & Price */}
                        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
                            <div className="flex items-center gap-1.5">
                                {[...Array(5)].map((_, i) => <FiStar key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'text-amber-500 fill-current' : 'text-slate-300'}`} />)}
                                <span className="ml-1 text-lg font-semibold text-slate-800">{product.rating}</span>
                                <span className="text-sm text-slate-500">({product.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                                {product.onSale && (
                                    <span className="text-xl text-slate-400 line-through">${product.originalPrice?.toFixed(2)}</span>
                                )}
                            </div>
                        </div>

                        {/* Size Selection */}
                        {getSafeArray(product.sizes).length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-900">Size</h3>
                                <div className="flex flex-wrap gap-3">
                                    {getSafeArray(product.sizes).map((size) => (
                                        <button key={size} onClick={() => setSelectedSize(size)}
                                            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${selectedSize === size ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' : 'bg-white border-slate-200 hover:border-slate-400'}`}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color Selection */}
                        {getSafeArray(product.colors).length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-900">Color: <span className="font-normal text-slate-600">{selectedColor}</span></h3>
                                <div className="flex items-center gap-3">
                                    {getSafeArray(product.colors).map((color) => (
                                        <button key={color.name} onClick={() => color.available && setSelectedColor(color.name)} disabled={!color.available}
                                            className={`relative w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center
                                            ${selectedColor === color.name ? 'border-indigo-500 scale-110' : 'border-slate-200'}
                                            ${!color.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-slate-400'}`}
                                            style={{ backgroundColor: color.color }}
                                            aria-label={color.name}
                                        >
                                            {!color.available && <div className="absolute w-full h-0.5 bg-slate-500 transform rotate-45"></div>}
                                            {selectedColor === color.name && <FiCheck className="w-5 h-5 text-white mix-blend-difference" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity & Actions */}
                        <div className="pt-6 border-t border-slate-200 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-900">Quantity</h3>
                                <div className="flex items-center bg-slate-100 rounded-xl p-1">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center justify-center"><FiMinus /></button>
                                    <span className="w-12 text-center text-lg font-semibold text-slate-900">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center justify-center"><FiPlus /></button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-100 transition-transform duration-300 shadow-lg shadow-indigo-200 group"
                                >
                                    <FiShoppingCart className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                                    <span>Add to Cart</span>
                                </button>
                                <button
                                    onClick={handleWishlistToggle}
                                    className={`w-full py-4 px-6 rounded-xl font-semibold text-base flex items-center justify-center gap-2 border transition-all duration-300 ${isInWishlist
                                        ? 'bg-red-100 border-red-200 text-red-600 hover:bg-red-200/70'
                                        : 'bg-transparent border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
                                        }`}
                                >
                                    <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                                    <span>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Features List */}
                        {getSafeArray(product.features).length > 0 && (
                            <div className="space-y-4">
                                {getSafeArray(product.features).map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                            <FiCheck className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-slate-600">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </motion.div>

                {/* --- Tabs Section --- */}
                <motion.div className="mt-20 lg:mt-24" variants={itemVariants}>
                    <LayoutGroup>
                        <div className="flex gap-2 bg-slate-100/80 backdrop-blur-sm p-2 border border-slate-200/80 rounded-2xl max-w-md mx-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${activeTab === tab.id ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="active-tab-indicator"
                                            className="absolute inset-0 bg-indigo-600 rounded-xl"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <tab.icon className="relative z-10 w-5 h-5" />
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </LayoutGroup>

                    <div className="mt-8 bg-white/80 backdrop-blur-lg p-6 sm:p-8 border border-slate-200/80 rounded-3xl min-h-[200px] shadow-lg shadow-slate-200/50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'description' && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Description</h2>
                                        <p className="text-slate-600 leading-relaxed">{product.description}</p>
                                    </div>
                                )}
                                {activeTab === 'specs' && product.specs && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Technical Specifications</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {Object.entries(product.specs).map(([key, val]) => (
                                                <div key={key} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                                                    <span className="text-slate-500 text-sm">{key}</span>
                                                    <span className="text-slate-800 font-semibold text-sm text-right">{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'reviews' && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Customer Reviews</h2>
                                        <p className="text-slate-500 italic">No reviews yet. Be the first to share your thoughts!</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}