import Button from "../../button";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css/core";

import sliderList from "@/data/general-data.json";
import Heading, { headingVariant } from "../../heading";
import Layout from "@/components/layout";
import ImageContainer from "@/components/utils/image-container";

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
          dragMinThreshold: { mouse: 50, touch: 150 },
          breakpoints: {
            900: {
              arrows: false,
            },
          },
        }}
        className="max-w-[1400px] tablet:mx-auto"
      >
        {sliderList.homePage.ourHomesSliderHomePage.map((url, index) => (
          <SplideSlide
            key={index}
            className="h-[300px] w-full tablet:h-[400px] tabletLarge:h-[500px] desktopSmall:h-[575px] desktop:h-[615px]"
          >
            <ImageContainer
              src={url}
              alt="Carevita - Our Homes"
              width={1400}
              height={1000}
              cssClasses="object-cover w-full h-full"
              desktopSmall={100}
              desktop={80}
            />
          </SplideSlide>
        ))}
      </Splide>
      <Button
        url="our-homes"
        cssClasses="mt-10 desktop:mt-0 desktop:-translate-y-[540px] desktop:translate-x-[500px]"
      />
    </section>
  );
};

export default OurHomes;
