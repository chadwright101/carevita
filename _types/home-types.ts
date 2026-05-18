export interface Service {
  title: string;
  description: string;
  image: string;
}

export interface HomePage {
  meta: { title: string; description: string; keywords: string; images: string[] };
  about: { content: string; image1: string; image2: string };
  ourHomesSliderHomePage: string[];
  heroDisplayMode: "slider" | "video";
  heroSlider: string[];
  heroLargeMp4: string;
  heroLargeWebm: string;
  heroSmallMp4: string;
  heroSmallWebm: string;
  heroPosterImage: string;
  heroOverlayLogo: string;
  services: Service[];
  contact: { general: string; accounts: string };
}

export interface SiteContent {
  homePage: HomePage;
}
