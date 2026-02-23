"use client";

import { usePathname } from "next/navigation";
import classNames from "classnames";

import useScrollPosition from "@/_lib/utils/scroll-position";
import MobileHeader from "@/_components/navigation/mobile/mobile-header";
import DesktopHeader from "@/_components/navigation/desktop/desktop-header";
import { Facility } from "@/_types/facility-types";

interface Props {
  cssClasses?: string;
  facilities?: Facility[];
}

const Header = ({ cssClasses, facilities = [] }: Props) => {
  const currentRoute = usePathname();
  const scrollPosition = useScrollPosition();

  return (
    <header className={classNames("w-full sticky h-auto top-0 z-50", cssClasses)}>
      <MobileHeader
        currentRoute={currentRoute}
        scrollPosition={scrollPosition}
        cssClasses={cssClasses}
        facilities={facilities}
      />
      <DesktopHeader
        currentRoute={currentRoute}
        scrollPosition={scrollPosition}
        facilities={facilities}
      />
    </header>
  );
};

export default Header;
