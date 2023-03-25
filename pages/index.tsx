import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Layout from "@/components/layout";
import Header from "@/components/header";
import Services from "@/components/home/services";
import OurHomes from "@/components/home/our-homes";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Layout>
        <About cssClasses="my-16" />
        <Services />
        <OurHomes cssClasses="my-16" />
      </Layout>
    </>
  );
};

export default Home;
