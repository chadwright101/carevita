"use client";

import MobilePropertySelector from "@/_components/contact/mobile-property-selector";
import MobilePropertyContactForm from "@/_components/contact/mobile-property-contact-form";
import { useContactForm } from "@/_lib/hooks/use-contact-form";
import { FacilityNavigation } from "@/_types/facility-types";

interface Props {
  facilities: FacilityNavigation[];
}

const HomePageMobileContactForm = ({ facilities }: Props) => {
  const {
    selectedPropertyId,
    selectedProperty,
    handlePropertySelect,
    handleBack,
  } = useContactForm(facilities);

  return (
    <div className="desktop:hidden">
      <p className="text-white mb-8">
        Please select which facility you&#39;d like to get in touch with...
      </p>

      {!selectedPropertyId && (
        <MobilePropertySelector
          properties={facilities}
          selectedPropertyId={selectedPropertyId}
          onPropertySelect={handlePropertySelect}
        />
      )}

      {selectedProperty && (
        <div className="mt-10 max-w-[1280px] mx-auto">
          <MobilePropertyContactForm
            key={selectedProperty.slug}
            property={selectedProperty}
            onBack={handleBack}
          />
        </div>
      )}
    </div>
  );
};

export default HomePageMobileContactForm;
