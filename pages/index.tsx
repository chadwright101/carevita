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
          className="-translate-y-36 tablet:-translate-y-40 desktop:-translate-y-36"
        ></div>
        <Services />
      </Layout>
      <OurHomes cssClasses="my-16" />
      <div
        id="contact"
        className="-translate-y-36 tablet:-translate-y-36 desktop:-translate-y-32"
      ></div>
      <Contact />
    </>
  );
};

export default Home;
