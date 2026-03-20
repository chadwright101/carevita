import VideoHeroComponent from "@/_lib/utils/video-hero-component";
import classNames from "classnames";

interface Props {
  cssClasses?: string;
}

const Hero = ({ cssClasses }: Props) => {
  return (
    <section className={classNames(cssClasses)}>
      <VideoHeroComponent
        largeMp4="/assets/media/carevita-large-video.mp4"
        smallMp4="/assets/media/carevita-small-video.mp4"
        largeWebm="/assets/media/carevita-desktop-video.webm"
        smallWebm="/assets/media/carevita-mobile-video.webm"
        posterImage="/assets/media/video-poster-carevita.webp"
      />
    </section>
  );
};

export default Hero;
