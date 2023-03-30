import Header from "@/components/header";
import Footer from "@/components/footer";
import HomeItem from "@/components/our-homes/home-item";
import Heading, { headingVariant } from "@/components/heading";
import Layout from "@/components/layout";
import Contact from "@/components/contact";

import homeList from "../data/our-homes-array.json";

const OurHomes = () => {
  return (
    <>
      <Header />
      <Layout>
        <Heading variant={headingVariant.pageHeading} cssClasses="mt-10">
          Our homes
        </Heading>
        <main className="grid tabletLarge:grid-cols-2 tabletLarge:gap-10 desktop:grid-cols-3">
          {homeList.map(
            (
              {
                title,
                extendedTitle,
                description,
                location,
                image,
                imageAlt,
                homePage,
              },
              index
            ) => (
              <div>
                <HomeItem
                  heroImageUrl={image}
                  heroImageAlt={imageAlt}
                  heading={extendedTitle}
                  location={location}
                  paragraph={description}
                  buttonUrl={homePage}
                />
                {index < homeList.length - 1 && (
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
