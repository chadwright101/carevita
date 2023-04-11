import Heading, { headingVariant } from "../../heading";
import FacilitiesCatering from "./components/facilities-catering";
import MeetTheTeam from "./components/meet-the-team";
import PageItemGallerySlider from "./components/sliders/page-item-gallery-slider";
import PageItemHeroSlider from "./components/sliders/page-item-hero-slider";
import Layout from "@/components/layout";

interface Props {
  homeList: {
    extendedTitle: string;
    extendedLocation: string;
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
  };
}

const PageItem = ({
  homeList: {
    extendedTitle,
    extendedLocation,
    heroSlider,
    facilities,
    catering,
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
      <PageItemHeroSlider imageList={heroSlider} />
      <Layout>
        <main>
          <div className="flex flex-col gap-16 mt-16">
            <FacilitiesCatering facilities={facilities} catering={catering} />
            <MeetTheTeam meetTheTeam={meetTheTeam} />
          </div>
        </main>
        <article className="my-16">
          <Heading variant={headingVariant.subheading}>Gallery</Heading>
          <PageItemGallerySlider imageList={gallerySlider} />
        </article>
        <article>
          <Heading variant={headingVariant.subheading}>Location</Heading>
          <p>{locationDetail.description}</p>
        </article>
      </Layout>
    </>
  );
};

export default PageItem;
