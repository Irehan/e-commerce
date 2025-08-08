"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Function to check if image exists without triggering 404 in console
const checkImageExists = async (src) => {
    try {
        const response = await fetch(src, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
};

const FashionSection = () => {
    const collections = [
        {
            id: 1,
            title: "Wed Ready",
            subtitle: "Styled for the spotlight!",
            image: "/wed-ready.webp",
            alt: "Traditional wedding attire collection",
            gradient: "from-gray-900 to-gray-700"
        },
        {
            id: 2,
            title: "Glam Game",
            subtitle: "Where sparkle meets soul",
            image: "/glam-game.webp",
            alt: "Gold jewelry and accessories collection",
            gradient: "from-amber-600 to-yellow-500"
        },
        {
            id: 3,
            title: "Slay Summer",
            subtitle: "Breezy looks, sunny vibes!",
            image: "/slay-summer.webp",
            alt: "Summer fashion collection",
            gradient: "from-green-500 to-teal-400"
        },
        {
            id: 4,
            title: "Summer Mode",
            subtitle: "Styling under the Sun!",
            image: "/summer-mode.webp",
            alt: "Casual summer wear collection",
            gradient: "from-purple-500 to-indigo-400"
        }
    ];

    // State for managing image sources
    const [imageSources, setImageSources] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            const imageChecks = await Promise.all(
                collections.map(async (collection) => {
                    // If no image provided or invalid, use placeholder
                    if (!collection.image || typeof collection.image !== 'string' || collection.image.trim() === '') {
                        return { id: collection.id, src: '/placeholder.webp' };
                    }

                    // Check if the original image exists
                    const imageExists = await checkImageExists(collection.image);

                    return {
                        id: collection.id,
                        src: imageExists ? collection.image : '/placeholder.webp'
                    };
                })
            );

            // Convert array to object for easy lookup
            const imageSourceMap = imageChecks.reduce((acc, { id, src }) => {
                acc[id] = src;
                return acc;
            }, {});

            setImageSources(imageSourceMap);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    const handleImageError = (collectionId) => {
        // Final fallback if image fails to load even after our check
        if (imageSources[collectionId] !== '/placeholder.webp') {
            setImageSources(prev => ({
                ...prev,
                [collectionId]: '/placeholder.webp'
            }));
        }
    };

    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {collections.map((collection) => (
                        <div
                            key={collection.id}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                        >
                            <div className="aspect-[3/4] relative">
                                {isLoading ? (
                                    <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                                        <div className="text-gray-400 text-sm">Loading...</div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Background Image */}
                                        <Image
                                            src={imageSources[collection.id] || '/placeholder.webp'}
                                            alt={collection.alt}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            onError={() => handleImageError(collection.id)}
                                        />
                                    </>
                                )}

                                {/* Gradient Overlay */}
                                {/* <div
                                    className={`absolute inset-0 bg-gradient-to-t ${collection.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
                                /> */}

                                {/* Content Overlay */}



                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FashionSection;