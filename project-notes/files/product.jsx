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
----------------------------------------------------------
// app/product/[id]/page.js
import { products } from '../../lib/data/products';
import ProductDetailsPage from '../../components/ProductDetailsPage';
import { notFound } from 'next/navigation';

export default async function ProductDetails(props) {
    const params = await props.params;
    const id = parseInt(params.id, 10);
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return <ProductDetailsPage product={product} />;
}


// Generate static params for better performance (optional)
export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id.toString(),
    }));
}
------------------------------------------------------------------

// lib/utils/productHelpers.js
import { products } from '../data/products';

export const getProductsByDepartment = (products, department, limit) => {
    let filteredProducts = products.filter(product => product.department === department);
    if (limit) {
        return filteredProducts.slice(0, limit);
    }
    return filteredProducts;
};

export const getFeaturedProducts = (limit = 6) => {
    return products.filter(product => product.isFeatured).slice(0, limit);
};

export const getProductsByCategory = (category, limit) => {
    if (!category) {
        return limit ? products.slice(0, limit) : products; // Return all products if no category
    }
    return products
        .filter(product => product.category === category || product.department === category)
        .slice(0, limit);
};

export const getNewArrivals = (limit = 8) => {
    return products
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
};
-------------------------------------------------------------
// lib/data/products.js
export const productSchema = {
    id: Number,                    // Unique product ID
    name: String,                  // Product name
    slug: String,                  // SEO-friendly URL part
    href: String,                  // Product page link
    imageSrc: String,              // Primary thumbnail
    images: Array,                 // Array of image URLs
    department: String,            // 'men', 'women', 'kids', 'unisex'
    category: String,              // 'shoes', 'clothing', 'accessories'
    subcategory: String,           // 'shirt', 'jeans', 'sneakers' (optional but useful)
    description: String,           // Product details
    onSale: Boolean,               // Sale flag
    price: Number,                 // Final/current price
    originalPrice: Number,         // MRP or original price
    inStock: Boolean,              // Inventory status
    rating: Number,                // Avg rating
    reviewCount: Number,           // Total reviews
    isBestSeller: Boolean,         // Popular product badge
    isFeatured: Boolean,           // For home/featured section
    createdAt: Date,               // Date added
    colors: Array, // Add colors for filtering (e.g., [{ name: "Red", color: "#FF0000", available: true }])
    sizes: Array,  // Add sizes for product details (e.g., ["S", "M", "L"])
};

const PLACEHOLDER = "/placeholder.jpg";

