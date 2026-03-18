"use client";

import { useState, useActionState } from "react";
import { createFacility } from "@/_actions/admin-facilities-actions";
import ButtonType from "@/_components/ui/button-type";
import { TeamMember } from "@/_types/facility-types";
import GeneralSection from "./edit-form/general-section";
import AboutSection from "./edit-form/about-section";
import WhatWeOfferSection from "./edit-form/what-we-offer-section";
import MeetTheTeamSection from "./edit-form/meet-the-team-section";
import MediaSection from "./edit-form/media-section";
import LocationSection from "./edit-form/location-section";
import OurHomesPageSection from "./edit-form/our-homes-page-section";
import MetaSection from "./edit-form/meta-section";

const initialState = { success: false, error: "" };

export default function FacilityAddForm() {
  const [state, formAction] = useActionState(createFacility, initialState);
  const [activeSection, setActiveSection] = useState("general");

  const [title, setTitle] = useState("");
  const [extendedTitle, setExtendedTitle] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState<
    "" | "EC" | "FS" | "GP" | "KZN" | "LP" | "MP" | "NC" | "NW" | "WC"
  >("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+27");
  const [description, setDescription] = useState("");
  const [contactImage, setContactImage] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [whatWeOfferImage, setWhatWeOfferImage] = useState("");
  const [aboutImage, setAboutImage] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [heroSliderState, setHeroSliderState] = useState<string[]>([]);
  const [gallerySliderState, setGallerySliderState] = useState<string[]>([]);
  const [heroDisplayMode, setHeroDisplayMode] = useState<"slider" | "video">("slider");
  const [heroDesktopMp4, setHeroDesktopMp4] = useState("");
  const [heroDesktopWebm, setHeroDesktopWebm] = useState("");
  const [heroMobileMp4, setHeroMobileMp4] = useState("");
  const [heroMobileWebm, setHeroMobileWebm] = useState("");
  const [heroPoster, setHeroPoster] = useState("");
  const [metaImages, setMetaImages] = useState<string[]>([]);
  const [ourHomesDescription, setOurHomesDescription] = useState("");
  const [mapLat, setMapLat] = useState("");
  const [mapLng, setMapLng] = useState("");

  const slug = title.toLowerCase().replace(/\s+/g, "-");

  function toggleSection(id: string) {
    setActiveSection((prev) => (prev === id ? "" : id));
  }

  return (
    <form
      action={formAction}
      autoComplete="off"
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="isActive" value="true" />
      <input type="hidden" name="order" value="0" />

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
        facilitySlug={slug}
        aboutContent=""
        aboutImage={aboutImage}
        setAboutImage={setAboutImage}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      <WhatWeOfferSection
        facilitySlug={slug}
        whatWeOfferList=""
        whatWeOfferImage={whatWeOfferImage}
        setWhatWeOfferImage={setWhatWeOfferImage}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      <MeetTheTeamSection
        facilitySlug={slug}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      <MediaSection
        facilitySlug={slug}
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
        facilitySlug={slug}
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
        facilitySlug={slug}
        metaKeywords={metaKeywords}
        setMetaKeywords={setMetaKeywords}
        metaImages={metaImages}
        setMetaImages={setMetaImages}
        activeSection={activeSection}
        toggleSection={toggleSection}
      />

      {state.error && (
        <p className="text-error text-smallest">{state.error}</p>
      )}
      {state.success && (
        <p className="text-green text-smallest">Facility created</p>
      )}

      <ButtonType cssClasses="self-start">Create Facility</ButtonType>
    </form>
  );
}
