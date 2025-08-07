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