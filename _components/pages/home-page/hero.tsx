import VideoHeroComponent from "@/_lib/utils/video-hero-component";
import GeneralSlider from "@/_components/sliders/general-slider";
import classNames from "classnames";
import { HomePage } from "@/_types/home-types";

interface Props {
  cssClasses?: string;
  heroDisplayMode: HomePage["heroDisplayMode"];
  heroSlider: HomePage["heroSlider"];
  heroLargeMp4: HomePage["heroLargeMp4"];
  heroLargeWebm: HomePage["heroLargeWebm"];
  heroSmallMp4: HomePage["heroSmallMp4"];
  heroSmallWebm: HomePage["heroSmallWebm"];
  heroPosterImage: HomePage["heroPosterImage"];
}

const Hero = ({
  cssClasses,
  heroDisplayMode,
  heroSlider,
  heroLargeMp4,
  heroLargeWebm,
  heroSmallMp4,
  heroSmallWebm,
  heroPosterImage,
}: Props) => {
  return (
    <section className={classNames(cssClasses)}>
      {heroDisplayMode === "video" ? (
        <VideoHeroComponent
          largeMp4={heroLargeMp4}
          smallMp4={heroSmallMp4}
          largeWebm={heroLargeWebm}
          smallWebm={heroSmallWebm}
          posterImage={heroPosterImage}
        />
      ) : (
        <GeneralSlider imageList={heroSlider} homeName="Carevita" />
      )}
    </section>
  );
};

export default Hero;
