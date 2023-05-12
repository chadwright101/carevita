import Heading, { headingVariant } from "../../heading";
import About from "./components/about";
import MeetTheTeam from "./components/meet-the-team";
import PageItemGallerySlider from "./components/sliders/page-item-gallery-slider";
import PageItemHeroSlider from "./components/sliders/page-item-hero-slider";
import Layout from "@/components/layout";

interface Props {
  homeList: {
    extendedTitle: string;
    extendedLocation: string;
    heroSlider: Array<{ url: string }>;
    whatWeOffer: {
      list: Array<string>;
      image: { url: string };
      pampering?: Array<string>;
      weeklyActivities: Array<string>;
    };
    about: {
      paragraphs: Array<string>;
      image: { url: string };
    };
    meetTheTeam: {
      images: Array<{
        position: string;
        url: string;
        teamMember: string;
      }>;
    };
    gallerySlider: Array<{ url: string }>;
    locationDetail: { description?: string[]; imageUrl?: string };
  };
}

const PageItem = ({
  homeList: {
    extendedTitle,
    extendedLocation,
    heroSlider,
    whatWeOffer,
    about,
    meetTheTeam,
    gallerySlider,
    locationDetail,
  },
}: Props) => {
  return (
    <>
      <Layout>
        <Heading variant={headingVariant.pageHeading}>{extendedTitle}</Heading>
        <h3 className="text-paragraph font-thin text-center mb-16 tablet:text-left tablet:mb-8 tabletLarge:mb-6 -mt-6 tablet:-mt-12 tabletLarge:-mt-12 desktop:-mt-8">
          {extendedLocation}
        </h3>
      </Layout>
      <PageItemHeroSlider imageList={heroSlider} homeName={extendedTitle} />
      <Layout>
        <main>
          <div className="flex flex-col gap-16 mt-16">
            <About
              whatWeOffer={whatWeOffer}
              about={about}
              homeName={extendedTitle}
            />
            <MeetTheTeam meetTheTeam={meetTheTeam} homeName={extendedTitle} />
          </div>
        </main>
        <article className="my-16">
          <Heading variant={headingVariant.subheading}>Gallery</Heading>
          <PageItemGallerySlider
            imageList={gallerySlider}
            homeName={extendedTitle}
          />
        </article>
        <article>
          <Heading variant={headingVariant.subheading}>Location</Heading>
          {locationDetail.description && <p>{locationDetail.description}</p>}
        </article>
      </Layout>
    </>
  );
};

export default PageItem;
