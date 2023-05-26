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
        {imageList.map(({ url }, index) => (
          <SplideSlide
            key={index}
            className="h-[250px] phone:h-[325px] tablet:h-[450px] tabletLarge:h-[525px] desktop:h-[700px]"
          >
            <ImageContainer
              src={url}
              alt={`${homeName} gallery item`}
              width={1400}
              height={1000}
              cssClasses="object-cover h-full w-full"
              smallest={325}
              phone={450}
              desktopSmall={525}
              desktop={800}
              onClick={() => slider1.current.go(index)}
              loading={index < 1 ? "eager" : "lazy"}
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
        {imageList.map(({ url }, index) => (
          <SplideSlide
            key={index}
            className="h-[110px] splide__slide splide__slide.is-active"
          >
            <div className="w-full bg-white h-full flex justify-center overflow-hidden">
              <ImageContainer
                src={url}
                alt={`${homeName} gallery thumbnail`}
                width={200}
                height={200}
                cssClasses="object-cover h-full w-full cursor-pointer px-1 pt-2"
                smallest={110}
                phone={110}
                desktopSmall={110}
                desktop={110}
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
