"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { HomePage } from "@/_types/home-types";
import { updateHomeContent } from "@/_actions/admin-home-actions";
import {
  homeAboutSchema,
  homeContactSchema,
  homeServicesSchema,
} from "@/_lib/validation/home-schema";
import ButtonType from "@/_components/ui/button-type";
import AboutSection from "@/_components/user/dashboard/home-content/edit-form/about-section";
import ServicesSection from "@/_components/user/dashboard/home-content/edit-form/services-section";
import ContactSection from "@/_components/user/dashboard/home-content/edit-form/contact-section";
import GallerySection from "@/_components/user/dashboard/home-content/edit-form/gallery-section";
import HeroSection from "@/_components/user/dashboard/home-content/edit-form/hero-section";
import MetaDataSection from "@/_components/user/dashboard/home-content/edit-form/metadata-section";
import { usePendingUploads } from "@/_hooks/use-pending-uploads";

interface Props {
  homeContent: HomePage;
}

const initialState = { success: false, error: "" };

export default function HomeEditForm({ homeContent }: Props) {
  const [state, formAction] = useActionState(updateHomeContent, initialState);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const { addPending, removePending, clearAll } = usePendingUploads();

  useEffect(() => {
    if (state.success) {
      clearAll();
      router.push("/dashboard");
    }
  }, [state.success, router]);

  const [aboutContent, setAboutContent] = useState(
    homeContent.about.content ?? "",
  );
  const [aboutImage1, setAboutImage1] = useState(
    homeContent.about.image1 ?? "",
  );
  const [aboutImage2, setAboutImage2] = useState(
    homeContent.about.image2 ?? "",
  );
  const [services, setServices] = useState(homeContent.services ?? []);
  const [sliderImages, setSliderImages] = useState(
    homeContent.ourHomesSliderHomePage ?? [],
  );
  const [heroSliderState, setHeroSliderState] = useState(
    homeContent.heroSlider ?? [],
  );
  const [heroDisplayMode, setHeroDisplayMode] = useState<"slider" | "video">(
    homeContent.heroDisplayMode ?? "slider",
  );
  const [heroLargeMp4, setHeroLargeMp4] = useState(
    homeContent.heroLargeMp4 ?? "",
  );
  const [heroLargeWebm, setHeroLargeWebm] = useState(
    homeContent.heroLargeWebm ?? "",
  );
  const [heroSmallMp4, setHeroSmallMp4] = useState(
    homeContent.heroSmallMp4 ?? "",
  );
  const [heroSmallWebm, setHeroSmallWebm] = useState(
    homeContent.heroSmallWebm ?? "",
  );
  const [heroPosterImage, setHeroPosterImage] = useState(
    homeContent.heroPosterImage ?? "",
  );
  const [heroOverlayLogo, setHeroOverlayLogo] = useState(
    homeContent.heroOverlayLogo ?? "",
  );
  const [contactGeneral, setContactGeneral] = useState(
    homeContent.contact.general ?? "",
  );
  const [contactAccounts, setContactAccounts] = useState(
    homeContent.contact.accounts ?? "",
  );
  const [metaKeywords, setMetaKeywords] = useState(
    homeContent.meta?.keywords ?? "",
  );
  const [metaTitle, setMetaTitle] = useState(homeContent.meta?.title ?? "");
  const [metaDescription, setMetaDescription] = useState(homeContent.meta?.description ?? "");
  const [metaImages, setMetaImages] = useState(
    homeContent.meta?.images ?? [],
  );
  const [activeSection, setActiveSection] = useState("hero");
  const [sectionErrors, setSectionErrors] = useState<Record<string, string>>(
    {},
  );

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const sectionRefMap: Record<
    string,
    React.RefObject<HTMLDivElement | null>
  > = {
    hero: heroRef,
    about: aboutRef,
    services: servicesRef,
    contact: contactRef,
    slider: sliderRef,
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

    if (heroDisplayMode === "slider" && heroSliderState.length === 0) {
      errors.hero = "Please add at least one image to the Hero Slider.";
    } else if (heroDisplayMode === "video" && !heroLargeMp4 && !heroPosterImage) {
      errors.hero = "Hero Video requires a Large MP4 and Poster Image.";
    } else if (heroDisplayMode === "video" && !heroLargeMp4) {
      errors.hero = "Hero Video requires a Large MP4.";
    } else if (heroDisplayMode === "video" && !heroPosterImage) {
      errors.hero = "Hero Video requires a Poster Image.";
    }

    const aboutResult = homeAboutSchema.safeParse({
      content: aboutContent,
      image1: aboutImage1,
      image2: aboutImage2,
    });
    if (!aboutResult.success) {
      const fields: string[] = [];
      for (const issue of aboutResult.error.issues) {
        const field = issue.path[0];
        if (field === "content" && !fields.includes("Content"))
          fields.push("Content");
        else if (field === "image1" && !fields.includes("Image 1"))
          fields.push("Image 1");
        else if (field === "image2" && !fields.includes("Image 2"))
          fields.push("Image 2");
      }
      errors.about = `Please complete all required fields in this section - ${fields.join(", ")}.`;
    }

    const servicesResult = homeServicesSchema.safeParse(services);
    if (!servicesResult.success) {
      errors.services =
        "Please ensure there are between 3 and 5 services, each with a heading, description, and image.";
    }

    if (sliderImages.length < 7 || sliderImages.length > 20) {
      errors.slider = "Gallery requires between 7 and 20 images.";
    }

    const contactResult = homeContactSchema.safeParse({
      general: contactGeneral,
      accounts: contactAccounts,
    });
    if (!contactResult.success) {
      const fields: string[] = [];
      for (const issue of contactResult.error.issues) {
        const field = issue.path[0];
        if (field === "general" && !fields.includes("General Email"))
          fields.push("General Email");
        else if (field === "accounts" && !fields.includes("Accounts Email"))
          fields.push("Accounts Email");
      }
      errors.contact = `Please complete all required fields in this section - ${fields.join(", ")}.`;
    }

    const metaFields: string[] = [];
    if (!metaTitle) metaFields.push("Meta Title");
    if (!metaDescription) metaFields.push("Meta Description");
    if (metaFields.length > 0) {
      errors.meta = `Please complete all required fields in this section - ${metaFields.join(", ")}.`;
    }

    if (Object.keys(errors).length > 0) {
      setSectionErrors(errors);
      const sectionOrder = ["hero", "about", "services", "contact", "slider", "meta"];
      const firstError = sectionOrder.find((id) => errors[id]);
      if (firstError) {
        setActiveSection(firstError);
        sectionRefMap[firstError]?.current?.scrollIntoView({
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
      <HeroSection
        ref={heroRef}
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
        heroOverlayLogo={heroOverlayLogo}
        setHeroOverlayLogo={setHeroOverlayLogo}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.hero}
        onPendingAdd={addPending}
        onPendingRemove={removePending}
      />

      <AboutSection
        ref={aboutRef}
        aboutContent={aboutContent}
        setAboutContent={setAboutContent}
        aboutImage1={aboutImage1}
        setAboutImage1={setAboutImage1}
        aboutImage2={aboutImage2}
        setAboutImage2={setAboutImage2}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.about}
        onPendingAdd={addPending}
        onPendingRemove={removePending}
      />

      <ServicesSection
        ref={servicesRef}
        services={services}
        setServices={setServices}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.services}
        onPendingAdd={addPending}
        onPendingRemove={removePending}
      />

      <GallerySection
        ref={sliderRef}
        images={sliderImages}
        setImages={setSliderImages}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.slider}
        onPendingAdd={addPending}
        onPendingRemove={removePending}
      />

      <ContactSection
        ref={contactRef}
        contactGeneral={contactGeneral}
        setContactGeneral={setContactGeneral}
        contactAccounts={contactAccounts}
        setContactAccounts={setContactAccounts}
        activeSection={activeSection}
        toggleSection={toggleSection}
        error={sectionErrors.contact}
      />

      <MetaDataSection
        ref={metaRef}
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
          {state.success && (
            <p className="text-green text-smallest mb-2">Saved successfully</p>
          )}
          <ButtonType cssClasses="min-[500px]:self-start mt-2">
            Save Changes
          </ButtonType>
        </div>
      </div>
    </form>
  );
}
