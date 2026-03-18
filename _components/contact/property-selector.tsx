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
    <div className="flex justify-between">
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
                "hover:scale-[102%] hover:-mb-2.5": !isSelected,
                "border-b-2 border-white pb-2 -mb-2.5": isSelected,
              },
            )}
            arrowCssClasses={classNames({
              hidden: !isSelected,
            })}
          />
        );
      })}
    </div>
  );
};

export default PropertySelector;
