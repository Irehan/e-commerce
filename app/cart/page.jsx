// app/cart/page.jsx
'use client';
import { useCartStore } from '../store/useCartStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
    const router = useRouter();
    // Ensure you have a 'clearCart' method in your Zustand store
    const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
    const [isClient, setIsClient] = useState(false);

    // Calculate totals derived from the cart state
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cart.length > 0 ? 5.99 : 0; // Only add shipping if cart has items
    const taxRate = 0.08;
    const taxes = subtotal * taxRate;
    const total = subtotal + shipping + taxes;

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCheckout = () => {
        // In a real app, you would process payment here.
        // On success, you would then clear the cart and redirect.
        alert('Proceeding to checkout!');
        // clearCart(); // You might call this after payment confirmation
        router.push('/checkout/success');
    };

    // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
    };

    if (!isClient) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-slate-500">Loading Cart...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Your Cart</h1>
                        <button
                            onClick={() => router.push('/products')}
                            className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            Continue Shopping
                        </button>
                    </motion.div>

                    {cart.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center bg-white rounded-2xl shadow-sm p-12"
                        >
                            <FiShoppingCart className="mx-auto w-16 h-16 text-slate-300 mb-4" />
                            <h2 className="text-2xl font-semibold text-slate-800">Your cart is empty</h2>
                            <p className="mt-2 text-slate-500">Looks like you haven't added anything to your cart yet.</p>
                            <button
                                onClick={() => router.push('/products')}
                                className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg shadow-indigo-200"
                            >
                                Start Shopping
                            </button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                            {/* Cart Items */}
                            <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
                                <ul role="list" className="divide-y divide-slate-200">
                                    <AnimatePresence>
                                        {cart.map((item) => (
                                            <motion.li
                                                key={`${item.id}-${item.size}-${item.color}`}
                                                layout
                                                variants={itemVariants}
                                                exit="exit"
                                                className="p-4 sm:p-6"
                                            >
                                                <div className="flex items-center gap-4 sm:gap-6">
                                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                                                        <Image
                                                            src={item.image || '/placeholder.jpg'}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        {/* Product Info */}
                                                        <div className="md:col-span-1">
                                                            <h3 className="font-semibold text-slate-800">{item.name}</h3>
                                                            <div className="mt-1 text-sm text-slate-500">
                                                                {item.color && <p>Color: {item.color}</p>}
                                                                {item.size && <p>Size: {item.size}</p>}
                                                            </div>
                                                            <p className="mt-2 font-medium text-indigo-600 md:hidden">${item.price.toFixed(2)}</p>
                                                        </div>
                                                        {/* Quantity Control */}
                                                        <div className="flex items-center justify-start md:justify-center">
                                                            <div className="flex items-center bg-slate-100 rounded-xl p-1">
                                                                <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} disabled={item.quantity <= 1} className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center justify-center disabled:opacity-50"><FiMinus /></button>
                                                                <span className="w-10 text-center text-base font-semibold text-slate-900">{item.quantity}</span>
                                                                <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center justify-center"><FiPlus /></button>
                                                            </div>
                                                        </div>
                                                        {/* Price and Remove */}
                                                        <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center">
                                                            <p className="font-bold text-slate-900 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                                                            <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                                                <FiTrash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </ul>
                                {cart.length > 0 && (
                                    <div className="p-4 sm:p-6 border-t border-slate-200 flex justify-end">
                                        <button onClick={clearCart} className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1.5 transition-colors">
                                            <FiTrash2 /> Clear Cart
                                        </button>
                                    </div>
                                )}
                            </motion.div>

                            {/* Order Summary */}
                            <motion.div variants={itemVariants} className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                                    <h2 className="text-xl font-semibold text-slate-900 mb-6">Order Summary</h2>
                                    <div className="space-y-4 text-slate-600">
                                        <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-slate-800">${subtotal.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span>Shipping</span><span className="font-medium text-slate-800">${shipping.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span>Taxes</span><span className="font-medium text-slate-800">${taxes.toFixed(2)}</span></div>
                                        <div className="border-t border-slate-200 pt-4 mt-4 flex justify-between text-lg font-bold text-slate-900">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full mt-8 py-3.5 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
