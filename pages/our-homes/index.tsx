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
        <main className="grid gap-y-12 gap-x-10 tabletLarge:gap-y-16 tabletLarge:grid-cols-2 tabletLarge:gap-10 desktop:grid-cols-3">
          <div>
            <HomeItem
              data={crescentData}
              featuredImage={crescentData.images.heroSlider[1]}
            />
            <hr className="mt-16 tabletLarge:hidden" />
          </div>
          <div>
            <HomeItem
              data={eastlandsData}
              featuredImage={eastlandsData.images.heroSlider[0]}
            />
            <hr className="mt-16 tabletLarge:hidden" />
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
