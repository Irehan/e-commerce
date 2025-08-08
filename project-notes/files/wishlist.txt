// app/wishlist/page.js
'use client';
import React from 'react';
import Link from 'next/link';
import { useWishlistStore } from '../store/useWishlistStore';
import useAuthStore from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowRight, FiLogIn } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';

// --- Wishlist Product Card Sub-component ---
const WishlistCard = ({ product, onRemove, onAddToCart }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden group transition-all duration-300 hover:shadow-md">
            <div className="relative aspect-square">
                <Link href={`/product/${product.id}`} className="block w-full h-full">
                    <img
                        src={product.imageSrc || product.image || product.images?.[0] || '/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                <button
                    onClick={onRemove}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm text-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                >
                    <FiTrash2 className="w-5 h-5" />
                </button>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-slate-800 truncate">{product.name}</h3>
                <p className="text-slate-600 mt-1">${product.price.toFixed(2)}</p>
                <button
                    onClick={onAddToCart}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
                >
                    <FiShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

// --- Main Wishlist Page Component ---
const WishlistPage = () => {
    const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlistStore();
    const { isAuthenticated } = useAuthStore();

    const handleAddToCart = (product) => {
        const cartProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            imageSrc: product.imageSrc || product.image || product.images?.[0] || '/placeholder.jpg',
            quantity: 1
        };
        // Here you would call your cart store's `addToCart` method
        // e.g., useCartStore.getState().addToCart(cartProduct);
        toast.success('Added to cart!', {
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
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } },
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <Toaster position="top-center" />
            <div className="max-w-7xl mx-auto">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {/* --- Header --- */}
                    <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-4 mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Your Wishlist</h1>
                        {isAuthenticated && wishlistItems.length > 0 && (
                            <div className="flex items-center gap-4">
                                <p className="text-slate-600 font-medium">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
                                <button
                                    onClick={clearWishlist}
                                    className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1.5 transition-colors"
                                >
                                    <FiTrash2 /> Clear All
                                </button>
                            </div>
                        )}
                    </motion.div>
                    {/* --- Wishlist Content --- */}
                    {!isAuthenticated ? (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center bg-white rounded-2xl shadow-sm p-12 border border-slate-200/80"
                        >
                            <FiLogIn className="mx-auto w-16 h-16 text-slate-300 mb-4" />
                            <h2 className="text-2xl font-semibold text-slate-800">Please Login</h2>
                            <p className="mt-2 text-slate-500">You need to be logged in to view your wishlist.</p>
                            <Link
                                href="/login"
                                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg shadow-indigo-200"
                            >
                                Go to Login <FiArrowRight />
                            </Link>
                        </motion.div>
                    ) : wishlistItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center bg-white rounded-2xl shadow-sm p-12 border border-slate-200/80"
                        >
                            <FiHeart className="mx-auto w-16 h-16 text-slate-300 mb-4" />
                            <h2 className="text-2xl font-semibold text-slate-800">Your wishlist is empty</h2>
                            <p className="mt-2 text-slate-500">Save items you love for easy access later. They'll show up here.</p>
                            <Link
                                href="/products"
                                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg shadow-indigo-200"
                            >
                                Browse Products <FiArrowRight />
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >

                            <AnimatePresence>
                                {wishlistItems.map(product => (
                                    <motion.div key={product.id} layout variants={itemVariants} exit="exit">
                                        <WishlistCard
                                            product={product}
                                            onRemove={() => removeFromWishlist(product.id)}
                                            onAddToCart={() => handleAddToCart(product)}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default WishlistPage;