import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Layout from "@/components/layout";
import Header from "@/components/header";
import Services from "@/components/home/services";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Layout>
        <About cssClasses="my-16" />
        <Services />
      </Layout>
    </>
  );
};

export default Home;
