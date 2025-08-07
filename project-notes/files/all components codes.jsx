// all components codes
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
// app\components\Header.jsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiX, FiMenu, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Header = () => {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    const navLinks = [
        { name: "MEN", href: "/products?category=men" },
        { name: "WOMEN", href: "/products?category=women" },
        { name: "KIDS", href: "/products?category=kids" },
        { name: "BEAUTY", href: "/products?category=beauty" },
        { name: "STUDIO", href: "/products?category=studio" },
    ];

    // Function to check authentication status
    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/users/me', {
                credentials: 'include',
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);

                // ✅ Sync to localStorage if valid
                localStorage.setItem('auth_user', JSON.stringify(userData));
            } else {
                // ❌ If server rejects token, logout client too
                setUser(null);
                localStorage.removeItem('auth_user');
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
            localStorage.removeItem('auth_user');
        } finally {
            setLoading(false);
        }
    };

    // Initial auth check
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Listen for auth state changes
    useEffect(() => {
        const handleAuthChange = (event) => {
            if (event.detail.type === 'login') {
                setUser(event.detail.user);
                setLoading(false);
            } else if (event.detail.type === 'logout') {
                setUser(null);
                setLoading(false);
            }
        };

        // Listen for custom auth events
        window.addEventListener('authStateChange', handleAuthChange);

        // Listen for storage events (for cross-tab synchronization)
        const handleStorageChange = (e) => {
            if (e.key === 'auth_change') {
                checkAuthStatus();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('authStateChange', handleAuthChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Handle logout
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/users/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setUser(null);
                setProfileDropdownOpen(false);

                // Dispatch custom event for auth state change
                window.dispatchEvent(new CustomEvent('authStateChange', {
                    detail: { type: 'logout' }
                }));

                // Update localStorage for cross-tab sync
                localStorage.setItem('auth_change', Date.now().toString());

                toast.success('Logged out successfully!');
                router.push('/');
                closeMobileMenu();
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close mobile menu
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Handle backdrop click for menu
    const handleMenuBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeMobileMenu();
        }
    };

    // Handle menu item click
    const handleMenuItemClick = () => {
        closeMobileMenu();
    };

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="logo-and-nav flex items-center">
                            {/* Logo Section */}
                            <div className="flex items-center mr-4">
                                <Link href="/">
                                    <div className="flex-shrink-0 cursor-pointer">
                                        <div className="w-8 h-8 rounded-md overflow-hidden relative">
                                            <Image
                                                src="/logo.png"
                                                alt="Logo"
                                                fill
                                                className="object-cover"
                                                sizes="32px"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Navigation Menu - Desktop */}
                            <nav className="hidden md:flex space-x-8 justify-start ml-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-gray-900 hover:text-pink-500 sm:px-0.5 sm:py-0.5 text-sm font-medium transition-colors duration-200 mr-1.5 md:px-2 md:py-2"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Search and Icons Section */}
                        <div className="flex items-center space-x-4">
                            {/* Search Bar - Desktop */}
                            <div className="hidden lg:block">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiSearch className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search for products, brands and more"
                                        className="block w-80 pl-10 pr-3 py-2 border text-pink-500 border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Icons - Desktop */}
                            <div className="hidden md:flex items-center space-x-6">
                                {/* Search Icon for tablet */}
                                <button
                                    className="lg:hidden text-gray-600 hover:text-pink-500 transition-colors duration-200"
                                    aria-label="Search"
                                >
                                    <FiSearch className="h-5 w-5" />
                                </button>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onMouseEnter={() => setProfileDropdownOpen(true)}
                                        onMouseLeave={() => setProfileDropdownOpen(false)}
                                        className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition-colors duration-200 cursor-pointer"
                                        aria-label="Profile Menu"
                                    >
                                        <FiUser className="h-5 w-5" />
                                        <span className="text-xs mt-1 hidden sm:block">Profile</span>
                                    </button>

                                    <div
                                        onMouseEnter={() => setProfileDropdownOpen(true)}
                                        onMouseLeave={() => setProfileDropdownOpen(false)}
                                        className={`absolute left-1/2 -translate-x-1/2 top-full w-60 bg-white border border-gray-200 shadow-lg rounded-md z-50 transition-all duration-200 ${profileDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                                    >
                                        {loading ? (
                                            <div className="p-4">
                                                <p className="text-sm text-gray-500">Loading...</p>
                                            </div>
                                        ) : user ? (
                                            // User is logged in
                                            <>
                                                <div className="p-4 border-b">
                                                    <p className="text-sm font-semibold text-gray-800">Welcome Back!</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                                <div className="p-2 text-sm space-y-2">
                                                    <Link href="/profile" className="block text-gray-500 hover:text-pink-500 cursor-pointer py-1">
                                                        My Profile
                                                    </Link>
                                                    <Link href="/orders" className="block text-gray-500 hover:text-pink-500 cursor-pointer py-1">
                                                        Orders
                                                    </Link>
                                                    <Link href="/wishlist" className="block text-gray-500 hover:text-pink-500 cursor-pointer py-1">
                                                        Wishlist
                                                    </Link>
                                                    <Link href="/contact" className="block text-gray-500 hover:text-pink-500 cursor-pointer py-1">
                                                        Contact Us
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="block w-full text-left text-red-600 hover:text-red-700 cursor-pointer py-1 font-medium"
                                                    >
                                                        <div className="flex items-center">
                                                            <FiLogOut className="h-4 w-4 mr-2" />
                                                            Log Out
                                                        </div>
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            // User is not logged in
                                            <>
                                                <div className="p-4 border-b">
                                                    <p className="text-sm font-semibold text-gray-800">Welcome</p>
                                                    <p className="text-xs text-gray-500">To access account and manage orders</p>
                                                    <Link
                                                        href="/login"
                                                        className="mt-2 text-pink-600 border border-pink-500 text-xs font-semibold px-3 py-1 rounded hover:bg-pink-50 transition cursor-pointer inline-block text-center"
                                                        aria-label="Login or Signup"
                                                    >
                                                        LOGIN / SIGNUP
                                                    </Link>
                                                </div>
                                                <div className="p-2 text-sm space-y-2">
                                                    <a href="#" className="block text-gray-500 hover:text-pink-500 cursor-pointer">Orders</a>
                                                    <a href="#" className="block text-gray-500 hover:text-pink-500 cursor-pointer">Wishlist</a>
                                                    <a href="#" className="block text-gray-500 hover:text-pink-500 cursor-pointer">Contact Us</a>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <button
                                    className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition-colors duration-200 cursor-pointer"
                                    aria-label="Wishlist"
                                >
                                    <FiHeart className="h-5 w-5" />
                                    <span className="text-xs mt-1 hidden sm:block">Wishlist</span>
                                </button>

                                <button
                                    className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition-colors duration-200 cursor-pointer"
                                    aria-label="Shopping Bag"
                                >
                                    <FiShoppingBag className="h-5 w-5" />
                                    <span className="text-xs mt-1 hidden sm:block">Bag</span>
                                </button>
                            </div>

                            {/* Mobile Icons */}
                            <div className="flex md:hidden items-center space-x-3">
                                <button
                                    className="text-gray-600 hover:text-pink-600 transition-all duration-300 p-2 hover:bg-pink-50 rounded-full"
                                    aria-label="Search"
                                >
                                    <FiSearch className="h-5 w-5" />
                                </button>

                                <button
                                    type="button"
                                    onClick={toggleMobileMenu}
                                    className="text-gray-600 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 p-2 hover:bg-pink-50 rounded-full transition-all duration-300"
                                    aria-label="Toggle Mobile Menu"
                                    aria-expanded={isMobileMenuOpen}
                                >
                                    <FiMenu className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={handleMenuBackdropClick}
                    aria-hidden="true"
                />
            )}

            <div
                ref={mobileMenuRef}
                className={`mobile-container fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-all duration-300 ease-out z-50 md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50 flex-shrink-0">
                    <h2 id="mobile-menu-title" className="text-lg font-bold text-gray-900">Menu</h2>
                    <button
                        onClick={closeMobileMenu}
                        className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full p-2 hover:bg-white/80 transition-all duration-300"
                        aria-label="Close Mobile Menu"
                    >
                        <FiX className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <nav className="px-4 py-6">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={handleMenuItemClick}
                                className="block text-gray-800 hover:text-pink-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 px-1 py-1 text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105 mb-2"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/studio"
                            onClick={handleMenuItemClick}
                            className="block text-gray-800 hover:text-pink-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 px-1 py-1 text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105 mb-2"
                        >
                            <div className="flex items-center justify-between">
                                <span>STUDIO</span>
                                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                                    NEW
                                </span>
                            </div>
                        </Link>
                    </nav>

                    <div className="border-t border-gray-200 bg-gray-50/50">
                        <div className="px-4 py-6">
                            <div className="mb-6">
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                    {loading ? (
                                        <p className="text-sm text-gray-500">Loading...</p>
                                    ) : user ? (
                                        // User is logged in - Mobile
                                        <>
                                            <p className="text-sm font-semibold text-gray-800 mb-1">Welcome Back!</p>
                                            <p className="text-xs text-gray-500 mb-4">{user.email}</p>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-4 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                                            >
                                                <FiLogOut className="h-4 w-4 mr-2" />
                                                LOG OUT
                                            </button>
                                        </>
                                    ) : (
                                        // User is not logged in - Mobile
                                        <>
                                            <p className="text-sm font-semibold text-gray-800 mb-1">Welcome Back!</p>
                                            <p className="text-xs text-gray-500 mb-4">Access your account and manage orders</p>
                                            <Link
                                                href="/login"
                                                onClick={handleMenuItemClick}
                                                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold px-4 py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-center"
                                            >
                                                LOGIN / SIGNUP
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2 pb-4">
                                <Link
                                    href="/profile"
                                    onClick={handleMenuItemClick}
                                    className="flex items-center text-gray-700 hover:text-pink-600 hover:bg-white px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <FiUser className="h-4 w-4 text-pink-600" />
                                    </div>
                                    <span className="text-sm font-medium">My Profile</span>
                                </Link>
                                <Link
                                    href="/wishlist"
                                    onClick={handleMenuItemClick}
                                    className="flex items-center text-gray-700 hover:text-pink-600 hover:bg-white px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 relative"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <FiHeart className="h-4 w-4 text-pink-600" />
                                    </div>
                                    <span className="text-sm font-medium">Wishlist</span>
                                    <span className="ml-auto bg-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">3</span>
                                </Link>
                                <Link
                                    href="/orders"
                                    onClick={handleMenuItemClick}
                                    className="flex items-center text-gray-700 hover:text-pink-600 hover:bg-white px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 relative"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <FiShoppingBag className="h-4 w-4 text-pink-600" />
                                    </div>
                                    <span className="text-sm font-medium">My Orders</span>
                                    <span className="ml-auto bg-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">2</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
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