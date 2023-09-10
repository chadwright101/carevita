import Hero from "@/components/pages/blog/home/hero";
import About from "@/components/pages/blog/home/about";
import Layout from "@/components/layout";
import Services from "@/components/pages/blog/home/services";
import OurHomes from "@/components/pages/blog/home/our-homes";
import Contact from "@/components/contact/contact";

const Home = () => {
  return (
    <>
      <Hero />
      <Layout>
        <About cssClasses="my-16" />
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
