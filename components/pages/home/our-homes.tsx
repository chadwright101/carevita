import Image from "next/image";

import Button from "../../button";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css/core";

import sliderList from "../../../data/home-page-our-homes-data.json";
import Heading, { headingVariant } from "../../heading";
import Layout from "@/components/layout";

interface Props {
  cssClasses?: string;
}

const OurHomes = ({ cssClasses }: Props) => {
  return (
    <section className={`flex flex-col ${cssClasses}`}>
      <Layout>
        <Heading variant={headingVariant.sectionHeading}>Our Homes</Heading>
      </Layout>
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
        className="max-w-[1400px] tablet:mx-auto"
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
                quality={50}
              />
            </SplideSlide>
          )
        )}
      </Splide>
      <Button
        url="our-homes"
        cssClasses="mt-10 desktop:mt-0 desktop:-translate-y-[540px] desktop:translate-x-[500px]"
      />
    </section>
  );
};

export default OurHomes;
