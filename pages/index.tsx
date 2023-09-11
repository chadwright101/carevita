import Hero from "@/components/pages/home/hero";
import About from "@/components/pages/home/about";
import Layout from "@/components/layout";
import Services from "@/components/pages/home/services";
import OurHomes from "@/components/pages/home/our-homes";
import Contact from "@/components/contact/contact";

import generalData from "@/data/general-data.json";

const Home = () => {
  return (
    <>
      <Hero />
      <Layout>
        <About cssClasses="my-16" data={generalData} />
        <div
          id="services"
          className="-translate-y-28 tablet:-translate-y-32 desktop:-translate-y-28"
        ></div>
        <Services />
      </Layout>
      <div
        id="gallery"
        className="-translate-y-28 tablet:-translate-y-32 desktop:-translate-y-28"
      ></div>
      <OurHomes cssClasses="my-16" />
      <Contact />
    </>
  );
};

export default Home;
