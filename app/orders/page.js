// D:\web-dev\nextjs-tut\e-commerce\app\orders\page.js
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiChevronRight, FiCalendar, FiHash, FiDollarSign, FiFilter, FiX } from 'react-icons/fi';

// --- Sample Data (Expanded for a richer UI) ---
const ordersData = [
    {
        id: "ORD-78945",
        date: "2025-07-15",
        total: 124.99,
        status: "Delivered",
        items: [
            { name: "Wireless Earbuds", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop" },
            { name: "Phone Case", image: "https://images.unsplash.com/photo-1598335614886-9a52869692e8?w=100&h=100&fit=crop" },
            { name: "Charging Cable", image: "https://images.unsplash.com/photo-1583863750293-23a3eff23403?w=100&h=100&fit=crop" },
        ],
    },
    {
        id: "ORD-78231",
        date: "2025-06-22",
        total: 89.99,
        status: "Shipped",
        items: [
            { name: "Smart Watch", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop" },
            { name: "Extra Strap", image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=100&h=100&fit=crop" },
        ],
    },
    {
        id: "ORD-78109",
        date: "2025-05-10",
        total: 349.50,
        status: "Processing",
        items: [
            { name: "Aura-X Pro Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop" },
        ],
    },
    {
        id: "ORD-78055",
        date: "2025-04-18",
        total: 45.00,
        status: "Cancelled",
        items: [
            { name: "Portable Charger", image: "https://images.unsplash.com/photo-1588147194659-e99a43a45a9b?w=100&h=100&fit=crop" },
        ],
    }
];

// --- Helper Functions ---
const getStatusChip = (status) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800 ring-green-200';
        case 'Processing': return 'bg-amber-100 text-amber-800 ring-amber-200';
        case 'Shipped': return 'bg-blue-100 text-blue-800 ring-blue-200';
        case 'Cancelled': return 'bg-slate-100 text-slate-600 ring-slate-200';
        default: return 'bg-slate-100 text-slate-800 ring-slate-200';
    }
};

// --- Main Component ---
export default function OrdersPage() {
    const [orders, setOrders] = useState(ordersData);
    const [filter, setFilter] = useState('All');

    const filterOptions = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    const filteredOrders = orders.filter(order =>
        filter === 'All' || order.status === filter
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {/* --- Header --- */}
                    <motion.div variants={itemVariants} className="md:flex md:items-center md:justify-between mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Your Orders</h1>
                        <div className="mt-4 md:mt-0 flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                            <FiFilter className="w-5 h-5 text-slate-400 ml-2" />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="bg-transparent text-slate-700 font-medium text-sm focus:outline-none focus:ring-0 border-0"
                            >
                                {filterOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </motion.div>

                    {/* --- Orders List --- */}
                    {filteredOrders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center bg-white rounded-2xl shadow-sm p-12"
                        >
                            <FiPackage className="mx-auto w-16 h-16 text-slate-300 mb-4" />
                            <h2 className="text-2xl font-semibold text-slate-800">No Orders Found</h2>
                            <p className="mt-2 text-slate-500">
                                {filter === 'All'
                                    ? "You haven't placed any orders yet."
                                    : `You have no ${filter.toLowerCase()} orders.`
                                }
                            </p>
                            {filter !== 'All' && (
                                <button onClick={() => setFilter('All')} className="mt-6 text-sm font-semibold text-indigo-600 hover:underline">
                                    Show All Orders
                                </button>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            className="space-y-6"
                        >
                            <AnimatePresence>
                                {filteredOrders.map(order => (
                                    <motion.div key={order.id} layout variants={itemVariants}>
                                        <Link
                                            href={`/orders/${order.id}`}
                                            className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200/80"
                                        >
                                            <div className="p-5 border-b border-slate-200">
                                                <div className="flex flex-wrap items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`py-1 px-3 rounded-full font-semibold text-sm ring-1 ring-inset ${getStatusChip(order.status)}`}>
                                                            {order.status}
                                                        </div>
                                                        <div className="text-sm text-slate-500 flex items-center gap-2">
                                                            <FiCalendar className="w-4 h-4" />
                                                            <span>{order.date}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-slate-500 flex items-center gap-2">
                                                        <FiHash className="w-4 h-4" />
                                                        <span>{order.id}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-5 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex -space-x-4">
                                                        {order.items.slice(0, 3).map((item, index) => (
                                                            <img
                                                                key={index}
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-12 h-12 rounded-full object-cover bg-slate-100 ring-2 ring-white"
                                                            />
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">
                                                            {order.items.length} {order.items.length > 1 ? 'items' : 'item'}
                                                        </p>
                                                        <p className="text-sm text-slate-500 hidden sm:block">
                                                            {order.items.map(i => i.name).join(', ')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-slate-500 text-sm">Total</p>
                                                        <p className="font-bold text-lg text-slate-900">${order.total.toFixed(2)}</p>
                                                    </div>
                                                    <FiChevronRight className="w-6 h-6 text-slate-400" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}