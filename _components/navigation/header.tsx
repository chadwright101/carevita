"use client";

import { usePathname } from "next/navigation";
import classNames from "classnames";

import useScrollPosition from "@/_lib/utils/scroll-position";
import MobileHeader from "@/_components/navigation/mobile/mobile-header";
import DesktopHeader from "@/_components/navigation/desktop/desktop-header";

interface Props {
  cssClasses?: string;
}

const Header = ({ cssClasses }: Props) => {
  const currentRoute = usePathname();
  const scrollPosition = useScrollPosition();

  return (
    <header className={classNames("w-full sticky h-auto top-0 z-50", cssClasses)}>
      <MobileHeader
        currentRoute={currentRoute}
        scrollPosition={scrollPosition}
        cssClasses={cssClasses}
      />
      <DesktopHeader
        currentRoute={currentRoute}
        scrollPosition={scrollPosition}
      />
    </header>
  );
};

export default Header;
