import PropertySelectorButton from "@/_components/ui/property-selector-button";
import { FacilityNavigation } from "@/_types/facility-types";
import classNames from "classnames";

interface PropertySelectorProps {
  properties: FacilityNavigation[];
  selectedPropertyId: string | null;
  onPropertySelect: (id: string) => void;
}

const PropertySelector = ({
  properties,
  selectedPropertyId,
  onPropertySelect,
}: PropertySelectorProps) => {
  return (
    <div className="grid grid-cols-5 gap-x-10 gap-y-5 justify-between pb-7 border-b border-white">
      {properties.map((facility) => {
        const isSelected = selectedPropertyId === facility.slug;

        return (
          <PropertySelectorButton
            key={facility.slug}
            onClick={() => onPropertySelect(facility.slug)}
            extendedTitle={facility.facilityName}
            location={facility.cityTown}
            cssClasses={classNames(
              "text-left transition-transform duration-300 delay-75 desktop:hover:cursor-pointer",
              {
                "hover:scale-[102%]": !isSelected,
                "border-b-2 border-white pb-2": isSelected,
              },
            )}
          />
        );
      })}
    </div>
  );
};

export default PropertySelector;
