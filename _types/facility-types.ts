export interface FacilityGeneral {
  title: string;
  extendedTitle?: string;
  location: string;
  extendedLocation: string;
  region: "EC" | "FS" | "GP" | "KZN" | "LP" | "MP" | "NC" | "NW" | "WC";
  email: string;
  phone: string;
  homeUrl: string;
  slug: string;
  description: string;
  ourHomesDescription?: string;
  contactImage: string;
  map: {
    lat: number;
    lng: number;
    zoom: number;
  };
  meta: {
    keywords: string;
    images: string[];
  };
}

export interface FacilityWhatWeOffer {
  list: string;
  image: string;
  pampering?: string[];
  weeklyActivities?: string[];
}

export interface FacilityAbout {
  paragraphs: string;
  image: string;
}

export interface TeamMember {
  position: string;
  url: string;
  teamMember: string;
}

export interface FacilityMedia {
  heroSlider: string[];
  gallerySlider: string[];
  heroDisplayMode?: "slider" | "video";
}

export interface FacilityVideo {
  desktopMp4: string;
  mobileMp4: string;
  desktopWebm: string;
  mobileWebm: string;
  poster: string;
}

export interface Facility {
  general: FacilityGeneral;
  whatWeOffer: FacilityWhatWeOffer;
  about: FacilityAbout;
  meetTheTeam?: TeamMember[];
  media: FacilityMedia;
  video?: FacilityVideo;
  order: number;
  isActive: boolean;
  timestamp: number;
}

export interface FacilityNavigation {
  slug: string;
  location: string;
  homeUrl: string;
  hasStaff: boolean;
  title: string;
  extendedTitle: string;
  extendedLocation: string;
  description: string;
  featuredImage: string;
  contactImage: string;
  region: "WC" | "GP" | "EC" | "KZN" | "LP" | "MP" | "NW" | "FS" | "NC";
  order: number;
  isActive: boolean;
}

export interface HomePageContent {
  about: {
    content: string;
  };
  ourHomesSliderHomePage: string[];
  services: Array<{
    title: string;
    description: string;
    icon: string;
    image: string;
  }>;
  contact: {
    general: string;
    accounts: string;
  };
}
