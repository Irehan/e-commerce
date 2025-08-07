// app\products\page.jsx
'use client';
import { useSearchParams } from 'next/navigation';
import { getProductsByCategory } from '../lib/utils/productHelpers';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'all';
    const products = getProductsByCategory(category === 'all' ? null : category);
    return (
        <div>
            <main className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-baseline mb-12 border-b pb-4">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {category.charAt(0).toUpperCase() + category.slice(1)} Products
                        </h1>
                        <a href="/products?category=all" className="text-sm font-semibold text-gray-700 hover:text-black hover:underline underline-offset-4 transition-colors">
                            Shop All Products
                        </a>
                    </div>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No {category} products available at the moment.</p>
                    )}
                </div>
            </main>
        </div>
    );
}