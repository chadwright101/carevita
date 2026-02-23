import type { Metadata } from "next";

import RegionFilter from "@/_components/pages/our-homes-page/region-filter";
import Heading, { headingVariant } from "@/_components/ui/heading";
import PageWrapper from "@/_lib/page-wrapper";
import Contact from "@/_components/contact/contact-component";
import { getAllFacilities } from "@/_actions/facilities-actions";

export const revalidate = 86400;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.carevita.com"),
  title: "Our Homes - CareVita",
  description:
    "CareVita was founded in 2018 with the main purpose of breathing new life into the Retirement Management Sector.",
  keywords:
    "our homes, CareVita, Retirement, retirement home, frail care, elderly care, caregiving, nursing, nursing services, supporting services, catering services, retirement estate",
  openGraph: {
    description:
      "CareVita was founded in 2018 with the main purpose of breathing new life into the Retirement Management Sector.",
    type: "website",
    locale: "en_ZA",
    siteName: "CareVita",
    images: [
      {
        url: "/assets/media/eastlands/9U7A4551-HDR.jpg",
      },
      {
        url: "/assets/media/parsonage-street/9U7A3469.jpg",
      },
    ],
  },
};

async function OurHomesPage() {
  await getAllFacilities();

  return (
    <>
      <PageWrapper cssClasses="mt-10">
        <Heading
          variant={headingVariant.pageHeading}
          cssClasses="mb-10 text-center tablet:text-left tablet:mb-5"
        >
          Our Homes
        </Heading>
        <RegionFilter />
      </PageWrapper>
      <Contact cssClasses="mt-20" />
    </>
  );
}

export default OurHomesPage;
