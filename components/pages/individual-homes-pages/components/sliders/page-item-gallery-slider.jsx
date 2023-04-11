import Image from "next/image";
import React, { useEffect, useRef } from "react";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css/core";

const PageItemGallerySlider = ({ imageList }) => {
  const slider1 = useRef();
  const slider2 = useRef();

  useEffect(() => {
    slider1.current.sync(slider2.current.splide);
  }, [slider1, slider2]);
  return (
    <>
      <Splide
        ref={(slider) => (slider1.current = slider)}
        options={{
          rewind: true,
          type: "fade",
          rewind: true,
          pagination: false,
          speed: 2000,
          interval: 6500,
          interval: 6500,
          autoplay: true,
          dragMinThreshold: 10,
          breakpoints: {
            900: {
              arrows: false,
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
          fixedWidth: 190,
          fixedHeight: 110,
          cover: true,
          focus: "center",
          arrows: false,
          snap: true,
        }}
        ref={(slider) => (slider2.current = slider)}
        className="hidden desktopSmall:block"
      >
        {imageList.map(({ url, alt }, index) => (
          <SplideSlide
            key={index}
            className="h-[110px] splide__slide splide__slide.is-active"
          >
            <div className="w-full bg-white h-full flex justify-center overflow-hidden">
              <Image
                src={url}
                alt={alt}
                width={200}
                height={200}
                className="object-cover h-full w-full cursor-pointer"
                onClick={() => slider1.current.go(index)}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};

export default PageItemGallerySlider;