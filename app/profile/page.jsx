'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMapPin, FiPackage, FiEdit3, FiLock, FiLogOut, FiPlus, FiChevronRight } from 'react-icons/fi';

// --- Sample Data ---
const user = {
    name: "Alexandra Chen",
    email: "alex.chen@example.com",
    joined: "January 2025",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop"
};

const addresses = [
    {
        id: 1,
        name: "Alexandra Chen",
        address: "123 Blossom Lane",
        city: "San Francisco, CA 94105",
        country: "United States",
        phone: "+1 (555) 123-4567",
        isDefault: true,
    },
    {
        id: 2,
        name: "Work Office",
        address: "456 Tech Avenue, Suite 200",
        city: "Palo Alto, CA 94301",
        country: "United States",
        phone: "+1 (555) 987-6543",
        isDefault: false,
    }
];

const orders = [
    { id: '98765', date: '2025-08-01', status: 'Delivered', total: 115.50, items: 3 },
    { id: '98766', date: '2025-08-05', status: 'Processing', total: 89.99, items: 1 },
    { id: '98767', date: '2025-08-06', status: 'Shipped', total: 299.99, items: 1 },
];

// --- Main Component ---
export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('account');

    const tabs = [
        { id: 'account', label: 'Account', icon: FiUser },
        { id: 'address', label: 'Addresses', icon: FiMapPin },
        { id: 'orders', label: 'Orders', icon: FiPackage },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.4 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <motion.div
                className="max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-10">My Account</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* --- Left Sidebar: User Card & Navigation --- */}
                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="relative w-24 h-24 mb-4">
                                    <img src={user.avatar} alt={user.name} className="rounded-full object-cover w-full h-full" />
                                    <button className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-transform hover:scale-110">
                                        <FiEdit3 className="w-4 h-4" />
                                    </button>
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
                                <p className="text-slate-500 text-sm">{user.email}</p>
                                <p className="text-xs text-slate-400 mt-2">Member since {user.joined}</p>
                            </div>

                            <nav className="space-y-2">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                                            }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </nav>

                            <div className="border-t border-slate-200 mt-6 pt-6 space-y-2">
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                                    <FiLock className="w-5 h-5" />
                                    <span>Change Password</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                                    <FiLogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- Right Content Area --- */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'account' && <AccountDetails user={user} />}
                                {activeTab === 'address' && <AddressBook addresses={addresses} />}
                                {activeTab === 'orders' && <OrderHistory orders={orders} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}


// --- Sub-components for Tabs ---

function AccountDetails({ user }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Account Information</h2>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                        <input type="text" defaultValue={user.name} className="text-slate-500 w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
                        <input type="email" defaultValue={user.email} className="text-slate-500 w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Phone Number</label>
                    <input type="tel" defaultValue={user.phone} className="text-slate-500 w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                </div>
                <div className="pt-4 flex justify-end">
                    <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg shadow-indigo-200">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

function AddressBook({ addresses }) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Address Book</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg shadow-indigo-200">
                    <FiPlus className="w-4 h-4" />
                    <span>New Address</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map(addr => (
                    <div key={addr.id} className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 relative">
                        {addr.isDefault && <span className="absolute top-4 right-4 text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">Default</span>}
                        <h3 className="font-bold text-slate-800 mb-2">{addr.name}</h3>
                        <address className="text-slate-600 not-italic text-sm space-y-1">
                            <p>{addr.address}</p>
                            <p>{addr.city}</p>
                            <p>{addr.country}</p>
                            <p className="pt-2">Phone: {addr.phone}</p>
                        </address>
                        <div className="mt-6 border-t border-slate-200 pt-4 flex items-center gap-4 text-sm">
                            <button className="font-medium text-indigo-600 hover:text-indigo-800">Edit</button>
                            <button className="font-medium text-red-600 hover:text-red-800">Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function OrderHistory({ orders }) {
    const getStatusChip = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-amber-100 text-amber-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-slate-800">Order History</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">Order ID</th>
                            <th scope="col" className="px-6 py-3 font-medium">Date</th>
                            <th scope="col" className="px-6 py-3 font-medium">Status</th>
                            <th scope="col" className="px-6 py-3 font-medium text-right">Total</th>
                            <th scope="col" className="px-6 py-3 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-indigo-600">#{order.id}</td>
                                <td className="px-6 py-4 text-slate-600">{order.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full font-medium text-xs ${getStatusChip(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-800 text-right">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-slate-500 hover:text-indigo-600 rounded-md">
                                        <FiChevronRight className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
