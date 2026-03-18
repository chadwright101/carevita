export interface FacilityGeneral {
  facilityName: string;
  facilityExtendedName?: string;
  cityTown: string;
  extendedLocation: string;
  province: "EC" | "FS" | "GP" | "KZN" | "LP" | "MP" | "NC" | "NW" | "WC";
  facilityEmail: string;
  facilityPhone: string;
  slug: string;
}

export interface FacilityLocation {
  description: string;
  locationImage: string;
  map: {
    lat: number;
    lng: number;
    zoom: number;
  };
}

export interface FacilityMeta {
  keywords: string;
  images: string[];
}

export interface FacilityOurHomesPage {
  description: string;
}

export interface FacilityWhatWeOffer {
  offerings: string;
  image: string;
  pampering?: string[];
  weeklyActivities?: string[];
}

export interface FacilityAbout {
  content: string;
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
  video?: {
    desktopMp4: string;
    mobileMp4: string;
    desktopWebm: string;
    mobileWebm: string;
    poster: string;
  };
}

export interface Facility {
  general: FacilityGeneral;
  location: FacilityLocation;
  meta: FacilityMeta;
  ourHomesPage: FacilityOurHomesPage;
  whatWeOffer: FacilityWhatWeOffer;
  about: FacilityAbout;
  meetTheTeam?: TeamMember[];
  media: FacilityMedia;
  order: number;
  isActive: boolean;
  timestamp: number;
}

export interface FacilityNavigation {
  slug: string;
  cityTown: string;
  hasStaff: boolean;
  facilityName: string;
  facilityExtendedName: string;
  extendedLocation: string;
  description: string;
  featuredImage: string;
  locationImage: string;
  province: "WC" | "GP" | "EC" | "KZN" | "LP" | "MP" | "NW" | "FS" | "NC";
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
