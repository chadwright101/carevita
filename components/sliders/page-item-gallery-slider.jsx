import React, { useEffect, useRef } from "react";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css/core";
import ImageContainer from "@/components/utils/image-container";

const PageItemGallerySlider = ({ imageList, homeName }) => {
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
          type: "fade",
          rewind: true,
          pagination: false,
          speed: 2000,
          interval: 5500,
          autoplay: true,
          dragMinThreshold: { mouse: 50, touch: 150 },
          breakpoints: {
            900: {
              arrows: false,
            },
          },
        }}
      >
        {imageList.map((url, index) => (
          <SplideSlide
            key={index}
            className="h-[250px] phone:h-[325px] tablet:h-[450px] tabletLarge:h-[525px] desktop:h-[700px]"
          >
            <ImageContainer
              src={url}
              alt={`${homeName} gallery item - Image ${index + 1}`}
              width={1400}
              height={1000}
              cssClasses="object-cover h-full w-full"
              phone={80}
              desktop={100}
              onClick={() => slider1.current.go(index)}
              eager={index < 2 ? true : false}
            />
          </SplideSlide>
        ))}
      </Splide>
      <Splide
        options={{
          type: "slide",
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
        {imageList.map((url, index) => (
          <SplideSlide
            key={index}
            className="h-[110px] splide__slide splide__slide.is-active"
          >
            <div className="w-full bg-white h-full flex justify-center overflow-hidden">
              <ImageContainer
                src={url}
                alt={`${homeName} gallery thumbnail - Image ${index + 1}`}
                width={200}
                height={200}
                cssClasses="object-cover h-full w-full cursor-pointer px-1 pt-2"
                quality={30}
                desktop={7.5}
                onClick={() => slider1.current.go(index)}
                loading={index < 1 ? "eager" : "lazy"}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};

export default PageItemGallerySlider;
