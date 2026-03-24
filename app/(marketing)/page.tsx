import Hero from "@/_components/pages/home-page/hero";
import About from "@/_components/pages/home-page/about";
import PageWrapper from "@/_lib/page-wrapper";
import Services from "@/_components/pages/home-page/services";
import OurHomes from "@/_components/pages/home-page/our-homes-gallery";
import ContactComponent from "@/_components/contact/contact-component";
import {
  getHomePageContent,
  getFacilityNavigation,
} from "@/_actions/facilities-actions";

export const revalidate = 0;

async function Home() {
  const homePageContent = await getHomePageContent();
  const facilities = await getFacilityNavigation();

  return (
    <div>
      <Hero
        heroDisplayMode={homePageContent.heroDisplayMode}
        heroSlider={homePageContent.heroSlider}
        heroLargeMp4={homePageContent.heroLargeMp4}
        heroLargeWebm={homePageContent.heroLargeWebm}
        heroSmallMp4={homePageContent.heroSmallMp4}
        heroSmallWebm={homePageContent.heroSmallWebm}
        heroPosterImage={homePageContent.heroPosterImage}
      />
      <PageWrapper>
        <About cssClasses="my-16" data={{ homePage: homePageContent }} />
        <div id="services" className="scroll-mt-32">
          <Services services={homePageContent.services} />
        </div>
        <div
          id="gallery"
          className="scroll-mt-12 tablet:scroll-mt-16 desktop:scroll-mt-12"
        ></div>
        <OurHomes cssClasses="my-16" images={homePageContent.ourHomesSliderHomePage} />
      </PageWrapper>
      <div id="contact" className="scroll-mt-32">
        <ContactComponent facilities={facilities} />
      </div>
    </div>
  );
}

export default Home;
