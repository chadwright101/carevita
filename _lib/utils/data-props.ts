export interface DataProps {
  data: {
    general: {
      facilityName: string;
      facilityExtendedName?: string;
      cityTown: string;
      extendedLocation?: string;
      facilityEmail: string;
      facilityPhone: string;
      slug: string;
    };
    location: {
      description: string;
      locationImage: string;
      map: {
        lat: number;
        lng: number;
        zoom: number;
      };
    };
    whatWeOffer: {
      offerings: string;
      image: string;
      pampering?: Array<string>;
      weeklyActivities?: Array<string>;
    };
    about: {
      content: Array<string> | string;
      image: string;
    };
    meetTheTeam?: Array<{
      position: string;
      url: string;
      teamMember: string;
    }>;
    media: {
      heroSlider: Array<string>;
      gallerySlider: Array<string>;
      heroDisplayMode?: "slider" | "video";
      video?: {
        desktopMp4: string;
        mobileMp4: string;
        desktopWebm: string;
        mobileWebm: string;
        poster: string;
      };
    };
  };
}

export interface GeneralDataProps {
  data: {
    homePage: {
      about: {
        content: string;
      };
      ourHomesSliderHomePage: Array<string>;
    };
  };
}
