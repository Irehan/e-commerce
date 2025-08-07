'use client';
import React, { useState, useEffect } from 'react';
import {
    FaTwitter,
    FaLinkedin,
    FaGithub,
    FaInstagram,
    FaYoutube,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaArrowUp,
    FaHeart
} from 'react-icons/fa';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentYear] = useState(new Date().getFullYear());

    // Show scroll to top button when scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const socialLinks = [
        { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
        { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
        { icon: FaGithub, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
        { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
        { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:text-red-500' }
    ];

    const quickLinks = [
        { name: 'About Us', href: '#' },
        { name: 'Services', href: '#' },
        { name: 'Products', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Careers', href: '#' }
    ];

    const supportLinks = [
        { name: 'Help Center', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'FAQ', href: '#' }
    ];

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20 -z-10">
                <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>
            <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm -z-10"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Main footer content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-12">
                    {/* Company Info */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="mb-4 lg:mb-6">
                            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                YourBrand
                            </h3>
                            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mt-2"></div>
                        </div>
                        <p className="text-gray-300 mb-4 lg:mb-6 leading-relaxed text-sm sm:text-base">
                            Innovating the future with cutting-edge technology and exceptional user experiences.
                            Building tomorrow's solutions today.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm sm:text-base">
                                <FaEnvelope className="text-cyan-400 flex-shrink-0" />
                                <span className="break-all">contact@yourbrand.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm sm:text-base">
                                <FaPhone className="text-cyan-400 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm sm:text-base">
                                <FaMapMarkerAlt className="text-cyan-400 flex-shrink-0" />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="sm:col-span-1">
                        <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:translate-x-2 inline-block text-sm sm:text-base"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="sm:col-span-1">
                        <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Support</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:translate-x-2 inline-block text-sm sm:text-base"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Stay Connected</h4>
                        <p className="text-gray-300 mb-4 text-sm sm:text-base">
                            Subscribe to our newsletter for the latest updates and insights.
                        </p>
                        <div className="space-y-4">
                            {/* Newsletter Form - Fixed responsive layout */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm border border-white border-opacity-20 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base min-w-0"
                                />
                                <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base font-medium whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>

                            {/* Social Links */}
                            <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                                {socialLinks.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            aria-label={social.label}
                                            className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-125 hover:-translate-y-1`}
                                        >
                                            <IconComponent size={20} className="sm:w-6 sm:h-6" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white via-opacity-20 to-transparent mb-6 sm:mb-8"></div>

                {/* Bottom section */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm sm:text-base">
                    <div className="flex flex-wrap items-center justify-center md:justify-start space-x-2 text-gray-300">
                        <span>© {currentYear} YourBrand. Made with</span>
                        <FaHeart className="text-red-500 animate-pulse" />
                        <span>in San Francisco</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center space-x-3 sm:space-x-6 text-xs sm:text-sm text-gray-300">
                        <a href="#" className="hover:text-cyan-400 transition-colors duration-300 whitespace-nowrap">Privacy Policy</a>
                        <span className="text-gray-600 hidden sm:inline">|</span>
                        <a href="#" className="hover:text-cyan-400 transition-colors duration-300 whitespace-nowrap">Terms of Service</a>
                        <span className="text-gray-600 hidden sm:inline">|</span>
                        <a href="#" className="hover:text-cyan-400 transition-colors duration-300 whitespace-nowrap">Cookie Policy</a>
                    </div>
                </div>
            </div>

            {/* Scroll to top button */}
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 p-3 sm:p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 z-50"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            )}

            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse"></div>
        </footer>
    );
};

export default Footer;