export const products = [
    {
        id: 1,
        name: "Nike Air Jordan 1 Mid",
        slug: "air-jordan-1-mid-shoes",
        href: "/products/air-jordan-1-mid-shoes",
        imageSrc: "/1-nike.jpg",
        images: ["/1-nike.jpg", "/1-nike-alt.jpg"],
        department: "men",
        category: "shoes",
        subcategory: "sneakers",
        description: "Classic Nike Air Jordan 1 Mid in a timeless white-on-white color scheme.",
        onSale: true,
        price: 99.99,
        originalPrice: 129.99,
        inStock: true,
        rating: 4.6,
        reviewCount: 42,
        isBestSeller: true,
        isFeatured: false,
        createdAt: new Date("2024-01-15"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 2,
        name: "Round Neck Oversized Striped Tee",
        slug: "round-neck-oversized-striped-tee",
        href: "/products/round-neck-oversized-striped-tee",
        imageSrc: "/2-striped-tee.jpg",
        images: ["/2-striped-tee.jpg", "/2-striped-tee.jpg"],
        department: "women",
        category: "clothing",
        subcategory: "t-shirt",
        description: "Oversized striped tee in soft cotton fabric. Perfect for laid-back summer vibes.",
        onSale: false,
        price: 23.00,
        originalPrice: 38.00,
        inStock: true,
        rating: 4.4,
        reviewCount: 19,
        isBestSeller: false,
        isFeatured: true,
        createdAt: new Date("2024-02-01"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 3,
        name: "Men's Classic Denim Jacket",
        slug: "mens-classic-denim-jacket",
        href: "/products/mens-classic-denim-jacket",
        imageSrc: "/3-denim-jacket.jpg",
        images: ["/3-denim-jacket.jpg", "/3-denim-jacket-back.jpg"],
        department: "men",
        category: "clothing",
        subcategory: "jackets",
        description: "Durable and stylish denim jacket for men. Timeless and versatile.",
        onSale: false,
        price: 59.99,
        originalPrice: 59.99,
        inStock: true,
        rating: 4.8,
        reviewCount: 25,
        isBestSeller: true,
        isFeatured: true,
        createdAt: new Date("2024-03-10"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 4,
        name: "Kids Graphic Hoodie",
        slug: "kids-graphic-hoodie",
        href: "/products/kids-graphic-hoodie",
        imageSrc: "/4-kids-hoodie.jpg",
        images: ["/4-kids-hoodie.jpg", "4-kids-hoodie-front.jpg"],
        department: "kids",
        category: "clothing",
        subcategory: "hoodies",
        description: "Colorful hoodie with playful graphic print. Cozy and fun for everyday wear.",
        onSale: true,
        price: 32.50,
        originalPrice: 45.00,
        inStock: true,
        rating: 4.2,
        reviewCount: 15,
        isBestSeller: false,
        isFeatured: true,
        createdAt: new Date("2024-04-12"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 5,
        name: "Unisex Chunky Sneakers",
        slug: "unisex-chunky-sneakers",
        href: "/products/unisex-chunky-sneakers",
        imageSrc: "/5-chunky-sneakers.jpg",
        images: ["/5-chunky-sneakers-front.jpg", "5-chunky-sneakers-back.jpg"],
        department: "unisex",
        category: "shoes",
        subcategory: "sneakers",
        description: "Retro chunky sneakers with bold soles. Street-style ready.",
        onSale: false,
        price: 89.00,
        originalPrice: 89.00,
        inStock: false,
        rating: 4.1,
        reviewCount: 8,
        isBestSeller: false,
        isFeatured: false,
        createdAt: new Date("2024-05-02"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 6,
        name: "Women's Relaxed Fit Jeans",
        slug: "womens-relaxed-fit-jeans",
        href: "/products/womens-relaxed-fit-jeans",
        imageSrc: "/6-jeans.jpg",
        images: ["/6-jeans-front.jpg", "/6-jeans-back.jpg"],
        department: "women",
        category: "clothing",
        subcategory: "jeans",
        description: "High-waisted relaxed fit jeans. Comfy, flattering, and wardrobe-ready.",
        onSale: false,
        price: 49.99,
        originalPrice: 65.00,
        inStock: true,
        rating: 4.5,
        reviewCount: 22,
        isBestSeller: true,
        isFeatured: false,
        createdAt: new Date("2024-05-22"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 7,
        name: "Men’s Leather Wallet",
        slug: "mens-leather-wallet",
        href: "/products/mens-leather-wallet",
        imageSrc: "/7-wallet-open.jpg",
        images: ["/7-wallet-open.jpg", "/7-wallet-closed.jpg"],
        department: "men",
        category: "accessories",
        subcategory: "wallets",
        description: "Premium brown leather wallet with multiple compartments.",
        onSale: true,
        price: 39.00,
        originalPrice: 49.00,
        inStock: true,
        rating: 4.3,
        reviewCount: 12,
        isBestSeller: false,
        isFeatured: false,
        createdAt: new Date("2024-06-01"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 8,
        name: "Women’s Elegant Watch",
        slug: "womens-elegant-watch",
        href: "/products/womens-elegant-watch",
        imageSrc: "/8-watch.jpg",
        images: ["/8-watch.jpg", "/8-watch-close.jpg"],
        department: "women",
        category: "accessories",
        subcategory: "watches",
        description: "Minimalist gold-tone wristwatch for an elegant finish.",
        onSale: false,
        price: 120.00,
        originalPrice: 149.00,
        inStock: true,
        rating: 4.7,
        reviewCount: 30,
        isBestSeller: true,
        isFeatured: true,
        createdAt: new Date("2024-06-15"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 9,
        name: "Studio Cotton Baseball Cap",
        slug: "studio-cotton-baseball-cap",
        href: "/products/studio-cotton-baseball-cap",
        imageSrc: "/9-cap.jpg",
        images: ["/9-cap.jpg", "/9-cap.jpg"],
        department: "unisex",
        category: "accessories",
        subcategory: "hats",
        description: "Classic adjustable baseball cap. Lightweight and breathable.",
        onSale: true,
        price: 19.99,
        originalPrice: 29.99,
        inStock: true,
        rating: 4.0,
        reviewCount: 10,
        isBestSeller: false,
        isFeatured: false,
        createdAt: new Date("2024-07-01"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 10,
        name: "Kids Slip-on Canvas Shoes",
        slug: "kids-slip-on-canvas-shoes",
        href: "/products/kids-slip-on-canvas-shoes",
        imageSrc: "/10-kids-shoes.jpg",
        images: ["/10-kids-shoes-side.jpg"],
        department: "kids",
        category: "shoes",
        subcategory: "canvas",
        description: "Easy slip-on shoes for kids. Durable and comfy for school days.",
        onSale: false,
        price: 26.00,
        originalPrice: 32.00,
        inStock: true,
        rating: 4.3,
        reviewCount: 14,
        isBestSeller: false,
        isFeatured: true,
        createdAt: new Date("2024-07-20"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 11,
        name: "Unisex Rain Jacket",
        slug: "unisex-rain-jacket",
        href: "/products/unisex-rain-jacket",
        imageSrc: "/11-rain-jacket.jpg",
        images: ["/11-rain-jacket-front.jpg", "/11-rain-jacket-hood.jpg"],
        department: "unisex",
        category: "clothing",
        subcategory: "jackets",
        description: "Water-resistant lightweight jacket with hood. Stay dry in style.",
        onSale: true,
        price: 54.99,
        originalPrice: 74.00,
        inStock: true,
        rating: 4.6,
        reviewCount: 18,
        isBestSeller: true,
        isFeatured: false,
        createdAt: new Date("2024-08-01"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 12,
        name: "Men's Performance Running Shoes",
        slug: "mens-performance-running-shoes",
        href: "/products/mens-performance-running-shoes",
        imageSrc: "/12-running-shoes.jpg",
        images: ["/12-running-shoes-side.jpg", "/12-running-shoes-top.jpg"],
        department: "men",
        category: "shoes",
        subcategory: "running",
        description: "Lightweight running shoes with cushioned soles for ultimate comfort.",
        onSale: false,
        price: 110.00,
        originalPrice: 110.00,
        inStock: true,
        rating: 4.9,
        reviewCount: 35,
        isBestSeller: true,
        isFeatured: true,
        createdAt: new Date("2024-08-10"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 13,
        name: "Women's Floral Midi Dress",
        slug: "womens-floral-midi-dress",
        href: "/products/womens-floral-midi-dress",
        imageSrc: "/13-midi-dress.jpg",
        images: ["/13-midi-dress-front.jpg", "/13-midi-dress-back.jpg"],
        department: "women",
        category: "clothing",
        subcategory: "dresses",
        description: "Flowy midi dress with vibrant floral print. Perfect for spring outings.",
        onSale: true,
        price: 45.99,
        originalPrice: 60.00,
        inStock: true,
        rating: 4.5,
        reviewCount: 28,
        isBestSeller: true,
        isFeatured: true,
        createdAt: new Date("2024-08-15"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],


    },
    {
        id: 14,
        name: "Kids Backpack",
        slug: "kids-backpack",
        href: "/products/kids-backpack",
        imageSrc: "/14-backpack.jpg",
        images: ["/14-backpack-front.jpg", "/14-backpack-side.jpg"],
        department: "kids",
        category: "accessories",
        subcategory: "bags",
        description: "Durable backpack with fun prints and padded straps for school.",
        onSale: false,
        price: 29.99,
        originalPrice: 29.99,
        inStock: true,
        rating: 4.4,
        reviewCount: 20,
        isBestSeller: false,
        isFeatured: false,
        createdAt: new Date("2024-08-20"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 15,
        name: "Unisex Sunglasses",
        slug: "unisex-sunglasses",
        href: "/products/unisex-sunglasses",
        imageSrc: "/15-sunglasses.jpg",
        images: ["/15-sunglasses-front.jpg"],
        department: "unisex",
        category: "accessories",
        subcategory: "sunglasses",
        description: "Polarized sunglasses with UV protection. Sleek and stylish.",
        onSale: true,
        price: 35.00,
        originalPrice: 50.00,
        inStock: true,
        rating: 4.7,
        reviewCount: 25,
        isBestSeller: true,
        isFeatured: false,
        createdAt: new Date("2024-09-01"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],


    },
    {
        id: 16,
        name: "Men's Slim Fit Chinos",
        slug: "mens-slim-fit-chinos",
        href: "/products/mens-slim-fit-chinos",
        imageSrc: "/16-chinos.jpg",
        images: ["/16-chinos-front.jpg", "/16-chinos-back.jpg"],
        department: "men",
        category: "clothing",
        subcategory: "pants",
        description: "Versatile slim fit chinos in neutral tones for work or casual.",
        onSale: false,
        price: 55.00,
        originalPrice: 55.00,
        inStock: true,
        rating: 4.3,
        reviewCount: 15,
        isBestSeller: false,
        isFeatured: true,
        createdAt: new Date("2024-09-10"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],


    },
    {
        id: 17,
        name: "Women's Crossbody Bag",
        slug: "womens-crossbody-bag",
        href: "/products/womens-crossbody-bag",
        imageSrc: "/17-crossbody-bag.jpg",
        images: ["/17-crossbody-bag-front.jpg", "/17-crossbody-bag-open.jpg"],
        department: "women",
        category: "accessories",
        subcategory: "bags",
        description: "Compact leather crossbody bag with adjustable strap.",
        onSale: true,
        price: 65.00,
        originalPrice: 85.00,
        inStock: true,
        rating: 4.6,
        reviewCount: 22,
        isBestSeller: true,
        isFeatured: false,
        createdAt: new Date("2024-09-15"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 18,
        name: "Kids Winter Jacket",
        slug: "kids-winter-jacket",
        href: "/products/kids-winter-jacket",
        imageSrc: "/18-winter-jacket.jpg",
        images: ["/18-winter-jacket-front.jpg", "/18-winter-jacket-back.jpg"],
        department: "kids",
        category: "clothing",
        subcategory: "jackets",
        description: "Insulated winter jacket with hood. Keeps kids warm and cozy.",
        onSale: false,
        price: 49.99,
        originalPrice: 49.99,
        inStock: true,
        rating: 4.5,
        reviewCount: 18,
        isBestSeller: false,
        isFeatured: true,
        createdAt: new Date("2024-09-20"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 19,
        name: "Men's Athletic Shorts",
        slug: "mens-athletic-shorts",
        href: "/products/mens-athletic-shorts",
        imageSrc: "/19-shorts.jpg",
        images: ["/19-shorts.jpg"],
        department: "men",
        category: "clothing",
        subcategory: "shorts",
        description: "Breathable athletic shorts with moisture-wicking fabric.",
        onSale: true,
        price: 29.99,
        originalPrice: 40.00,
        inStock: true,
        rating: 4.8,
        reviewCount: 30,
        isBestSeller: true,
        isFeatured: false,
        createdAt: new Date("2024-10-01"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],


    },
    {
        id: 20,
        name: "Women's Ankle Boots",
        slug: "womens-ankle-boots",
        href: "/products/womens-ankle-boots",
        imageSrc: "/20-ankle-boots.jpg",
        images: ["/20-ankle-boots-side.jpg", "/20-ankle-boots-front.jpg"],
        department: "women",
        category: "shoes",
        subcategory: "boots",
        description: "Stylish leather ankle boots with low heel. Perfect for fall.",
        onSale: false,
        price: 95.00,
        originalPrice: 95.00,
        inStock: true,
        rating: 4.4,
        reviewCount: 20,
        isBestSeller: false,
        isFeatured: true,
        createdAt: new Date("2024-10-10"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],

    },
    {
        id: 21,
        name: "Unisex Beanie",
        slug: "unisex-beanie",
        href: "/products/unisex-beanie",
        imageSrc: "/21-beanie.jpg",
        images: ["/21-beanie-front.jpg"],
        department: "unisex",
        category: "accessories",
        subcategory: "hats",
        description: "Cozy knit beanie for cold days. Available in multiple colors.",
        onSale: true,
        price: 15.99,
        originalPrice: 22.00,
        inStock: true,
        rating: 4.2,
        reviewCount: 12,
        isBestSeller: false,
        isFeatured: false,
        createdAt: new Date("2024-10-15"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],
    },
    {
        id: 22,
        name: "Men's Dress Shirt",
        slug: "mens-dress-shirt",
        href: "/products/mens-dress-shirt",
        imageSrc: "/22-dress-shirt.jpg",
        images: ["/22-dress-shirt.jpg"],
        department: "men",
        category: "clothing",
        subcategory: "shirts",
        description: "Crisp white dress shirt with tailored fit for formal occasions.",
        onSale: false,
        price: 45.00,
        originalPrice: 45.00,
        inStock: true,
        rating: 4.6,
        reviewCount: 25,
        isBestSeller: true,
        isFeatured: false,
        createdAt: new Date("2024-10-20"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],


    },
    {
        id: 23,
        name: "Women's Active Leggings",
        slug: "womens-active-leggings",
        href: "/products/womens-active-leggings",
        imageSrc: "/23-leggings.jpg",
        images: ["/23-leggings-front.jpg", "/23-leggings-side.jpg"],
        department: "women",
        category: "clothing",
        subcategory: "leggings",
        description: "High-waisted leggings with stretch for yoga or workouts.",
        onSale: true,
        price: 39.99,
        originalPrice: 55.00,
        inStock: true,
        rating: 4.9,
        reviewCount: 40,
        isBestSeller: true,
        isFeatured: true,
        createdAt: new Date("2024-11-01"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],


    },
    {
        id: 24,
        name: "Kids Sneakers",
        slug: "kids-sneakers",
        href: "/products/kids-sneakers",
        imageSrc: "/24-kids-sneakers.jpg",
        images: ["/24-kids-sneakers-side.jpg", "/24-kids-sneakers-top.jpg"],
        department: "kids",
        category: "shoes",
        subcategory: "sneakers",
        description: "Bright and lightweight sneakers for active kids.",
        onSale: false,
        price: 34.99,
        originalPrice: 34.99,
        inStock: true,
        rating: 4.3,
        reviewCount: 15,
        isBestSeller: false,
        isFeatured: false,
        createdAt: new Date("2024-11-10"),
        colors: [
            { name: "White", color: "#FFFFFF", available: true },
            { name: "Black", color: "#000000", available: true },
        ],
        sizes: ["8", "9", "10", "11"],

    },
];
