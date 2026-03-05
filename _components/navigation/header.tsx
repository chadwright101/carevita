"use client";

import { usePathname } from "next/navigation";
import classNames from "classnames";

import useScrollPosition from "@/_lib/utils/scroll-position";
import MobileHeader from "@/_components/navigation/mobile/mobile-header";
import DesktopHeader from "@/_components/navigation/desktop/desktop-header";
import { FacilityNavigation } from "@/_types/facility-types";

interface Props {
  cssClasses?: string;
  facilities: FacilityNavigation[];
  isLoggedIn: boolean;
}

const Header = ({ cssClasses, facilities, isLoggedIn }: Props) => {
  const currentRoute = usePathname();
  const scrollPosition = useScrollPosition();

  return (
    <header className={classNames("w-full sticky h-auto top-0 z-50", cssClasses)}>
      <MobileHeader
        currentRoute={currentRoute}
        scrollPosition={scrollPosition}
        cssClasses={cssClasses}
        facilities={facilities}
        isLoggedIn={isLoggedIn}
      />
      <DesktopHeader
        currentRoute={currentRoute}
        scrollPosition={scrollPosition}
        facilities={facilities}
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
};

export default Header;
