"use client";

import PropertySelector from "@/_components/contact/property-selector";
import PropertyContactForm from "@/_components/contact/property-contact-form";
import { useContactForm } from "@/_lib/hooks/use-contact-form";
import { FacilityNavigation } from "@/_types/facility-types";

interface Props {
  facilities: FacilityNavigation[];
}

const HomePageDesktopContactForm = ({ facilities }: Props) => {
  const { selectedPropertyId, selectedProperty, handlePropertySelect } =
    useContactForm(facilities);

  return (
    <div className="hidden desktop:block max-w-[1280px] mx-auto">
      <p className="text-white mb-10 pb-10 border-b border-white">
        Please select which facility you&#39;d like to get in touch with...
      </p>

      <PropertySelector
        properties={facilities}
        selectedPropertyId={selectedPropertyId}
        onPropertySelect={handlePropertySelect}
      />

      {selectedProperty && (
        <PropertyContactForm
          key={selectedProperty.slug}
          property={selectedProperty}
        />
      )}
    </div>
  );
};

export default HomePageDesktopContactForm;
