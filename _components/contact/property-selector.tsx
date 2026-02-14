import PropertySelectorButton from "@/_components/ui/property-selector-button";
import { PropertyConfig } from "@/_lib/properties-config";
import classNames from "classnames";

interface PropertySelectorProps {
  properties: PropertyConfig[];
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
      {properties.map((property) => {
        const isSelected = selectedPropertyId === property.id;

        return (
          <PropertySelectorButton
            key={property.id}
            onClick={() => onPropertySelect(property.id)}
            extendedTitle={property.data.general.title}
            location={property.data.general.location}
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
            homeIconUrl={property.icon.url}
            homeIconAlt={property.icon.alt}
          />
        );
      })}
    </div>
  );
};

export default PropertySelector;
