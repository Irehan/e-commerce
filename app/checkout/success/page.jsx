// app/checkout/success/page.jsx
import { FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

export default function CheckoutSuccess() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="text-center max-w-md py-12">
                <FiCheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-4 text-3xl font-bold text-gray-900">Order Confirmed!</h2>
                <p className="mt-2 text-gray-600">
                    Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        href="/orders"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        View Orders
                    </Link>
                    <Link
                        href="/products"
                        className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}