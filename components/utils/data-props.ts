export interface DataProps {
  data: {
    general: {
      title: string;
      extendedTitle: string;
      location: string;
      extendedLocation?: string;
      email: string;
      phone: string;
      homeUrl: string;
      description?: string;
    };
    whatWeOffer: {
      list: Array<string>;
      image: string;
      pampering: Array<string>;
      weeklyActivities: Array<string>;
    };
    about: {
      paragraphs: Array<string>;
      image: string;
    };
    meetTheTeam: Array<{
      position: string;
      url: string;
      teamMember: string;
    }>;
    images: {
      heroSlider: Array<string>;
      gallerySlider: Array<string>;
    };
  };
}

export interface GeneralDataProps {
  data: {
    homePage: {
      about: {
        paragraphs: Array<string>;
        list: Array<string>;
      };
      ourHomesSliderHomePage: Array<string>;
    };
  };
}
