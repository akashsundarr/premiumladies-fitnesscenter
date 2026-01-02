"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = Array.from({ length: 12 }, (_, i) =>
  `/gallery/gym-image${String(i + 1).padStart(2, "0")}.webp`
);



export default function GallerySection() {
  return (
    <section className="relative py-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl mb-4">
            <span className="text-[#333333]">Designed for </span>
            <span className="text-[#FF69B4]">Your Strength</span>
          </h2>
          <p className="text-[#333333] text-xl font-space max-w-2xl mx-auto">
            Discover a clean, spacious, and motivating environment created
            exclusively for women.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt=""
                  width={524}
                  height={931}
                  loading="lazy"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 524px"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
