import DOMPurify from "isomorphic-dompurify";
import { DataProps } from "@/_lib/utils/data-props";
import Heading, { headingVariant } from "../../ui/heading";
import About from "./about";
import MeetTheTeam from "./meet-the-team";
import GeneralSlider from "../../sliders/general-slider";
import PageWrapper from "@/_lib/page-wrapper";
import VideoHeroComponent from "@/_lib/utils/video-hero-component";
import classNames from "classnames";

const PageItem = ({ data }: DataProps) => {
  const { general, location, about, whatWeOffer, meetTheTeam, media } = data;
  const { heroSlider, gallerySlider, heroDisplayMode, video } =
    media ?? (data as any).images;
  const displayTitle = general.facilityExtendedName || general.facilityName;
  return (
    <div className="mt-10 desktop:max-w-[1280px] desktop:mx-auto">
      <PageWrapper>
        <Heading
          variant={headingVariant.pageHeading}
          cssClasses="text-center tablet:text-left"
        >
          {displayTitle}
        </Heading>
        <h3 className="text-paragraph font-extralight text-center mb-10 tablet:text-left">
          {general.extendedLocation}
        </h3>
      </PageWrapper>
      {heroDisplayMode === "video" && video ? (
        <VideoHeroComponent
          largeMp4={video.largeMp4}
          smallMp4={video.smallMp4}
          largeWebm={video.largeWebm}
          smallWebm={video.smallWebm}
          posterImage={video.posterImage}
        />
      ) : heroSlider.length > 0 ? (
        <GeneralSlider
          imageList={heroSlider}
          homeName={displayTitle}
          variant="hero"
        />
      ) : video ? (
        <VideoHeroComponent
          largeMp4={video.largeMp4}
          smallMp4={video.smallMp4}
          largeWebm={video.largeWebm}
          smallWebm={video.smallWebm}
          posterImage={video.posterImage}
        />
      ) : null}
      <PageWrapper cssClasses="mt-10">
        <main>
          <div
            className={classNames(meetTheTeam && "flex flex-col gap-16 mb-16")}
          >
            <About about={about} general={general} whatWeOffer={whatWeOffer} />
            {meetTheTeam && meetTheTeam.length <= 2 ? null : (
              <div id="staff" className="scroll-mt-32">
                <MeetTheTeam
                  meetTheTeam={meetTheTeam!}
                  homeName={displayTitle}
                />
              </div>
            )}
          </div>
        </main>
        <section id="gallery" className="scroll-mt-32">
          <Heading
            variant={headingVariant.subheading}
            cssClasses="mb-5 text-center tablet:text-left"
          >
            Gallery
          </Heading>
          <GeneralSlider
            imageList={gallerySlider}
            homeName={displayTitle}
            variant="gallery"
          />
        </section>
        <section id="location" className="scroll-mt-32 mt-10">
          <Heading
            variant={headingVariant.subheading}
            cssClasses="mb-5 text-center tablet:text-left"
          >
            Location
          </Heading>
          {location.description && (
            <article
              className="[&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_li]:mb-0 [&_li]:leading-3 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(location.description),
              }}
            />
          )}
        </section>
      </PageWrapper>
    </div>
  );
};

export default PageItem;
