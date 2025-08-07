'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from '../Banner/Banner.module.css';
import { Navigation } from 'swiper/modules';

export default function Banner() {
    const banners = ['/banner-1.jpeg', '/banner-2.jpg', '/banner-3.jpg'];

    return (
        <div className={styles.bannerSec}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Swiper
                    navigation
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop
                    className="mySwiper"
                >
                    {banners.map((src, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={src}
                                    alt={`banner-${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
