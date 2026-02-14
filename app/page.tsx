import Hero from "@/_components/pages/home-page/hero";
import About from "@/_components/pages/home-page/about";
import PageWrapper from "@/_lib/page-wrapper";
import Services from "@/_components/pages/home-page/services";
import OurHomes from "@/_components/pages/home-page/our-homes-gallery";
import ContactComponent from "@/_components/contact/contact-component";

import generalData from "@/_data/general-data.json";

const Home = () => {
  return (
    <div>
      <Hero />
      <PageWrapper>
        <About cssClasses="my-16" data={generalData} />
        <div id="services" className="scroll-mt-32"></div>
        <Services />
        <div
          id="gallery"
          className="scroll-mt-12 tablet:scroll-mt-16 desktop:scroll-mt-12"
        ></div>
        <OurHomes cssClasses="my-16" />
      </PageWrapper>
      <div id="contact" className="scroll-mt-32"></div>
      <ContactComponent />
    </div>
  );
};

export default Home;
