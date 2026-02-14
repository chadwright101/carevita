import crescentData from "@/_data/crescent-data.json";
import eastlandsData from "@/_data/eastlands-data.json";
import sereneData from "@/_data/serene-data.json";
import parsonageData from "@/_data/parsonage-data.json";
import hartlandData from "@/_data/hartland-data.json";

export interface PropertyConfig {
  id: string;
  data: {
    general: {
      title: string;
      location: string;
    };
  };
  icon: {
    url: string;
    alt: string;
  };
  contactImage: {
    src: string;
    alt: string;
  };
}

export const PROPERTIES: PropertyConfig[] = [
  {
    id: "hartland",
    data: hartlandData,
    icon: { url: "/assets/icons/spa-white.svg", alt: "Cottage icon" },
    contactImage: {
      src: "/assets/media/hartland-estate/hartland-lifestyle-estate-1.jpg",
      alt: "Contact Hartland Estate",
    },
  },
  {
    id: "crescent",
    data: crescentData,
    icon: { url: "/assets/icons/beach-white.svg", alt: "Beach umbrella icon" },
    contactImage: {
      src: "/assets/media/the-crescent/Crescent-5.jpg",
      alt: "Contact The Crescent",
    },
  },
  {
    id: "eastlands",
    data: eastlandsData,
    icon: { url: "/assets/icons/flower-white.svg", alt: "Flower icon" },
    contactImage: {
      src: "/assets/media/eastlands/9U7A4633-HDR.jpg",
      alt: "Contact Eastlands",
    },
  },
  {
    id: "serene",
    data: sereneData,
    icon: { url: "/assets/icons/leaves-white.svg", alt: "Leaves icon" },
    contactImage: {
      src: "/assets/media/serene-park/9U7A5003-HDR.jpg",
      alt: "Contact Serene Park",
    },
  },
  {
    id: "parsonage",
    data: parsonageData,
    icon: { url: "/assets/icons/sun-white.svg", alt: "Sun icon" },
    contactImage: {
      src: "/assets/media/parsonage-street/9U7A3468.jpg",
      alt: "Contact Parsonage Street",
    },
  },
];
