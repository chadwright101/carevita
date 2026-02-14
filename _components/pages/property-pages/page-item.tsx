import { DataProps } from "@/_lib/utils/data-props";
import Heading, { headingVariant } from "../../ui/heading";
import About from "./about";
import MeetTheTeam from "./meet-the-team";
import GeneralSlider from "../../sliders/general-slider";
import PageWrapper from "@/_lib/page-wrapper";
import VideoHeroComponent from "@/_lib/utils/video-hero-component";

const PageItem = ({
  data: {
    general,
    about,
    whatWeOffer,
    meetTheTeam,
    images: { heroSlider, gallerySlider },
    video,
  },
}: DataProps) => {
  return (
    <div className="mt-10 desktop:max-w-[1280px] desktop:mx-auto">
      <PageWrapper>
        <Heading
          variant={headingVariant.pageHeading}
          cssClasses="text-center tablet:text-left"
        >
          {general.extendedTitle}
        </Heading>
        <h3 className="text-paragraph font-extralight text-center mb-10 tablet:text-left">
          {general.extendedLocation}
        </h3>
      </PageWrapper>
      {heroSlider.length > 0 ? (
        <GeneralSlider
          imageList={heroSlider}
          homeName={general.extendedTitle}
          variant="hero"
        />
      ) : (
        <VideoHeroComponent
          desktopMp4={video!.desktopMp4}
          mobileMp4={video!.mobileMp4}
          desktopWebm={video!.desktopWebm}
          mobileWebm={video!.mobileWebm}
          poster={video!.poster}
        />
      )}
      <PageWrapper>
        <main>
          <div className="flex flex-col gap-16 mt-10">
            <About about={about} general={general} whatWeOffer={whatWeOffer} />
            {meetTheTeam && (
              <div>
                <div id="staff" className="scroll-mt-32"></div>
                <MeetTheTeam
                  meetTheTeam={meetTheTeam}
                  homeName={general.extendedTitle}
                />
              </div>
            )}
          </div>
        </main>
        <section id="gallery" className="my-16 scroll-mt-32">
          <Heading
            variant={headingVariant.subheading}
            cssClasses="mb-5 text-center tablet:text-left"
          >
            Gallery
          </Heading>
          <GeneralSlider
            imageList={gallerySlider}
            homeName={general.extendedTitle}
            variant="gallery"
          />
        </section>
        <section id="location" className="scroll-mt-32">
          <Heading
            variant={headingVariant.subheading}
            cssClasses="mb-5 text-center tablet:text-left"
          >
            Location
          </Heading>
          {general.description && <p>{general.description}</p>}
        </section>
      </PageWrapper>
    </div>
  );
};

export default PageItem;
