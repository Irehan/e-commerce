UI
// D:\web-dev\nextjs-tut\e-commerce\app\components\ProductDetailsPage.jsx
'use client';
import React, { useState, useEffect } from 'react';
import {
    FiHeart, FiShare2, FiShoppingCart, FiStar, FiCheck,
    FiTruck, FiRefreshCw, FiShield, FiZap, FiEye, FiThumbsUp
} from 'react-icons/fi';

export default function ProductDetailsPage({ product }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isLiked, setIsLiked] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        setImageLoaded(true);
    }, []);

    const tabs = [
        { id: 'description', label: 'Description', icon: FiEye },
        { id: 'specs', label: 'Specifications', icon: FiZap },
        { id: 'reviews', label: 'Reviews', icon: FiThumbsUp }
    ];

    if (!product) return <div className="text-white p-10">Product not found.</div>;

    return (
        <div className="min-h-screen bg-white  p-4 md:p-8 text-gray-900">
            <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
                {/* Image Gallery */}
                <div className="space-y-6">
                    <div className="relative group">
                        <div className="main-products-large aspect-square rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                            <img
                                src={product.images?.[selectedImage] || '/placeholder.jpg'}
                                alt={product.name}
                                onLoad={() => setImageLoaded(true)}
                                className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'} group-hover:scale-105`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="pagination-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {product.images?.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedImage === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {product.images?.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`image-thumbnail-Pro aspect-square rounded-xl overflow-hidden transition-all duration-300 ${selectedImage === index ? 'ring-2 ring-purple-400 scale-105' : 'hover:scale-105 opacity-70 hover:opacity-100'}`}
                            >
                                <img src={img} alt={`thumb-${index}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-900 font-medium text-sm uppercase tracking-wide">{product.department}</span>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded-full ${isLiked ? 'bg-red-500 text-white scale-110' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                    <FiHeart className={isLiked ? 'fill-current' : ''} />
                                </button>
                                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                                    <FiShare2 />
                                </button>
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold">{product.name}</h1>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                                    />
                                ))}
                                <span className="ml-2 font-medium">{product.rating}</span>
                            </div>
                            <span className="text-gray-400">({product.reviewCount || 0} reviews)</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                            {product.onSale && (
                                <>
                                    <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                                        Save ${Math.round(product.originalPrice - product.price)}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Colors */}
                    {product.colors?.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Color</h3>
                            <div className="flex items-center space-x-3">
                                {product.colors.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => color.available && setSelectedColor(index)}
                                        disabled={!color.available}
                                        className={`relative w-12 h-12 rounded-full border-2 ${selectedColor === index ? 'border-purple-400 scale-110' : 'border-gray-600 hover:border-gray-400'} ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        style={{ backgroundColor: color.color }}
                                    >
                                        {selectedColor === index && <FiCheck className="absolute inset-0 m-auto text-white w-6 h-6" />}
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-gray-400">Selected: {product.colors[selectedColor]?.name}</p>
                        </div>
                    )}

                    {/* Sizes */}
                    {product.sizes?.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Size</h3>
                            <div className="flex items-center space-x-3">
                                {product.sizes.map((size, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedSize(index)}
                                        className={`px-6 py-3 rounded-xl border ${selectedSize === index ? 'border-purple-400 bg-purple-400/20 text-gray-700' : 'border-gray-600 text-gray-500 hover:border-gray-400'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity & Cart */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <span className="text-lg font-semibold">Quantity</span>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full bg-black/10 text-black">-</button>
                                <span className="w-12 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full bg-black/10 text-black">+</button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                                <FiShoppingCart /> Add to Cart
                            </button>
                            <button className="sm:w-auto px-8 py-4 border-2 border-white/20 text-white rounded-2xl font-semibold hover:bg-white/10 hover:scale-105">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Features */}
                    {product.features?.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Key Features</h3>
                            <div className="grid grid-cols-1 gap-2 text-gray-300">
                                {product.features.map((feat, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <FiCheck className="text-green-400" /> <span>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Shipping Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[{ icon: FiTruck, label: 'Free Shipping', desc: '2-3 business days' },
                        { icon: FiRefreshCw, label: '30-Day Returns', desc: 'Free returns' },
                        { icon: FiShield, label: '2-Year Warranty', desc: 'Full coverage' }].map((info, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                                <info.icon className="text-purple-400 w-6 h-6" />
                                <div>
                                    <p className="font-medium">{info.label}</p>
                                    <p className="text-sm text-gray-400">{info.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-16 space-y-8 max-w-7xl mx-auto ">
                <div className="flex gap-2 bg-gray-300 p-2 border border-gray/10 rounded-2xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl ${activeTab === tab.id ? 'bg-white/10 text-gray-900' : 'text-gray-700'}`}
                        >
                            <tab.icon className="w-5 h-5" /> <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="bg-gray-300 p-8 border border-gray/10 rounded-2xl">
                    {activeTab === 'description' && (
                        <p className="text-gray-900 leading-relaxed">{product.description}</p>
                    )}
                    {activeTab === 'specs' && product.specs && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(product.specs).map(([key, val]) => (
                                <div key={key} className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-gray-900">{key}</span>
                                    <span>{val}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <p className="text-gray-900 italic">Customer reviews coming soon...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
------------------------------------------------------------------------------------------------------------

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
--------------------------------------------------------------------
    // app/components/NewProducts.jsx
    "use client";
import { useState } from 'react';

import ProductCard from './ProductCard';
import { products } from '../lib/data/products';

const getNewProductsProducts = (limit = 12) => {
    return products.filter(product => product.isBestSeller).slice(0, limit);
};

export default function NewProducts() {
    const NewProductsProducts = getNewProductsProducts(12);

    return (
        <main className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-between items-baseline mb-12 border-b pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        New Products
                    </h1>
                    <a
                        href="/products?category=all"
                        className="text-sm font-semibold text-gray-700 hover:text-black hover:underline underline-offset-4 transition-colors"
                    >
                        Shop All Products
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
                    {NewProductsProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}
---------------------------------------------------------------
    // D:\web-dev\nextjs-tut\e-commerce\app\components\CategorySection.jsx
    'use client';
import React, { useState, useEffect } from 'react';
import { FiUser, FiUsers, FiHeart, FiStar, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import Link from 'next/link';

const CategorySection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const categories = [
        {
            name: "Men",
            icon: FiUser,
            gradient: "from-blue-500 to-cyan-500",
            hoverGradient: "from-blue-400 to-cyan-400",
            bgPattern: "from-blue-500/10 to-cyan-500/10",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            stats: "2.5K+ Items",
            trend: "+12%"
        },
        {
            name: "Women",
            icon: FiUsers,
            gradient: "from-pink-500 to-rose-500",
            hoverGradient: "from-pink-400 to-rose-400",
            bgPattern: "from-pink-500/10 to-rose-500/10",
            image: "https://images.unsplash.com/photo-1583167461820-d79d51f89d7a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            stats: "3.2K+ Items",
            trend: "+18%"
        },
        {
            name: "Kids",
            icon: FiHeart,
            gradient: "from-purple-500 to-indigo-500",
            hoverGradient: "from-purple-400 to-indigo-400",
            bgPattern: "from-purple-500/10 to-indigo-500/10",
            image: "https://images.unsplash.com/flagged/photo-1555895312-bbc472c964f3?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            stats: "1.8K+ Items",
            trend: "+25%"
        },
        {
            name: "Beauty",
            icon: FiStar,
            gradient: "from-emerald-500 to-teal-500",
            hoverGradient: "from-emerald-400 to-teal-400",
            bgPattern: "from-emerald-500/10 to-teal-500/10",
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            stats: "950+ Items",
            trend: "+32%"
        }
    ];

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const slugify = (text) =>
        text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    return (
        <section className="relative py-24 px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.1),transparent_50%)]"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-6">
                        <FiTrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Trending Categories</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent leading-tight">
                        Shop by Category
                    </h2>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Discover curated collections tailored to your lifestyle and preferences
                    </p>

                    {/* Decorative Line */}
                    <div className="mt-8 flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        const isHovered = hoveredIndex === index;
                        return (
                            <Link href={`/products?category=${encodeURIComponent(category.name.toLowerCase())}`}
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="group relative cursor-pointer"
                            >
                                {/* Main Card */}
                                <div className={`
                  relative p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl 
                  transform transition-all duration-500 ease-out
                  ${isHovered ? 'scale-105 -translate-y-2' : ''}
                  border border-gray-100 hover:border-transparent
                  overflow-hidden
                `}>
                                    {/* Animated Background */}
                                    <div className={`
                    absolute inset-0 bg-gradient-to-br ${category.bgPattern} 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  `}></div>

                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon Container */}
                                        <div className="relative mb-6">
                                            <div className={`
                        w-16 h-16 rounded-2xl bg-gradient-to-r ${category.gradient}
                        flex items-center justify-center shadow-lg
                        transform transition-all duration-300
                        ${isHovered ? `shadow-2xl ${category.gradient.includes('blue') ? 'shadow-blue-500/25' :
                                                    category.gradient.includes('pink') ? 'shadow-pink-500/25' :
                                                        category.gradient.includes('purple') ? 'shadow-purple-500/25' :
                                                            'shadow-emerald-500/25'}` : ''}
                      `}>
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>

                                            {/* Pulsing Ring */}
                                            <div className={`
                        absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${category.gradient}
                        opacity-0 group-hover:opacity-20 animate-ping
                      `}></div>
                                        </div>

                                        {/* Image */}
                                        <div className="relative mb-6 flex justify-center">
                                            <div className="relative">
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                                                />
                                                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </div>

                                        {/* Category Name */}
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                                            {category.name}
                                        </h3>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm text-gray-500 font-medium">{category.stats}</span>
                                            <div className="flex items-center gap-1">
                                                <FiTrendingUp className="w-3 h-3 text-green-500" />
                                                <span className="text-xs text-green-600 font-semibold">{category.trend}</span>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <div className={`
                      flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                      bg-gradient-to-r ${category.gradient} text-white font-semibold
                      transform transition-all duration-300 opacity-0 translate-y-2
                      group-hover:opacity-100 group-hover:translate-y-0
                      hover:shadow-lg cursor-pointer
                    `}>
                                            <span className="text-sm">Explore</span>
                                            <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>

                                    {/* Corner Accents */}
                                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gray-200 group-hover:border-white/50 transition-colors duration-300"></div>
                                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gray-200 group-hover:border-white/50 transition-colors duration-300"></div>
                                </div>

                                {/* Glow Effect */}
                                <div className={`
                  absolute inset-0 rounded-3xl bg-gradient-to-r ${category.gradient}
                  opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500
                  -z-10 scale-110
                `}></div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer group">
                        <span className="text-gray-700 font-semibold">View All Categories</span>
                        <FiArrowRight className="w-5 h-5 text-gray-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>

            {/* Mouse Follower */}
            {hoveredIndex !== null && (
                <div
                    className="fixed pointer-events-none z-50 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-50 transition-opacity duration-300"
                    style={{
                        left: mousePosition.x - 8,
                        top: mousePosition.y - 8,
                        transform: 'translate3d(0,0,0)'
                    }}
                />
            )}
        </section>
    );
};

export default CategorySection;
-----------------------------------------------------------------------------------------
    // app/components/BestSelling.jsx
    "use client";
import { useState } from 'react';

import ProductCard from './ProductCard';
import { products } from '../lib/data/products';

const getBestSellingProducts = (limit = 12) => {
    return products.filter(product => product.isBestSeller).slice(0, limit);
};

export default function BestSelling() {
    const bestSellingProducts = getBestSellingProducts(12);

    return (
        <main className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-between items-baseline mb-12 border-b pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Best Selling Products
                    </h1>
                    <a
                        href="/products?category=all"
                        className="text-sm font-semibold text-gray-700 hover:text-black hover:underline underline-offset-4 transition-colors"
                    >
                        Shop All Products
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
                    {bestSellingProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}
