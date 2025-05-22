import VideoHeroComponent from "@/components/utils/video-hero-component";

interface Props {
  cssClasses?: string;
}

const Hero = ({ cssClasses }: Props) => {
  return (
    <section className={`${cssClasses}`}>
      <VideoHeroComponent
        desktopMp4="/assets/media/carevita-desktop-video.mp4"
        mobileMp4="/assets/media/carevita-mobile-video.mp4"
        desktopWebm="/assets/media/carevita-desktop-video.webm"
        mobileWebm="/assets/media/carevita-mobile-video.webm"
        poster="/assets/media/video-poster-carevita.webp"
      />
    </section>
  );
};

export default Hero;
