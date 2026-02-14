"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classNames from "classnames";

interface Props {
  imageList: Array<string>;
  homeName?: string;
  variant?: "hero" | "gallery";
  blogSize?: boolean;
}

const GeneralSlider = ({
  imageList,
  homeName,
  variant = "hero",
  blogSize = false,
}: Props) => {
  const isHero = variant === "hero";

  return (
    <Swiper
      speed={1000}
      autoplay={{
        delay: isHero ? 6000 : 5000,
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
      style={
        {
          "--swiper-pagination-color": "#5C873C",
          "--swiper-pagination-bullet-inactive-color": "#5C873C",
          "--swiper-pagination-bullet-inactive-opacity": "0.8",
        } as React.CSSProperties
      }
    >
      {imageList.map((url, index) => (
        <SwiperSlide
          key={index}
          className={classNames("aspect-square min-[600px]:aspect-[5/3] pb-7", {
            "desktop:aspect-video": !blogSize,
            "desktop:aspect-square": blogSize,
          })}
        >
          <Image
            src={url}
            alt={`${homeName} - Image ${index + 1}`}
            width={1400}
            height={1000}
            className="object-cover h-full w-full"
            priority={index < 2}
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

export default GeneralSlider;
