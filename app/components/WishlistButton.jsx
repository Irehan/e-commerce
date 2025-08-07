'use client';
import { FiHeart, FiCheck } from 'react-icons/fi';
import { useWishlistStore } from '../store/useWishlistStore';

export default function WishlistButton({ product }) {
    const { wishlist, toggleWishlist } = useWishlistStore();
    const isWished = wishlist.some(p => p.id === product.id);

    return (
        <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-full ${isWished ? 'bg-red-500 text-white scale-110' : 'bg-white/10 hover:bg-white/20 text-white'}`}
        >
            <FiHeart className={isWished ? 'fill-current' : ''} />
        </button>
    );
}
