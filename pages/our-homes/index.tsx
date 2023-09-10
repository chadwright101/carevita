import HomeItem from "@/components/pages/our-homes/home-item";
import Heading, { headingVariant } from "@/components/heading";
import Layout from "@/components/layout";
import Contact from "@/components/contact/contact";

import crescentData from "@/data/crescent-data.json";
import sereneData from "@/data/serene-data.json";
import eastlandsData from "@/data/eastlands-data.json";

const OurHomes = () => {
  return (
    <>
      <Layout>
        <Heading variant={headingVariant.pageHeading}>Our Homes</Heading>
        <main className="grid tabletLarge:grid-cols-2 tabletLarge:gap-10 desktop:grid-cols-3">
          <div>
            <HomeItem
              data={crescentData}
              featuredImage={crescentData.images.heroSlider[1]}
            />
            <hr className="my-16 tablet:text-white tablet:my-10 desktop:my-5" />
          </div>
          <div>
            <HomeItem
              data={eastlandsData}
              featuredImage={eastlandsData.images.heroSlider[0]}
            />
            <hr className="my-16 tablet:text-white tablet:my-10 desktop:my-5" />
          </div>
          <HomeItem
            data={sereneData}
            featuredImage={sereneData.images.heroSlider[2]}
          />
        </main>
      </Layout>
      <Contact cssClasses="mt-20" />
    </>
  );
};

export default OurHomes;
