// app\components\Header.jsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiX, FiMenu, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/useCartStore';

const Header = () => {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const cart = useCartStore((state) => state.cart); // Place it here
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

                                <Link href="/cart" className="relative flex flex-col items-center text-gray-600 hover:text-pink-500 transition-colors duration-200 cursor-pointer">
                                    <FiShoppingBag className="h-5 w-5" />
                                    <span className="text-xs mt-1 hidden sm:block">Bag</span>
                                    {cart.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {cart.length}
                                        </span>
                                    )}
                                </Link>
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