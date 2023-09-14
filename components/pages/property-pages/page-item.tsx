import { DataProps } from "@/components/utils/data-props";
import Heading, { headingVariant } from "../../heading";
import About from "./components/about";
import MeetTheTeam from "./components/meet-the-team";
import PageItemGallerySlider from "../../sliders/page-item-gallery-slider";
import PageItemHeroSlider from "../../sliders/page-item-hero-slider";
import Layout from "@/components/layout";
import MetaComponent from "../meta-component";

const PageItem = ({
  data: {
    general,
    about,
    whatWeOffer,
    meetTheTeam,
    images: { heroSlider, gallerySlider },
  },
}: DataProps) => {
  return (
    <>
      <MetaComponent general={general} />
      <Layout>
        <Heading variant={headingVariant.pageHeading}>
          {general.extendedTitle}
        </Heading>
        <h3 className="text-paragraph font-thin text-center mb-16 tablet:text-left tablet:mb-8 tabletLarge:mb-6 -mt-6 tablet:-mt-12 tabletLarge:-mt-12 desktop:-mt-8">
          {general.extendedLocation}
        </h3>
      </Layout>
      <PageItemHeroSlider
        imageList={heroSlider}
        homeName={general.extendedTitle}
      />
      <Layout>
        <main>
          <div className="flex flex-col gap-16 mt-16">
            <div>
              <div
                id="about"
                className="-translate-y-28 tablet:-translate-y-32 desktop:-translate-y-28"
              ></div>
              <About
                about={about}
                general={general}
                whatWeOffer={whatWeOffer}
              />
            </div>
            <div>
              <div
                id="staff"
                className="-translate-y-28 tablet:-translate-y-32 desktop:-translate-y-28"
              ></div>
              <MeetTheTeam
                meetTheTeam={meetTheTeam}
                homeName={general.extendedTitle}
              />
            </div>
          </div>
        </main>
        <div
          id="gallery"
          className="-translate-y-12 tablet:-translate-y-16 desktop:-translate-y-12"
        ></div>
        <article className="my-16">
          <Heading variant={headingVariant.subheading}>Gallery</Heading>
          <PageItemGallerySlider
            imageList={gallerySlider}
            homeName={general.extendedTitle}
          />
        </article>
        <div
          id="location"
          className="-translate-y-28 tablet:-translate-y-32 desktop:-translate-y-28"
        ></div>
        <article>
          <Heading variant={headingVariant.subheading}>Location</Heading>
          {general.description && <p>{general.description}</p>}
        </article>
      </Layout>
    </>
  );
};

export default PageItem;
