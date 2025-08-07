'use client';
import React, { useState, useEffect } from 'react';
import { FiMail, FiArrowRight, FiCheck, FiStar } from 'react-icons/fi';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate floating particles
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
        }));
        setParticles(newParticles);

        // Animate particles
        const interval = setInterval(() => {
            setParticles(prev => prev.map(particle => ({
                ...particle,
                y: particle.y <= -10 ? 110 : particle.y - particle.speed * 0.1,
                x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.1,
            })));
        }, 50);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => {
                setIsSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <section className="py-6 relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            </div>

            {/* Floating Particles */}
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        opacity: particle.opacity,
                        boxShadow: `0 0 ${particle.size * 2}px rgba(255,255,255,0.5)`,
                    }}
                />
            ))}

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }}></div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Glowing Orb */}
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

                {/* Icon Container */}
                <div className="relative mb-0 mt-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 mb-6 shadow-2xl shadow-purple-500/25">
                        <FiMail className="w-10 h-10 text-white animate-bounce" />
                    </div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 animate-ping opacity-20"></div>
                </div>

                {/* Title with Gradient Text */}
                <h2 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                    Join the Future
                </h2>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light tracking-wide">
                    Be the first to experience tomorrow's innovations
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {['Exclusive Access', 'Early Bird Offers', 'VIP Community'].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <FiStar className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium text-white">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Form Container */}
                <div className="relative">
                    {/* Glassmorphism Container */}
                    <div className="relative max-w-lg mx-auto p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20">
                        {/* Success State */}
                        {isSubscribed && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-500/30 z-20">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4 shadow-lg shadow-green-500/25">
                                        <FiCheck className="w-8 h-8 text-white animate-bounce" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h3>
                                    <p className="text-green-200">You're now part of the future</p>
                                </div>
                            </div>
                        )}

                        {/* Input Container */}
                        <div className="relative">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Email Input */}
                                <div className="relative flex-1">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-medium"
                                        required
                                    />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="relative group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold rounded-2xl shadow-2xl shadow-purple-500/25 hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 min-w-[140px]"
                                    disabled={isSubscribed}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Subscribe
                                        <FiArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                                    </span>

                                    {/* Button Glow Effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Privacy Text */}
                        <p className="text-xs text-gray-400 mt-4 text-center">
                            No spam, unsubscribe anytime. Your privacy is our priority.
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500 opacity-50"></div>
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-purple-500 opacity-50"></div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-16 flex justify-center items-center gap-8 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>25K+ Subscribers</span>
                    </div>
                    <div className="w-px h-4 bg-gray-600"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                        <span>99.9% Uptime</span>
                    </div>
                    <div className="w-px h-4 bg-gray-600"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span>Weekly Updates</span>
                    </div>
                </div>
            </div>

            {/* Additional Glow Effects */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        </section>
    );
};

export default NewsletterSection;