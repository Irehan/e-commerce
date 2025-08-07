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