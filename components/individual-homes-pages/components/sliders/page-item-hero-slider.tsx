import Image from "next/image";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";

interface Props {
  imageList: Array<{ url: string; alt: string }>;
}

const PageItemHeroSlider = ({ imageList }: Props) => {
  return (
    <Splide
      options={{
        autoplay: true,
        type: "fade",
        interval: 4000,
        rewind: true,
        drag: false,
        arrows: false,
        pagination: false,
      }}
      className="desktop:max-w-[1400px] desktop:mx-auto"
      hasTrack={false}
    >
      {" "}
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
        <ul className="splide__pagination"></ul>
      </SplideTrack>
    </Splide>
  );
};

export default PageItemHeroSlider;
