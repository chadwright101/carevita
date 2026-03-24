"use client";

import {
  useState,
  useActionState,
  useRef,
  useTransition,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { createFacility } from "@/_actions/admin-facilities-actions";
import {
  facilityGeneralSchema,
  facilityLocationSchema,
} from "@/_lib/validation/facility-schema";
import ButtonType from "@/_components/ui/button-type";
import { TeamMember } from "@/_types/facility-types";
import GeneralSection from "./edit-form/general-section";
import AboutSection from "./edit-form/about-section";
import WhatWeOfferSection from "./edit-form/what-we-offer-section";
import MeetTheTeamSection from "./edit-form/meet-the-team-section";
import HeroSection from "./edit-form/hero-section";
import GallerySection from "./edit-form/gallery-section";
import LocationSection from "./edit-form/location-section";
import OurHomesPageSection from "./edit-form/our-homes-page-section";
import MetaDataSection from "./edit-form/metadata-section";

const initialState = { success: false, error: "" };

export default function FacilityAddForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(createFacility, initialState);
  const [, startTransition] = useTransition();
  const [activeSection, setActiveSection] = useState("general");

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

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
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [whatWeOfferImage, setWhatWeOfferImage] = useState("");
  const [whatWeOfferContent, setWhatWeOfferContent] = useState("");
  const [aboutImage, setAboutImage] = useState("");
  const [aboutContent, setAboutContent] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [heroSliderState, setHeroSliderState] = useState<string[]>([]);
  const [gallerySliderState, setGallerySliderState] = useState<string[]>([]);
  const [heroDisplayMode, setHeroDisplayMode] = useState<"slider" | "video">(
    "slider",
  );
  const [heroLargeMp4, setHeroLargeMp4] = useState("");
  const [heroLargeWebm, setHeroLargeWebm] = useState("");
  const [heroSmallMp4, setHeroSmallMp4] = useState("");
  const [heroSmallWebm, setHeroSmallWebm] = useState("");
  const [heroPosterImage, setHeroPosterImage] = useState("");
  const [metaImages, setMetaImages] = useState<string[]>([]);
  const [ourHomesDescription, setOurHomesDescription] = useState("");
  const [mapLat, setMapLat] = useState("");
  const [mapLng, setMapLng] = useState("");

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

  const slug = title.toLowerCase().replace(/\s+/g, "-");

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
      slug,
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

    if (heroDisplayMode === "slider" && heroSliderState.length === 0) {
      errors.hero = "Please add images to this section - Hero Slider.";
    }
    if (heroDisplayMode === "video" && (!heroLargeMp4 || !heroPosterImage)) {
      errors.hero = "Please add a video to this section - Hero Video.";
    }
    if (gallerySliderState.length === 0) {
      errors.gallery = "Please add images to this section - Gallery Slider.";
    }

    const lat = parseFloat(mapLat);
    const lng = parseFloat(mapLng);
    const locationResult = facilityLocationSchema.safeParse({
      description,
      locationImage: contactImage,
      map: { lat, lng, zoom: 13.75 },
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
        };
        refMap[firstError]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return;
    }

    setSectionErrors({});
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
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="isActive" value="true" />
      <input type="hidden" name="order" value="0" />

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
        facilitySlug={slug}
        aboutContent={aboutContent}
        setAboutContent={setAboutContent}
        aboutImage={aboutImage}
        setAboutImage={setAboutImage}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.about}
      />

      <WhatWeOfferSection
        ref={offerRef}
        facilitySlug={slug}
        whatWeOfferList={whatWeOfferContent}
        setWhatWeOfferList={setWhatWeOfferContent}
        whatWeOfferImage={whatWeOfferImage}
        setWhatWeOfferImage={setWhatWeOfferImage}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.whatWeOffer}
      />

      <MeetTheTeamSection
        ref={meetTheTeamRef}
        facilitySlug={slug}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.meetTheTeam}
      />

      <HeroSection
        ref={heroRef}
        facilitySlug={slug}
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
      />

      <GallerySection
        ref={galleryRef}
        facilitySlug={slug}
        gallerySliderState={gallerySliderState}
        setGallerySliderState={setGallerySliderState}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.gallery}
      />

      <LocationSection
        ref={locationRef}
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
        error={sectionErrors.location}
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
        facilitySlug={slug}
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
      />

      {state.error && <p className="text-error text-smallest">{state.error}</p>}
      {state.success && (
        <p className="text-green text-smallest">Facility created</p>
      )}

      <div className="sticky bottom-0 w-full left-0">
        <div className="bg-white/80 mx-auto w-full pt-5 pb-10">
          <ButtonType cssClasses="min-[500px]:self-start mt-2">
            Create Facility
          </ButtonType>
        </div>
      </div>
    </form>
  );
}
