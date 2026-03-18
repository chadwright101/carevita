"use client";

import { useActionState, useState } from "react";
import { Facility, TeamMember } from "@/_types/facility-types";
import { updateFacility } from "@/_actions/admin-facilities-actions";
import ButtonType from "@/_components/ui/button-type";
import GeneralSection from "./edit-form/general-section";
import AboutSection from "./edit-form/about-section";
import WhatWeOfferSection from "./edit-form/what-we-offer-section";
import MeetTheTeamSection from "./edit-form/meet-the-team-section";
import MediaSection from "./edit-form/media-section";
import LocationSection from "./edit-form/location-section";
import MetaSection from "./edit-form/meta-section";
import OurHomesPageSection from "./edit-form/our-homes-page-section";

interface Props {
  facility: Facility;
}

const initialState = { success: false, error: "" };

export default function FacilityEditForm({ facility }: Props) {
  const [state, formAction] = useActionState(updateFacility, initialState);

  const { general, whatWeOffer, about, meetTheTeam, location, meta, ourHomesPage, order, isActive } =
    facility;
  const media = facility.media ?? (facility as any).images;

  const [title, setTitle] = useState(general.title ?? "");
  const [extendedTitle, setExtendedTitle] = useState(
    general.extendedTitle ?? "",
  );
  const [city, setCity] = useState(general.location.split(", ")[0] ?? "");
  const [region, setRegion] = useState(general.region ?? "");
  const [email, setEmail] = useState(general.email ?? "");
  const [phone, setPhone] = useState(general.phone ?? "");
  const [description, setDescription] = useState(location.description ?? "");
  const [contactImage, setContactImage] = useState(location.contactImage ?? "");
  const [metaKeywords, setMetaKeywords] = useState(meta.keywords ?? "");
  const [whatWeOfferImage, setWhatWeOfferImage] = useState(
    whatWeOffer.image ?? "",
  );
  const [aboutImage, setAboutImage] = useState(about.image ?? "");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
    meetTheTeam ?? [],
  );
  const [heroSliderState, setHeroSliderState] = useState(media.heroSlider);
  const [gallerySliderState, setGallerySliderState] = useState(
    media.gallerySlider,
  );
  const [heroDisplayMode, setHeroDisplayMode] = useState<"slider" | "video">(
    media.heroDisplayMode ?? "slider",
  );
  const [heroDesktopMp4, setHeroDesktopMp4] = useState(
    media.video?.desktopMp4 ?? "",
  );
  const [heroDesktopWebm, setHeroDesktopWebm] = useState(
    media.video?.desktopWebm ?? "",
  );
  const [heroMobileMp4, setHeroMobileMp4] = useState(
    media.video?.mobileMp4 ?? "",
  );
  const [heroMobileWebm, setHeroMobileWebm] = useState(
    media.video?.mobileWebm ?? "",
  );
  const [heroPoster, setHeroPoster] = useState(media.video?.poster ?? "");
  const [metaImages, setMetaImages] = useState(meta.images);
  const [ourHomesDescription, setOurHomesDescription] = useState(
    ourHomesPage.description ?? "",
  );
  const [mapLat, setMapLat] = useState(String(location.map.lat));
  const [mapLng, setMapLng] = useState(String(location.map.lng));
  const [activeSection, setActiveSection] = useState("general");

  function toggleSection(id: string) {
    setActiveSection((prev) => (prev === id ? "" : id));
  }

  return (
    <form
      action={formAction}
      autoComplete="off"
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="slug" value={general.slug} />
      <input type="hidden" name="isActive" value={String(isActive)} />
      <input type="hidden" name="order" value={String(order)} />

      <GeneralSection
        title={title}
        setTitle={setTitle}
        extendedTitle={extendedTitle}
        setExtendedTitle={setExtendedTitle}
        city={city}
        setCity={setCity}
        region={region}
        setRegion={setRegion}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      <AboutSection
        facilitySlug={general.slug}
        aboutContent={about.paragraphs}
        aboutImage={aboutImage}
        setAboutImage={setAboutImage}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      <WhatWeOfferSection
        facilitySlug={general.slug}
        whatWeOfferList={whatWeOffer.list}
        whatWeOfferImage={whatWeOfferImage}
        setWhatWeOfferImage={setWhatWeOfferImage}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      <MeetTheTeamSection
        facilitySlug={general.slug}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      <MediaSection
        facilitySlug={general.slug}
        heroSliderState={heroSliderState}
        setHeroSliderState={setHeroSliderState}
        gallerySliderState={gallerySliderState}
        setGallerySliderState={setGallerySliderState}
        heroDisplayMode={heroDisplayMode}
        setHeroDisplayMode={setHeroDisplayMode}
        heroDesktopMp4={heroDesktopMp4}
        setHeroDesktopMp4={setHeroDesktopMp4}
        heroDesktopWebm={heroDesktopWebm}
        setHeroDesktopWebm={setHeroDesktopWebm}
        heroMobileMp4={heroMobileMp4}
        setHeroMobileMp4={setHeroMobileMp4}
        heroMobileWebm={heroMobileWebm}
        setHeroMobileWebm={setHeroMobileWebm}
        heroPoster={heroPoster}
        setHeroPoster={setHeroPoster}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      <LocationSection
        facilitySlug={general.slug}
        description={description}
        setDescription={setDescription}
        contactImage={contactImage}
        setContactImage={setContactImage}
        mapLat={mapLat}
        setMapLat={setMapLat}
        mapLng={mapLng}
        setMapLng={setMapLng}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      <OurHomesPageSection
        ourHomesDescription={ourHomesDescription}
        setOurHomesDescription={setOurHomesDescription}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      <MetaSection
        facilitySlug={general.slug}
        metaKeywords={metaKeywords}
        setMetaKeywords={setMetaKeywords}
        metaImages={metaImages}
        setMetaImages={setMetaImages}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      {state.error && <p className="text-error text-smallest">{state.error}</p>}

      <ButtonType cssClasses="self-start">Save Changes</ButtonType>
    </form>
  );
}
