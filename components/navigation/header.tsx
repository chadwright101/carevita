import { useRouter } from "next/router";

import useScrollPosition from "@/components/utils/scroll-position";
import MobileHeader from "@/components/navigation/mobile/mobile-header";
import DesktopHeader from "@/components/navigation/desktop/desktop-header";

interface Props {
  cssClasses?: string;
}

const Header = ({ cssClasses }: Props) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const scrollPosition = useScrollPosition();

  return (
    <header className={`w-full sticky h-auto top-0 z-10 ${cssClasses}`}>
      <MobileHeader currentRoute={currentRoute} scrollPosition={scrollPosition} cssClasses={cssClasses} />
      <DesktopHeader currentRoute={currentRoute} scrollPosition={scrollPosition} />
    </header>
  );
};

export default Header;
