import Image from "next/image";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";

interface Props {
  imageList: Array<{ url: string; alt: string }>;
}

const PageItemHeroSlider = ({ imageList }: Props) => {
  return (
    <Splide
      options={{
        pagination: true,
        autoplay: true,
        type: "loop",
        speed: 2000,
        interval: 6500,
        breakpoints: {
          900: {
            pagination: false,
          },
        },
        drag: false,
        arrows: false,
      }}
      className="desktop:max-w-[1400px] desktop:mx-auto"
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
  );
};

export default PageItemHeroSlider;
