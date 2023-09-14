import Head from "next/head";

import Hero from "@/components/pages/home/hero";
import About from "@/components/pages/home/about";
import Layout from "@/components/layout";
import Services from "@/components/pages/home/services";
import OurHomes from "@/components/pages/home/our-homes";
import Contact from "@/components/contact/contact";

import generalData from "@/data/general-data.json";

const Home = () => {
  const {
    homePage: {
      meta: { title, description, keywords, images },
    },
  } = generalData;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {images.map((image, index) => (
          <meta property="og:image" content={image} key={index} />
        ))}
        <meta property="og:title" content={`${title}`} />
        <meta property="og:url" content={`https://www.catevita.co.za`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={`Home - ${title}`} />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"></link>
      </Head>
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
        className="-translate-y-12 tablet:-translate-y-16 desktop:-translate-y-12"
      ></div>
      <OurHomes cssClasses="my-16" />
      <div
        id="contact"
        className="-translate-y-28 tablet:-translate-y-32 desktop:-translate-y-28"
      ></div>
      <Contact />
    </>
  );
};

export default Home;
