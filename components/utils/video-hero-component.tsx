import { useContext } from "react";

import WindowWidthContext from "@/components/utils/window-width-context";

interface Props {
  desktopMp4: string;
  mobileMp4: string;
  desktopWebm: string;
  mobileWebm: string;
  poster: string;
}

const VideoHeroComponent = ({
  desktopMp4,
  mobileMp4,
  desktopWebm,
  mobileWebm,
  poster,
}: Props) => {
  const { windowWidth } = useContext(WindowWidthContext);
  return (
    <>
      {windowWidth <= 650 && (
        <video
          autoPlay
          muted
          loop
          className="w-full h-[450px] tabletLarge:h-[600px] object-cover desktop:max-w-[1400px] mx-auto"
          poster={poster}
          playsInline
        >
          <source src={mobileWebm} />
          <source src={mobileMp4} />
        </video>
      )}
      {windowWidth > 650 && (
        <video
          autoPlay
          muted
          loop
          className="w-full h-[450px] tabletLarge:h-[600px] object-cover desktop:max-w-[1400px] mx-auto"
          poster={poster}
          playsInline
        >
          <source src={desktopWebm} />
          <source src={desktopMp4} />
        </video>
      )}
    </>
  );
};

export default VideoHeroComponent;
