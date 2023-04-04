import Image from "next/image";
import { useRef } from "react";

import Footer from "../footer";
import Header from "../header";
import Heading, { headingVariant } from "../heading";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";
import Layout from "../layout";
import CrescentMap from "../maps/crescent-map";

interface Props {
  homeList: {
    pageHeading: string;
    location: string;
    heroSlider: Array<{ url: string; alt: string }>;
    facilities: { list: Array<string>; image: { url: string; alt: string } };
    catering: {
      paragraphs: Array<string>;
      image: { url: string; alt: string };
    };
    meetTheTeam: {
      paragraph: string;
      images: Array<{
        position: string;
        url: string;
        alt: string;
        teamMember: string;
        bio: string;
      }>;
    };
    gallerySlider: Array<{ url: string; alt: string }>;
    locationDetail: { description: string[]; imageUrl?: string };
    mapUrl: string;
  };
}

const IndividualHomesPageItem = ({
  homeList: {
    pageHeading,
    location,
    heroSlider,
    facilities,
    catering,
    meetTheTeam,
    gallerySlider,
    locationDetail,
    mapUrl,
  },
}: Props) => {
  const mainRef = useRef<Splide>(null);

  const handleThumbs = (id: number) => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
  };

  return (
    <div className="">
      <Header />
      <Layout>
        <Heading
          variant={headingVariant.pageHeading}
          cssClasses="mb-0 tablet:mb-0 desktop:mb-0"
        >
          {pageHeading}
        </Heading>
        <h3 className="text-paragraph font-thin text-center mt-2 mb-16">
          {location}
        </h3>
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
          {heroSlider.map(({ url, alt }, index) => (
            <SplideSlide key={index} className="h-[300px]">
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
        <main>
          <div className="flex flex-col gap-16 mt-16">
            <div>
              <Heading variant={headingVariant.subheading}>Facilities</Heading>
              <article className="flex flex-col gap-10">
                <ul className="list-disc ml-10">
                  {facilities.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <Image
                  src={facilities.image.url}
                  alt={facilities.image.alt}
                  width={1000}
                  height={750}
                  className="object-cover h-[250px]"
                />
              </article>
            </div>
            <div>
              <Heading variant={headingVariant.subheading}>Catering</Heading>
              <div className="flex flex-col gap-10">
                <article>
                  <p className="mb-4">{catering.paragraphs[0]}</p>
                  <p className="mb-4">{catering.paragraphs[1]}</p>
                  <p className="mb-4">{catering.paragraphs[2]}</p>
                  <p>{catering.paragraphs[3]}</p>
                </article>

                <Image
                  src={catering.image.url}
                  alt={catering.image.alt}
                  width={1000}
                  height={750}
                  className="object-cover h-[250px]"
                />
              </div>
            </div>
            <div>
              <Heading variant={headingVariant.subheading}>
                Meet the team
              </Heading>
              <p>{meetTheTeam.paragraph}</p>
              {meetTheTeam.images.map(
                ({ position, url, alt, teamMember, bio }, index) => (
                  <article
                    key={index}
                    className="flex flex-col items-center mt-16 gap-8"
                  >
                    <h4 className="text-larger text-center">{position}</h4>
                    <Image
                      src={url}
                      alt={alt}
                      width={400}
                      height={400}
                      className="object-cover w-[325px] h-[325px]"
                    />
                    <ul className="flex flex-col gap-4">
                      <li className="text-center text-larger">{teamMember}</li>
                      <li>{bio}</li>
                    </ul>
                  </article>
                )
              )}
            </div>
          </div>
        </main>
        <article className="my-16">
          <Heading variant={headingVariant.subheading}>Gallery</Heading>
          <Splide
            ref={mainRef}
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
            {gallerySlider.map(({ url, alt }, index) => (
              <SplideSlide key={index} className="h-[300px]">
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
          <Splide
            options={{
              type: "slide",
              rewind: true,
              pagination: false,
              fixedWidth: 110,
              fixedHeight: 110,
              cover: true,
              focus: "center",
              snap: true,
              arrows: true,
            }}
          >
            {gallerySlider.map(({ url, alt }, index) => (
              <SplideSlide key={index} className="h-[100px]">
                <Image
                  src={url}
                  alt={alt}
                  width={200}
                  height={200}
                  className="object-cover h-full w-full"
                  onClick={() => handleThumbs(index)}
                />
              </SplideSlide>
            ))}
          </Splide>
        </article>
        <article>
          <Heading variant={headingVariant.subheading}>Location</Heading>
          <p>{locationDetail.description}</p>
          <CrescentMap cssClasses="w-full h-[400px] mt-10" />
        </article>
      </Layout>
      <Footer />
    </div>
  );
};

export default IndividualHomesPageItem;
