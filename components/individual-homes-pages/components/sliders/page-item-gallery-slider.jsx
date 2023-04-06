import Image from "next/image";
import React, { useEffect, useRef } from "react";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

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
          drag: false,
          interval: 6500,
          autoplay: true,
        }}
        hasTrack={false}
      >
        <SplideTrack>
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
          <div className="splide__arrows splide__arrows--ltr">
            <button type="button" className="splide__arrow splide__arrow--next">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                width="40"
                height="40"
                focusable="false"
              >
                <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
              </svg>
            </button>
            <button type="button" className="splide__arrow splide__arrow--prev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                width="40"
                height="40"
                focusable="false"
              >
                <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
              </svg>
            </button>
          </div>
        </SplideTrack>
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
          arrows: false,
          snap: true,
        }}
        ref={(slider) => (slider2.current = slider)}
        className="hidden desktopSmall:block"
      >
        {imageList.map(({ url, alt }, index) => (
          <SplideSlide
            key={index}
            className="h-[90px] splide__slide splide__slide.is-active"
          >
            <div className="w-full bg-white h-full flex justify-center overflow-hidden">
              <Image
                src={url}
                alt={alt}
                width={200}
                height={200}
                className="object-cover h-full w-full"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};

export default PageItemGallerySlider;
