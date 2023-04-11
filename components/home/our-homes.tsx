import Image from "next/image";

import Button from "../button";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

import "@splidejs/react-splide/css/core";

import sliderList from "../../data/carevita-data.json";
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
          pagination: false,
          autoplay: true,
          type: "fade",
          rewind: true,
          interval: 4000,
          dragMinThreshold: 10,
          breakpoints: {
            900: {
              arrows: false,
            },
          },
        }}
      >
        {sliderList.ourHomesSliderHomePage.map(
          ({ url, alt, position }, index) => (
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
          )
        )}
      </Splide>
      <Button
        url="our-homes"
        cssClasses="mt-10 mx-auto tabletLarge:mx-0 desktop:mx-auto desktop:mt-0 desktop:-translate-y-[540px] desktop:translate-x-[500px]"
      />
    </section>
  );
};

export default OurHomes;
