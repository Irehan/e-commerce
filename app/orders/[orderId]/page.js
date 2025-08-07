'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiTruck, FiBox, FiCheckCircle, FiMoreVertical } from 'react-icons/fi';

// --- Sample Data (found via params.orderId) ---
const orderData = {
    id: "ORD-78945",
    date: "2025-07-15",
    status: "Delivered",
    subtotal: 109.97,
    shippingCost: 10.00,
    tax: 5.02,
    total: 124.99,
    items: [
        {
            id: "prod-123",
            name: "Aura-X Pro Headphones",
            price: 84.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
        },
        {
            id: "prod-456",
            name: "Premium Leather Case",
            price: 24.98,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop"
        }
    ],
    shipping: {
        name: "Alexandra Chen",
        address: "123 Blossom Lane, San Francisco, CA 94105",
        method: "Standard Shipping (3-5 days)"
    },
    payment: {
        method: "Visa",
        last4: "4242",
    },
    trackingNumber: "1Z999AA10123456789",
    timeline: [
        { status: 'Order Placed', date: '2025-07-15', completed: true },
        { status: 'Processing', date: '2025-07-15', completed: true },
        { status: 'Shipped', date: '2025-07-16', completed: true },
        { status: 'Delivered', date: '2025-07-18', completed: true },
    ]
};

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
export default function OrderDetailPage({ params }) {
    // In a real app, you would fetch orderData based on params.orderId
    const order = orderData;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
                    <motion.div variants={itemVariants} className="mb-8">
                        <Link
                            href="/orders"
                            className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors mb-4"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            Back to All Orders
                        </Link>
                        <div className="md:flex md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Order #{order.id}</h1>
                                <p className="text-slate-500 mt-1">Placed on {order.date}</p>
                            </div>
                            <div className={`mt-4 md:mt-0 py-1.5 px-4 rounded-full font-semibold text-sm ring-1 ring-inset self-start ${getStatusChip(order.status)}`}>
                                {order.status}
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                        {/* --- Left Column: Items & Timeline --- */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                            {/* Items Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80">
                                <h2 className="text-xl font-semibold text-slate-800 p-6">Items in this order</h2>
                                <ul className="divide-y divide-slate-200">
                                    {order.items.map(item => (
                                        <li key={item.id} className="p-6 flex items-center gap-6">
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-slate-800">{item.name}</h3>
                                                <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Timeline Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6">
                                <h2 className="text-xl font-semibold text-slate-800 mb-6">Order Timeline</h2>
                                <div className="space-y-6">
                                    {order.timeline.map((event, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-slate-50 ${event.completed ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                    {index === 0 && <FiBox className="w-4 h-4" />}
                                                    {index === 1 && <FiBox className="w-4 h-4" />}
                                                    {index === 2 && <FiTruck className="w-4 h-4" />}
                                                    {index === 3 && <FiCheckCircle className="w-4 h-4" />}
                                                </div>
                                                {index < order.timeline.length - 1 && (
                                                    <div className={`w-0.5 flex-1 ${event.completed ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800">{event.status}</p>
                                                <p className="text-sm text-slate-500">{event.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* --- Right Column: Summary & Details --- */}
                        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8 sticky top-8">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6">
                                <h2 className="text-xl font-semibold text-slate-800 mb-6">Order Summary</h2>
                                <div className="space-y-3 text-slate-600 text-sm">
                                    <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-slate-800">${order.subtotal.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Shipping</span><span className="font-medium text-slate-800">${order.shippingCost.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Tax</span><span className="font-medium text-slate-800">${order.tax.toFixed(2)}</span></div>
                                    <div className="border-t border-slate-200 pt-4 mt-2 flex justify-between text-base font-bold text-slate-900">
                                        <span>Total</span>
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6">
                                <h3 className="font-semibold text-slate-800 mb-4">Shipping Address</h3>
                                <address className="text-slate-600 not-italic text-sm space-y-1">
                                    <p>{order.shipping.name}</p>
                                    <p>{order.shipping.address}</p>
                                </address>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6">
                                <h3 className="font-semibold text-slate-800 mb-4">Payment Information</h3>
                                <div className="flex items-center gap-3">
                                    <img src={`/visa-logo.svg`} alt="Visa" className="h-6" />
                                    <p className="text-sm text-slate-600">Ending in {order.payment.last4}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg shadow-indigo-200">
                                    Track Package
                                </button>
                                <button className="w-full py-3 px-4 bg-white text-slate-700 font-semibold border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors">
                                    Return Items
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}