import Hero from "@/components/pages/home/hero";
import About from "@/components/pages/home/about";
import Layout from "@/components/layout";
import Header from "@/components/header";
import Services from "@/components/pages/home/services";
import OurHomes from "@/components/pages/home/our-homes";
import Footer from "@/components/footer";
import Contact from "@/components/contact/contact";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Layout>
        <About cssClasses="my-16" />
        <div
          id="services"
          className="-translate-y-36 tablet:-translate-y-40 desktop:-translate-y-36"
        ></div>
        <Services />
        <OurHomes cssClasses="my-16" />
      </Layout>
      <div
        id="contact"
        className="-translate-y-36 tablet:-translate-y-36 desktop:-translate-y-32"
      ></div>
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
