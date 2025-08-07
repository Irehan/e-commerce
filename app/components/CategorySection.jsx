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