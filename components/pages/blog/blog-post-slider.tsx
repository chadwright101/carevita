import Image from "next/image";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

import "@splidejs/react-splide/css/core";

interface Props {
  galleryList?: string[];
}

const BlogPostSlider = ({ galleryList }: Props) => {
  return (
    <Splide
      options={{
        autoplay: true,
        type: "fade",
        interval: 4000,
        rewind: true,
        dragMinThreshold: 10,
        breakpoints: {
          900: {
            arrows: false,
          },
        },
      }}
      className="desktop:max-w-[1400px] desktop:mx-auto"
      hasTrack={false}
    >
      <div className="splide__arrows splide__arrows--ltr">
        <button
          className="splide__arrow splide__arrow--prev"
          type="button"
          aria-label="Previous slide"
          aria-controls="splide02-track"
        >
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
        <button
          className="splide__arrow splide__arrow--next"
          type="button"
          aria-label="Next slide"
          aria-controls="splide02-track"
        >
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
      <SplideTrack>
        {galleryList!.map((item, index) => (
          <SplideSlide
            key={index}
            className="h-[300px] phone:h-[350px] tablet:h-[450px] tabletLarge:h-[500px] desktopSmall:h-[600px] desktop:h-[550px]"
          >
            <Image
              src={item}
              alt=""
              width={1400}
              height={1000}
              className="object-cover h-full w-full"
              priority
            />
          </SplideSlide>
        ))}
      </SplideTrack>
    </Splide>
  );
};

export default BlogPostSlider;
