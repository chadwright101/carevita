import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Layout from "@/components/layout";
import Header from "@/components/header";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Layout>
        <About cssClasses="my-12" />
      </Layout>
    </>
  );
};

export default Home;
