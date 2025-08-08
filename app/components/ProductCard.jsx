// D:\web-dev\nextjs-tut\e-commerce\app\components\ProductCard.jsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FiHeart } from "react-icons/fi"
import { toast } from "react-hot-toast"

// keep these imports as they exist in your project
import { useWishlistStore } from "../store/useWishlistStore"
import useAuthStore from "../store/useAuthStore"

const SaleBadge = () => (
    <div className="absolute top-4 left-4 bg-[#DB4444] text-white text-[11px] font-medium tracking-wide px-3 py-1 rounded-sm">
        Sale
    </div>
)

const Price = ({ product }) => (
    <div className="mt-2 text-base">
        {product.onSale ? (
            <div className="flex items-center justify-center gap-3">
                <span className="text-gray-900 font-semibold">${product.price?.toFixed(2)}</span>
                <span className="text-gray-400 line-through">${product.originalPrice?.toFixed(2)}</span>
            </div>
        ) : (
            <span className="font-semibold text-gray-900">${product.price?.toFixed(2)}</span>
        )}
    </div>
)

// small HEAD probe so we do not flash broken images
async function checkImageExists(src) {
    try {
        const res = await fetch(src, { method: "HEAD" })
        return res.ok
    } catch {
        return false
    }
}

export default function ProductCard({ product }) {
    const [imageSrc, setImageSrc] = useState("/placeholder.jpg")
    const [isLoading, setIsLoading] = useState(true)
    const [hasMounted, setHasMounted] = useState(false)

    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
    const inWishlist = isInWishlist(product.id)

    // hydration safety so SSR and client paint identical attributes
    useEffect(() => {
        setHasMounted(true)
    }, [])
    const safeInWishlist = hasMounted ? inWishlist : false

    // resolve a usable details URL
    const productDetailsUrl =
        product?.id ? `/product/${product.id}` : product?.slug ? `/product/${product.slug}` : "#"

    useEffect(() => {
        let cancelled = false
        const loadImage = async () => {
            const candidate =
                product?.imageSrc || product?.image || (Array.isArray(product?.images) ? product.images[0] : null)

            if (!candidate || typeof candidate !== "string" || candidate.trim() === "") {
                if (!cancelled) {
                    setImageSrc("/placeholder.jpg")
                    setIsLoading(false)
                }
                return
            }

            const ok = await checkImageExists(candidate)
            if (!cancelled) {
                setImageSrc(ok ? candidate : "/placeholder.jpg")
                setIsLoading(false)
            }
        }
        loadImage()
        return () => {
            cancelled = true
        }
    }, [product?.imageSrc, product?.image, product?.images])

    const handleImageError = () => {
        if (imageSrc !== "/placeholder.jpg") {
            setImageSrc("/placeholder.jpg")
        }
    }

    const handleWishlistClick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const isAuthed = useAuthStore.getState().isAuthenticated
        if (!isAuthed) {
            toast.error("Please login to add items to your wishlist")
            return
        }

        const wishlistProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            imageSrc:
                product?.imageSrc || product?.image || (Array.isArray(product?.images) ? product.images[0] : "/placeholder.jpg"),
            department: product.department,
            category: product.category,
            subcategory: product.subcategory
        }

        if (inWishlist) {
            removeFromWishlist(product.id)
            toast.success("Removed from wishlist")
        } else {
            const success = addToWishlist(wishlistProduct)
            if (success) toast.success("Added to wishlist")
        }
    }

    return (
        <div className="group relative">
            <Link href={productDetailsUrl} className="block">
                <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden cursor-pointer">
                    {isLoading ? (
                        <div className="w-full h-full rounded-lg bg-slate-200 shimmer" />
                    ) : (
                        <img
                            src={imageSrc}
                            alt={product.name}
                            onError={handleImageError}
                            className="object-contain object-center w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                    )}

                    {product.onSale && <SaleBadge />}

                    <button
                        onClick={handleWishlistClick}
                        className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 z-10 ${safeInWishlist ? "bg-red-500 text-white shadow-lg" : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                            } opacity-0 group-hover:opacity-100 hover:scale-110`}
                        aria-label={safeInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <FiHeart className={`w-5 h-5 ${safeInWishlist ? "fill-current" : ""}`} />
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <h3 className="text-base font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200">
                        {product.name}
                    </h3>
                    <Price product={product} />
                </div>
            </Link>
        </div>
    )
}
