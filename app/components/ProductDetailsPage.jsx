// D:\web-dev\nextjs-tut\e-commerce\app\components\ProductDetailsPage.jsx
'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import {
    FiHeart, FiShare2, FiShoppingCart, FiStar, FiCheck,
    FiEye, FiThumbsUp, FiMinus, FiPlus, FiZap
} from 'react-icons/fi'

// keep this import as it already exists in your project structure
import { useWishlistStore } from '../store/useWishlistStore'
import { useCartStore } from '../store/useCartStore'
import { useRouter } from 'next/navigation'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
}

const getSafeArray = (arr) => Array.isArray(arr) ? arr : []

export default function ProductDetailsPage({ product }) {
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
    const [selectedColor, setSelectedColor] = useState(product.colors?.find(c => c.available)?.name || '')
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const [activeTab, setActiveTab] = useState('description')
    const [hasMounted, setHasMounted] = useState(false)

    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()

    // cart store and router for auth-gated add to cart
    const addToCart = useCartStore(state => state.addToCart)
    const router = useRouter()

    // hydration-safe wishlist guard
    const inWishlist = isInWishlist(product.id)
    useEffect(() => { setHasMounted(true) }, [])
    const safeInWishlist = hasMounted ? inWishlist : false

    // preload gallery images
    useEffect(() => {
        getSafeArray(product.images).forEach(src => {
            const img = new Image()
            img.src = src
        })
    }, [product.images])

    const handleAddToCart = () => {
        if (getSafeArray(product.sizes).length > 0 && !selectedSize) {
            toast.error('Please select a size')
            return
        }
        if (getSafeArray(product.colors).length > 0 && !selectedColor) {
            toast.error('Please select a colour')
            return
        }

        const ok = addToCart(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                imageSrc: product.images?.[0] || '/placeholder.jpg'
            },
            selectedSize,
            selectedColor,
            quantity
        )

        if (!ok) {
            toast.error('Please log in to add items to your cart', { id: 'pdp-cart-auth' })
            localStorage.setItem('redirect_after_login', window.location.pathname + window.location.search)
            router.push('/login')
            return
        }

        toast.success(`Added ${quantity} to cart`)
    }

    const handleWishlistToggle = () => {
        const wishlistProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            imageSrc: product.images?.[0] || '/placeholder.jpg',
            department: product.department,
            category: product.category,
            subcategory: product.subcategory
        }

        if (inWishlist) {
            removeFromWishlist(product.id)
            toast('Removed from wishlist')
        } else {
            const success = addToWishlist(wishlistProduct)
            if (success) toast.success('Added to wishlist')
        }
    }

    const tabs = [
        { id: 'description', label: 'Description', icon: FiEye },
        { id: 'specs', label: 'Specifications', icon: FiZap },
        { id: 'reviews', label: 'Reviews', icon: FiThumbsUp }
    ]

    if (!product) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center p-10">Product not found.</div>
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <Toaster position="top-center" />

            <div className="relative container mx-auto p-4 sm:p-8 lg:p-12">
                <motion.div
                    className="grid lg:grid-cols-2 lg:gap-16 items-start"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Gallery */}
                    <motion.div className="w-full lg:sticky lg:top-8 space-y-4" variants={itemVariants}>
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedImage}
                                    src={product.images?.[selectedImage] || '/placeholder.jpg'}
                                    alt={product.name}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {getSafeArray(product.images).map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square rounded-2xl overflow-hidden ${selectedImage === index
                                        ? 'ring-2 ring-indigo-500'
                                        : 'opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div className="space-y-8 mt-12 lg:mt-0" variants={itemVariants}>
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold">{product.name}</h1>
                        </div>

                        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
                            <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                            {product.onSale && (
                                <span className="text-xl text-slate-400 line-through">${product.originalPrice?.toFixed(2)}</span>
                            )}
                        </div>

                        {/* Size */}
                        {getSafeArray(product.sizes).length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Size</h3>
                                <div className="flex flex-wrap gap-3">
                                    {getSafeArray(product.sizes).map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${selectedSize === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-slate-200 hover:border-slate-400'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Colour */}
                        {getSafeArray(product.colors).length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">
                                    Colour: <span className="font-normal text-slate-600">{selectedColor}</span>
                                </h3>
                                <div className="flex items-center gap-3">
                                    {getSafeArray(product.colors).map((colour) => (
                                        <button
                                            key={colour.name}
                                            onClick={() => colour.available && setSelectedColor(colour.name)}
                                            disabled={!colour.available}
                                            className={`relative w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center
                        ${selectedColor === colour.name ? 'border-indigo-500 scale-110' : 'border-slate-200'}
                        ${!colour.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-slate-400'}`}
                                            style={{ backgroundColor: colour.color }}
                                            aria-label={colour.name}
                                        >
                                            {!colour.available && <div className="absolute w-full h-0.5 bg-slate-500 transform rotate-45"></div>}
                                            {selectedColor === colour.name && <FiCheck className="w-5 h-5 text-white mix-blend-difference" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity and actions */}
                        <div className="pt-6 border-t border-slate-200 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Quantity</h3>
                                <div className="flex items-center bg-slate-100 rounded-xl p-1">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colours flex items-center justify-center"><FiMinus /></button>
                                    <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colours flex items-center justify-center"><FiPlus /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3"
                                >
                                    <FiShoppingCart className="w-5 h-5" />
                                    <span>Add to Cart</span>
                                </button>

                                <button
                                    onClick={handleWishlistToggle}
                                    className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 border ${safeInWishlist
                                        ? 'bg-red-100 border-red-200 text-red-600'
                                        : 'bg-transparent border-slate-300 text-slate-700'
                                        }`}
                                    aria-label={safeInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                                >
                                    <FiHeart className={`w-5 h-5 ${safeInWishlist ? 'fill-current' : ''}`} />
                                    <span>{safeInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        {getSafeArray(product.features).length > 0 && (
                            <div className="space-y-3">
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

                {/* Tabs */}
                <motion.div className="mt-16" variants={itemVariants}>
                    <LayoutGroup>
                        <div className="flex gap-2 bg-slate-100 p-2 border border-slate-200 rounded-2xl max-w-md mx-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${activeTab === tab.id ? 'text-white bg-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </LayoutGroup>

                    <div className="mt-8 bg-white p-6 sm:p-8 border border-slate-200 rounded-3xl min-h-[200px] shadow-lg">
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
                                        <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                                        <p className="text-slate-600 leading-relaxed">{product.description}</p>
                                    </div>
                                )}

                                {activeTab === 'specs' && product.specs && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
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
                                        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                                        <p className="text-slate-500 italic">No reviews yet. Be the first to share your thoughts</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
