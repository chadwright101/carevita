import Image from "next/image";
import { useRef } from "react";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";

interface Props {
  imageList: Array<{ url: string; alt: string }>;
}

const PageItemGallerySlider = ({ imageList }: Props) => {
  const mainRef = useRef<Splide>(null);

  const handleThumbs = (id: number) => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
  };
  return (
    <>
      <Splide
        ref={mainRef}
        options={{
          rewind: true,
          type: "fade",
          pagination: false,
          autoplay: true,
          speed: 2000,
          interval: 6500,
          drag: false,
          arrows: false,
          pauseOnFocus: true,
          breakpoints: {
            1100: {
              arrows: true,
            },
          },
        }}
      >
        {imageList.map(({ url, alt }, index) => (
          <SplideSlide
            key={index}
            className="h-[250px] phone:h-[325px] tablet:h-[450px] tabletLarge:h-[525px] desktop:h-[600px]"
          >
            <Image
              src={url}
              alt={alt}
              width={1400}
              height={1000}
              className="object-cover h-full w-full"
            />
          </SplideSlide>
        ))}
      </Splide>
      <Splide
        options={{
          type: "slide",
          rewind: true,
          pagination: false,
          fixedWidth: 200,
          fixedHeight: 90,
          cover: true,
          focus: "center",
          snap: true,
          arrows: true,
        }}
        className="hidden desktopSmall:block"
      >
        {imageList.map(({ url, alt }, index) => (
          <SplideSlide key={index} className="h-[90px]">
            <div className="w-full bg-white h-full flex justify-center :opacity-10">
              <Image
                src={url}
                alt={alt}
                width={200}
                height={200}
                className="object-cover h-full w-full hover:opacity-95 cursor-pointer hover:scale-105 transition-all"
                onClick={() => handleThumbs(index)}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};

export default PageItemGallerySlider;
