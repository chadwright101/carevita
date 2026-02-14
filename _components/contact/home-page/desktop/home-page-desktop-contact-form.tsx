"use client";

import { PROPERTIES } from "@/_lib/properties-config";
import PropertySelector from "@/_components/contact/property-selector";
import PropertyContactForm from "@/_components/contact/property-contact-form";
import { useContactForm } from "@/_lib/hooks/use-contact-form";

const HomePageDesktopContactForm = () => {
  const {
    selectedPropertyId,
    selectedProperty,
    formState,
    handlePropertySelect,
    handleSubmit,
  } = useContactForm();

  return (
    <div className="hidden desktop:block max-w-[1280px] mx-auto">
      <p className="text-white mb-10 pb-10 border-b border-white">
        Please select which facility you&#39;d like to get in touch with...
      </p>

      <PropertySelector
        properties={PROPERTIES}
        selectedPropertyId={selectedPropertyId}
        onPropertySelect={handlePropertySelect}
      />

      {selectedProperty && (
        <PropertyContactForm
          property={selectedProperty}
          formState={formState}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default HomePageDesktopContactForm;
