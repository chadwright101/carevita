import PropertySelectorButton from "@/_components/ui/property-selector-button";
import { FacilityNavigation } from "@/_types/facility-types";

interface MobilePropertySelectorProps {
  properties: FacilityNavigation[];
  selectedPropertyId: string | null;
  onPropertySelect: (id: string) => void;
}

const MobilePropertySelector = ({
  properties,
  selectedPropertyId,
  onPropertySelect,
}: MobilePropertySelectorProps) => {
  const showButtons = !selectedPropertyId;

  return (
    <div className="mt-10 flex flex-col gap-10 max-w-[1280px] mx-auto">
      {properties.map((facility) => {
        if (showButtons) {
          return (
            <PropertySelectorButton
              key={facility.slug}
              mobile
              onClick={() => onPropertySelect(facility.slug)}
              cssClasses="text-left"
              extendedTitle={facility.facilityName}
              location={facility.cityTown}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default MobilePropertySelector;
