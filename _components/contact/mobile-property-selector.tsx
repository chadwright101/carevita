import PropertySelectorButton from "@/_components/ui/property-selector-button";
import { PropertyConfig } from "@/_lib/properties-config";

interface MobilePropertySelectorProps {
  properties: PropertyConfig[];
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
      {properties.map((property) => {
        if (showButtons) {
          return (
            <PropertySelectorButton
              key={property.id}
              mobile
              onClick={() => onPropertySelect(property.id)}
              cssClasses="text-left"
              extendedTitle={property.data.general.title}
              location={property.data.general.location}
              homeIconUrl={property.icon.url.replace("-white.svg", "-blue.svg")}
              homeIconAlt={property.icon.alt}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default MobilePropertySelector;
