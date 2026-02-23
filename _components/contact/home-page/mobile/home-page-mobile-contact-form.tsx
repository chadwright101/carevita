"use client";

import { PROPERTIES } from "@/_lib/properties-config";
import MobilePropertySelector from "@/_components/contact/mobile-property-selector";
import MobilePropertyContactForm from "@/_components/contact/mobile-property-contact-form";
import { useContactForm } from "@/_lib/hooks/use-contact-form";

const HomePageMobileContactForm = () => {
  const {
    selectedPropertyId,
    selectedProperty,
    handlePropertySelect,
    handleBack,
  } = useContactForm();

  return (
    <div className="desktop:hidden">
      <p className="text-white mb-8">
        Please select which facility you&#39;d like to get in touch with...
      </p>

      {!selectedPropertyId && (
        <MobilePropertySelector
          properties={PROPERTIES}
          selectedPropertyId={selectedPropertyId}
          onPropertySelect={handlePropertySelect}
        />
      )}

      {selectedProperty && (
        <div className="mt-10 max-w-[1280px] mx-auto">
          <MobilePropertyContactForm
            key={selectedProperty.id}
            property={selectedProperty}
            onBack={handleBack}
          />
        </div>
      )}
    </div>
  );
};

export default HomePageMobileContactForm;
