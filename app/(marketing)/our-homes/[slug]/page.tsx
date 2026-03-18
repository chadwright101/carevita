import type { Metadata } from "next";
import Image from "next/image";
import PageItem from "@/_components/pages/property-pages/page-item";
import Heading, { headingVariant } from "@/_components/ui/heading";
import PropertyPagesContactForm from "@/_components/contact/property-pages/property-pages-contact-form";
import PageWrapper from "@/_lib/page-wrapper";
import PropertyMap from "@/_components/contact/property-map";
import {
  getFacilityBySlug,
  getAllFacilities,
} from "@/_actions/facilities-actions";

export const revalidate = 0;

export async function generateStaticParams() {
  const facilities = await getAllFacilities();
  return facilities.map((facility) => ({
    slug: facility.general.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const facility = await getFacilityBySlug(slug);

  if (!facility) {
    return {
      title: "Not Found",
    };
  }

  const { general, location, meta } = facility;

  return {
    metadataBase: new URL("https://www.carevita.com"),
    title: `${general.facilityName} - CareVita`,
    description: location.description || general.facilityExtendedName,
    keywords: meta.keywords,
    openGraph: {
      description: location.description || general.facilityExtendedName,
      type: "website",
      locale: "en_ZA",
      siteName: "CareVita",
      images: meta.images.map((url) => ({
        url,
      })),
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const facility = await getFacilityBySlug(slug);

  if (!facility) {
    return null;
  }

  const { general: { facilityName }, location: { map, locationImage } } = facility;

  return (
    <>
      <PageItem data={facility} />
      <PageWrapper>
        <div className="tablet:grid grid-cols-2 gap-10 mt-10">
          <Image
            src={locationImage}
            alt={facilityName}
            width={700}
            height={400}
            className="object-cover w-full hidden h-[500px] tablet:block"
            sizes="50vw"
          />
          <PropertyMap
            cssClasses="w-full h-[400px] tablet:h-[500px] mb-16"
            lat={map.lat}
            lng={map.lng}
            zoom={map.zoom}
          />
        </div>
      </PageWrapper>
      <div
        id="contact"
        className="-translate-y-28 tablet:-translate-y-32 desktop:-translate-y-28"
      ></div>
      <section className="px-6 pt-10 pb-12 bg-blue">
        <div className="w-full max-w-[1280px] mx-auto">
          <Heading
            variant={headingVariant.sectionHeading}
            cssClasses="text-white"
          >
            <span className="font-thin text-white">Contact</span> {facilityName}
          </Heading>
          <PropertyPagesContactForm data={facility} />
        </div>
      </section>
    </>
  );
}
