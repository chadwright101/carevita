"use client";

import VideoHeroComponent from "@/_lib/utils/video-hero-component";
import GeneralSlider from "@/_components/sliders/general-slider";
import classNames from "classnames";
import { HomePage } from "@/_types/home-types";
import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

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
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  return (
    <section
      className={classNames(
        "relative max-w-[1280px] overflow-hidden tablet:mx-auto",
        cssClasses,
      )}
    >
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
      {mounted && (
        <div
          onTransitionEnd={() => !visible && setMounted(false)}
          className={classNames(
            "absolute bottom-0 left-0 p-3 bg-white/90 rounded-tr-xl transition-all duration-500 ease-in-out",
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0",
          )}
        >
          <button
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 tablet:top-3 tablet:right-3 desktop:top-4 desktop:right-4 desktop:hover:cursor-pointer desktop:hover:opacity-80 ease-in-out duration-300 z-10"
          >
            <X color="#134266" size={20} className="desktop:size-[16px]" />
          </button>
          <Image
            src="/assets/media/carevita-mothers-day-logo.png"
            alt="CareVita Mother's Day logo"
            width={230}
            height={230}
            className="w-[150px] h-auto phone:w-[230px] animate-pulse-scale"
          />
        </div>
      )}
    </section>
  );
};

export default Hero;
