export interface FacilityGeneral {
  shortTitle: string;
  title: string;
  extendedTitle: string;
  location: string;
  extendedLocation: string;
  region: "WC" | "GP" | "EC";
  email: string;
  phone: string;
  homeUrl: string;
  slug: string;
  description: string;
  contactImage: string;
  map: { lat: number; lng: number; zoom: number };
  meta: { keywords: string; images: string[] };
}

export interface WhatWeOffer {
  list: string[];
  image: string;
  pampering?: string[];
  weeklyActivities?: string[];
}

export interface About {
  paragraphs: string[];
  image: string;
}

export interface TeamMember {
  position: string;
  url: string;
  teamMember: string;
}

export interface FacilityImages {
  heroSlider: string[];
  gallerySlider: string[];
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
  whatWeOffer: WhatWeOffer;
  about: About;
  meetTheTeam?: TeamMember[];
  images: FacilityImages;
  video?: FacilityVideo;
  order: number;
  isActive: boolean;
  timestamp: number;
}
