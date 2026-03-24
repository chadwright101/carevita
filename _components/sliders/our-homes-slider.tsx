"use client";

import Image from "next/image";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  cssClasses?: string;
  images: string[];
}

const OurHomesSlider = ({ cssClasses, images }: Props) => {
  return (
    <Swiper
      speed={1000}
      autoplay={{
        delay: 4000,
        disableOnInteraction: true,
      }}
      modules={[Navigation, Autoplay, EffectFade, Pagination]}
      navigation={{
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
      }}
      pagination={{
        dynamicBullets: true,
      }}
      effect="fade"
      loop
      className={classNames(
        "max-w-[1280px] aspect-[4/3] tablet:aspect-[5/3] desktop:aspect-[5.75/3]",
        cssClasses,
      )}
      style={
        {
          "--swiper-pagination-color": "#5C873C",
          "--swiper-pagination-bullet-inactive-color": "#5C873C",
          "--swiper-pagination-bullet-inactive-opacity": "0.8",
        } as React.CSSProperties
      }
    >
      {images.map((url, index) => (
        <SwiperSlide key={index} className="pb-7">
          <Image
            src={url}
            alt="Carevita - Our Homes"
            width={1400}
            height={1000}
            className="object-cover w-full h-full"
            sizes="100vw"
          />
        </SwiperSlide>
      ))}
      <div className="hidden desktop:block">
        <button
          className="swiper-prev bg-white/80 rounded-full p-1 absolute left-4 top-1/2 -translate-y-1/2 z-50 desktop:hover:scale-[102%] desktop:hover:cursor-pointer ease-in-out duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-10 h-10" color="#134266" />
        </button>
        <button
          className="swiper-next bg-white/80 rounded-full p-1 absolute right-4 top-1/2 -translate-y-1/2 z-50 desktop:hover:scale-[102%] desktop:hover:cursor-pointer ease-in-out duration-300"
          aria-label="Next image"
        >
          <ChevronRight className="w-10 h-10" color="#134266" />
        </button>
      </div>
    </Swiper>
  );
};

export default OurHomesSlider;
