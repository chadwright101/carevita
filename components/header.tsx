import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import mobileMenuList from "../data/navigation/mobile-menu.json";

import logo from "public/carevita-logo.png";
import menuIcon from "public/icons/menu-icon.svg";
import closeIcon from "public/icons/close-icon.svg";

interface Props {
  cssClasses?: string;
}

const Header = ({ cssClasses }: Props) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className={`${cssClasses}`}>
      {/* mobile nav */}
      <div className="fixed w-full flex justify-between items-center px-5 py-4 border-b-2 border-black drop-shadow-md bg-white">
        <Link href="/" className="p-2 -m-2">
          <Image src={logo} alt="CareVita logo" className="w-20 h-auto" />
        </Link>
        <button className="p-2 -m-2" onClick={() => setToggleMenu(true)}>
          <Image src={menuIcon} alt="Menu icon" className="w-10 h-auto" />
        </button>
      </div>
      {toggleMenu && (
        <nav className="fixed top-0 h-screen w-full bg-blue pt-8 px-5">
          <ul className="mt-10 flex flex-col gap-4">
            {mobileMenuList.map(({ title, url }, index) => (
              <>
                <li key={index}>
                  <Link
                    href={url}
                    onClick={() => setToggleMenu(false)}
                    className="text-white text-subheading p-3 -m-3"
                  >
                    {title}
                  </Link>
                </li>
                {index < mobileMenuList.length - 1 && (
                  <hr className="px-5 text-white" />
                )}
              </>
            ))}
          </ul>
          <button
            className="p-2 -m-2 absolute top-7 right-5"
            onClick={() => setToggleMenu(false)}
          >
            <Image
              src={closeIcon}
              alt="Close menu icon"
              className="w-10 h-auto"
            />
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
