"use client";

import { HomePageContent } from "@/_types/facility-types";
import EditAboutForm from "./edit-about-form";
import EditServicesForm from "./edit-services-form";
import EditContactForm from "./edit-contact-form";

interface Props {
  homeContent: HomePageContent;
}

export default function HomeContentSection({ homeContent }: Props) {
  return (
    <section className="flex flex-col gap-6">
      <h2>Home Page Content</h2>
      <EditAboutForm about={homeContent.about} />
      <EditServicesForm services={homeContent.services} />
      <EditContactForm contact={homeContent.contact} />
    </section>
  );
}
