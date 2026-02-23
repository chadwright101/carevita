export interface showContactProps {
  buttonClasses?: string;
  linkClasses?: string;
}

export interface ShowEmailAddressProps {
  buttonClasses?: string;
  linkClasses?: string;
  property: string;
  blackText?: boolean;
}

export interface ShowPhoneNumberProps {
  buttonClasses?: string;
  linkClasses?: string;
  property: string;
  blackText?: boolean;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface HomePage {
  about: { paragraphs: string[]; list: string[] };
  ourHomesSliderHomePage: string[];
  services: Service[];
  contact: { general: string; accounts: string };
}

export interface SiteContent {
  homePage: HomePage;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  error?: string;
  data?: T;
}
