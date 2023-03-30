import Image from "next/image";

import Button from "../button";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";

import ourHomeList from "../../data/our-homes-slider.json";
import Heading, { headingVariant } from "../heading";

interface Props {
  cssClasses?: string;
}

const OurHomes = ({ cssClasses }: Props) => {
  return (
    <section className={`flex flex-col ${cssClasses}`}>
      <Heading variant={headingVariant.sectionHeading}>Our Homes</Heading>
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
        }}
      >
        {ourHomeList.map(({ url, alt, position }, index) => (
          <SplideSlide
            key={index}
            className="h-[300px] w-full tablet:h-[400px] tabletLarge:h-[500px] desktopSmall:h-[575px] desktop:h-[615px]"
          >
            <Image
              src={url}
              alt={alt}
              width={1400}
              height={1000}
              className={`object-cover h-full w-full ${position}`}
            />
          </SplideSlide>
        ))}
      </Splide>
      <Button
        url="our-homes"
        cssClasses="mt-10 mx-auto tabletLarge:mx-0 desktop:mx-auto desktop:mt-0 desktop:-translate-y-[540px] desktop:translate-x-[490px]"
      />
    </section>
  );
};

export default OurHomes;
