// app/components/NewProducts.jsx
"use client";
import { useState } from 'react';

import ProductCard from './ProductCard';
import { products } from '../lib/data/products';

const getNewProductsProducts = (limit = 12) => {
    return products.filter(product => product.isBestSeller).slice(0, limit);
};

export default function NewProducts() {
    const NewProductsProducts = getNewProductsProducts(12);

    return (
        <main className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-between items-baseline mb-12 border-b pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        New Products
                    </h1>
                    <a
                        href="/products?category=all"
                        className="text-sm font-semibold text-gray-700 hover:text-black hover:underline underline-offset-4 transition-colors"
                    >
                        Shop All Products
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
                    {NewProductsProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}
