"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Facility, TeamMember } from "@/_types/facility-types";
import { updateFacility } from "@/_actions/admin-facilities-actions";
import {
  facilityGeneralSchema,
  facilityLocationSchema,
} from "@/_lib/validation/facility-schema";
import ButtonType from "@/_components/ui/button-type";
import GeneralSection from "./edit-form/general-section";
import AboutSection from "./edit-form/about-section";
import WhatWeOfferSection from "./edit-form/what-we-offer-section";
import MeetTheTeamSection from "./edit-form/meet-the-team-section";
import HeroSection from "./edit-form/hero-section";
import GallerySection from "./edit-form/gallery-section";
import LocationSection from "./edit-form/location-section";
import MetaDataSection from "./edit-form/metadata-section";
import OurHomesPageSection from "./edit-form/our-homes-page-section";
import { usePendingUploads } from "@/_hooks/use-pending-uploads";

interface Props {
  facility: Facility;
}

const initialState = { success: false, error: "" };

export default function FacilityEditForm({ facility }: Props) {
  const [state, formAction] = useActionState(updateFacility, initialState);
  const [, startTransition] = useTransition();
  const { addPending, removePending, clearAll } = usePendingUploads();
  const {
    general,
    whatWeOffer,
    about,
    meetTheTeam,
    location,
    meta,
    ourHomesPage,
    order,
    isActive,
  } = facility;
  const media = facility.media ?? (facility as any).images;

  const [title, setTitle] = useState(general.facilityName ?? "");
  const [extendedTitle, setExtendedTitle] = useState(
    general.facilityExtendedName ?? "",
  );
  const [city, setCity] = useState(general.cityTown.split(", ")[0] ?? "");
  const [region, setRegion] = useState<
    "" | "EC" | "FS" | "GP" | "KZN" | "LP" | "MP" | "NC" | "NW" | "WC"
  >(general.province ?? "");
  const [email, setEmail] = useState(general.facilityEmail ?? "");
  const [phone, setPhone] = useState(general.facilityPhone ?? "");
  const [description, setDescription] = useState(location.description ?? "");
  const [contactImage, setContactImage] = useState(
    location.locationImage ?? "",
  );
  const [metaKeywords, setMetaKeywords] = useState(meta.keywords ?? "");
  const [metaTitle, setMetaTitle] = useState(meta.title ?? "");
  const [metaDescription, setMetaDescription] = useState(meta.description ?? "");
  const [whatWeOfferImage, setWhatWeOfferImage] = useState(
    whatWeOffer.image ?? "",
  );
  const [aboutContent, setAboutContent] = useState(about.content ?? "");
  const [aboutImage, setAboutImage] = useState(about.image ?? "");
  const [whatWeOfferContent, setWhatWeOfferContent] = useState(
    whatWeOffer.offerings ?? "",
  );
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
  const [heroLargeMp4, setHeroLargeMp4] = useState(media.video?.largeMp4 ?? "");
  const [heroLargeWebm, setHeroLargeWebm] = useState(
    media.video?.largeWebm ?? "",
  );
  const [heroSmallMp4, setHeroSmallMp4] = useState(media.video?.smallMp4 ?? "");
  const [heroSmallWebm, setHeroSmallWebm] = useState(
    media.video?.smallWebm ?? "",
  );
  const [heroPosterImage, setHeroPosterImage] = useState(
    media.video?.posterImage ?? "",
  );
  const [metaImages, setMetaImages] = useState(meta.images);
  const [ourHomesDescription, setOurHomesDescription] = useState(
    ourHomesPage.description ?? "",
  );
  const [mapLat, setMapLat] = useState(String(location.map.lat));
  const [mapLng, setMapLng] = useState(String(location.map.lng));
  const [activeSection, setActiveSection] = useState("general");
  const [sectionErrors, setSectionErrors] = useState<Record<string, string>>(
    {},
  );

  const generalRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const meetTheTeamRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const ourHomesRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const sectionRefMap: Record<
    string,
    React.RefObject<HTMLDivElement | null>
  > = {
    general: generalRef,
    about: aboutRef,
    whatWeOffer: offerRef,
    meetTheTeam: meetTheTeamRef,
    hero: heroRef,
    gallery: galleryRef,
    location: locationRef,
    ourHomesPage: ourHomesRef,
    meta: metaRef,
  };

  function toggleSection(id: string) {
    setActiveSection((prev) => (prev === id ? "" : id));
  }

  useEffect(() => {
    if (activeSection) {
      sectionRefMap[activeSection]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeSection]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors: Record<string, string> = {};

    const generalResult = facilityGeneralSchema.safeParse({
      facilityName: title,
      cityTown: city,
      extendedLocation: city,
      province: region,
      facilityEmail: email,
      facilityPhone: phone,
      slug: general.slug,
    });
    if (!generalResult.success || phone.trim().length <= 3) {
      const fields: string[] = [];
      for (const issue of generalResult.success
        ? []
        : generalResult.error.issues) {
        const field = issue.path[0];
        if (field === "facilityName") fields.push("Facility Name");
        else if (field === "facilityEmail") fields.push("Facility Email");
        else if (field === "facilityPhone") fields.push("Phone Number");
        else if (field === "province") fields.push("Province");
        else if (field === "cityTown") fields.push("City/Town");
      }
      if (phone.trim().length <= 3 && !fields.includes("Phone Number"))
        fields.push("Phone Number");
      errors.general = `Please complete all required fields in this section${fields.length ? ` - ${fields.join(", ")}` : ""}.`;
    }

    const aboutFields: string[] = [];
    if (!aboutContent) aboutFields.push("Content");
    if (!aboutImage) aboutFields.push("About Image");
    if (aboutFields.length > 0) {
      errors.about = `Please complete all required fields in this section - ${aboutFields.join(", ")}.`;
    }

    const offerFields: string[] = [];
    if (!whatWeOfferContent) offerFields.push("Content");
    if (!whatWeOfferImage) offerFields.push("What We Offer Image");
    if (offerFields.length > 0) {
      errors.whatWeOffer = `Please complete all required fields in this section - ${offerFields.join(", ")}.`;
    }

    if (
      heroDisplayMode === "slider" &&
      (heroSliderState.length < 3 || heroSliderState.length > 7)
    ) {
      errors.hero = "Hero Slider requires between 3 and 7 images.";
    }
    if (heroDisplayMode === "video" && (!heroLargeMp4 || !heroPosterImage)) {
      errors.hero = "Please add a video to this section - Hero Video.";
    }
    if (gallerySliderState.length < 7 || gallerySliderState.length > 20) {
      errors.gallery = "Gallery Slider requires between 7 and 20 images.";
    }

    const lat = parseFloat(mapLat);
    const lng = parseFloat(mapLng);
    const locationResult = facilityLocationSchema.safeParse({
      description,
      locationImage: contactImage,
      map: { lat, lng, zoom: location.map.zoom },
    });
    if (!locationResult.success || isNaN(lat) || isNaN(lng)) {
      const fields: string[] = [];
      if (!description) fields.push("Description");
      if (!contactImage) fields.push("Location Image");
      if (isNaN(lat) || isNaN(lng)) fields.push("Map Coordinates");
      errors.location = `Please complete all required fields in this section${fields.length ? ` - ${fields.join(", ")}` : ""}.`;
    }

    if (!ourHomesDescription) {
      errors.ourHomesPage = "A description is required.";
    }

    const metaFields: string[] = [];
    if (!metaTitle) metaFields.push("Meta Title");
    if (!metaDescription) metaFields.push("Meta Description");
    if (metaFields.length > 0) {
      errors.meta = `Please complete all required fields in this section - ${metaFields.join(", ")}.`;
    }

    if (teamMembers.length > 0) {
      const hasIncomplete = teamMembers.some(
        (m) => !m.teamMember || !m.position || !m.url,
      );
      if (hasIncomplete) {
        errors.meetTheTeam =
          "Each team member must have a Name, Position, and Image.";
      }
    }

    if (Object.keys(errors).length > 0) {
      setSectionErrors(errors);
      const sectionOrder = [
        "general",
        "about",
        "whatWeOffer",
        "hero",
        "gallery",
        "location",
        "ourHomesPage",
        "meetTheTeam",
        "meta",
      ];
      const firstError = sectionOrder.find((id) => errors[id]);
      if (firstError) {
        setActiveSection(firstError);
        const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
          general: generalRef,
          about: aboutRef,
          whatWeOffer: offerRef,
          hero: heroRef,
          gallery: galleryRef,
          location: locationRef,
          ourHomesPage: ourHomesRef,
          meetTheTeam: meetTheTeamRef,
          meta: metaRef,
        };
        refMap[firstError]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return;
    }

    setSectionErrors({});
    clearAll();
    startTransition(() => {
      formAction(new FormData(e.currentTarget as HTMLFormElement));
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="flex flex-col gap-3 relative -mb-10"
    >
      <input type="hidden" name="slug" value={general.slug} />
      <input type="hidden" name="isActive" value={String(isActive)} />
      <input type="hidden" name="order" value={String(order)} />

      <GeneralSection
        ref={generalRef}
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
        error={sectionErrors.general}
      />

      <AboutSection
        ref={aboutRef}
        facilitySlug={general.slug}
        aboutContent={aboutContent}
        setAboutContent={setAboutContent}
        aboutImage={aboutImage}
        setAboutImage={setAboutImage}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.about}
        onPendingAdd={addPending}
        onPendingRemove={removePending}
      />

      <WhatWeOfferSection
        ref={offerRef}
        facilitySlug={general.slug}
        whatWeOfferList={whatWeOfferContent}
        setWhatWeOfferList={setWhatWeOfferContent}
        whatWeOfferImage={whatWeOfferImage}
        setWhatWeOfferImage={setWhatWeOfferImage}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.whatWeOffer}
        onPendingAdd={addPending}
        onPendingRemove={removePending}
      />

      <MeetTheTeamSection
        ref={meetTheTeamRef}
        facilitySlug={general.slug}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.meetTheTeam}
        onPendingAdd={addPending}
        onPendingRemove={removePending}
      />

      <HeroSection
        ref={heroRef}
        facilitySlug={general.slug}
        heroSliderState={heroSliderState}
        setHeroSliderState={setHeroSliderState}
        heroDisplayMode={heroDisplayMode}
        setHeroDisplayMode={setHeroDisplayMode}
        heroLargeMp4={heroLargeMp4}
        setHeroLargeMp4={setHeroLargeMp4}
        heroLargeWebm={heroLargeWebm}
        setHeroLargeWebm={setHeroLargeWebm}
        heroSmallMp4={heroSmallMp4}
        setHeroSmallMp4={setHeroSmallMp4}
        heroSmallWebm={heroSmallWebm}
        setHeroSmallWebm={setHeroSmallWebm}
        heroPosterImage={heroPosterImage}
        setHeroPosterImage={setHeroPosterImage}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.hero}
        onPendingAdd={addPending}
        onPendingRemove={removePending}
      />

      <GallerySection
        ref={galleryRef}
        facilitySlug={general.slug}
        gallerySliderState={gallerySliderState}
        setGallerySliderState={setGallerySliderState}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.gallery}
        onPendingAdd={addPending}
        onPendingRemove={removePending}
      />

      <LocationSection
        ref={locationRef}
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
        error={sectionErrors.location}
        onPendingAdd={addPending}
        onPendingRemove={removePending}
      />

      <input
        type="hidden"
        name="ourHomesDescription"
        value={ourHomesDescription}
      />

      <OurHomesPageSection
        ref={ourHomesRef}
        ourHomesDescription={ourHomesDescription}
        setOurHomesDescription={setOurHomesDescription}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.ourHomesPage}
      />

      <MetaDataSection
        ref={metaRef}
        facilitySlug={general.slug}
        metaTitle={metaTitle}
        setMetaTitle={setMetaTitle}
        metaDescription={metaDescription}
        setMetaDescription={setMetaDescription}
        metaKeywords={metaKeywords}
        setMetaKeywords={setMetaKeywords}
        metaImages={metaImages}
        setMetaImages={setMetaImages}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.meta}
        onPendingAdd={addPending}
        onPendingRemove={removePending}
      />

      {state.error && <p className="text-error text-smallest">{state.error}</p>}

      <div className="sticky bottom-0 w-full left-0">
        <div className="bg-white/80 mx-auto w-full pt-5 pb-10">
          <ButtonType cssClasses="min-[500px]:self-start mt-2">
            Save Changes
          </ButtonType>
        </div>
      </div>
    </form>
  );
}
