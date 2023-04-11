import Header from "@/components/header";
import Footer from "@/components/footer";
import HomeItem from "@/components/pages/our-homes/home-item";
import Heading, { headingVariant } from "@/components/heading";
import Layout from "@/components/layout";
import Contact from "@/components/contact/contact";

import homeList from "../../data/home-page-our-homes-data.json";

const OurHomes = () => {
  return (
    <>
      <Header />
      <Layout>
        <Heading variant={headingVariant.pageHeading}>Our homes</Heading>
        <main className="grid tabletLarge:grid-cols-2 tabletLarge:gap-10 desktop:grid-cols-3">
          {homeList.ourHomesPage.map(
            (
              {
                extendedTitle,
                description,
                location,
                image,
                imageAlt,
                homesPageUrl,
              },
              index
            ) => (
              <div key={index}>
                <HomeItem
                  heroImageUrl={image}
                  heroImageAlt={imageAlt}
                  heading={extendedTitle}
                  location={location}
                  paragraph={description}
                  buttonUrl={homesPageUrl}
                />
                {index < homeList.ourHomesPage.length - 1 && (
                  <hr className="my-16 tablet:text-white tablet:my-10 desktop:my-5" />
                )}
              </div>
            )
          )}
        </main>
      </Layout>
      <Contact cssClasses="mt-20" />
      <Footer />
    </>
  );
};

export default OurHomes;
