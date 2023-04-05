import Heading, { headingVariant } from "../heading";
import FacilitesCatering from "./components/facilities-catering";
import MeetTheTeam from "./components/meet-the-team";
import PageItemGallerySlider from "./components/sliders/page-item-gallery-slider";
import PageItemHeroSlider from "./components/sliders/page-item-hero-slider";
import Layout from "@/components/layout";

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
  };
}

const PageItem = ({
  homeList: {
    pageHeading,
    location,
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
        <Heading
          variant={headingVariant.pageHeading}
          cssClasses="mb-0.5 tablet:mb-0.5 desktop:mb-0.5"
        >
          {pageHeading}
        </Heading>
        <h3 className="text-paragraph font-thin text-center mt-2 mb-16 tablet:text-left tablet:mb-8 tabletLarge:mb-6">
          {location}
        </h3>
      </Layout>
      <PageItemHeroSlider imageList={heroSlider} />
      <Layout>
        <main>
          <div className="flex flex-col gap-16 mt-16">
            <FacilitesCatering facilities={facilities} catering={catering} />
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
