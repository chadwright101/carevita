import { useContext } from "react";

import WindowWidthContext from "@/components/utils/window-width-context";

interface Props {
  cssClasses?: string;
}

const Hero = ({ cssClasses }: Props) => {
  const { windowWidth } = useContext(WindowWidthContext);
  return (
    <section className={`${cssClasses}`}>
      {windowWidth <= 650 && (
        <video
          autoPlay
          muted
          loop
          className="w-full h-[450px] tabletLarge:h-[600px] object-cover desktop:max-w-[1400px] mx-auto"
          poster="/assets/media/video-poster-carevita.webp"
          playsInline
        >
          <source src="/assets/media/carevita-mobile-video.webm" />
          <source src="/assets/media/carevita-mobile-video.mp4" />
        </video>
      )}
      {windowWidth > 650 && (
        <video
          autoPlay
          muted
          loop
          className="w-full h-[450px] tabletLarge:h-[600px] object-cover desktop:max-w-[1400px] mx-auto"
          poster="/assets/media/video-poster-carevita.webp"
          playsInline
        >
          <source src="/assets/media/carevita-desktop-video.webm" />
          <source src="/assets/media/carevita-desktop-video.mp4" />
        </video>
      )}
    </section>
  );
};

export default Hero;
