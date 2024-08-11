import Image from "next/image";
import Link from "next/link";

import navigation from "../../data/navigation-data.json";
import ImageContainer from "../utils/image-container";

import generalData from "@/data/general-data.json";

interface Props {
  cssClasses?: string;
  border?: boolean;
}

const currentYear = new Date().getFullYear();

const Footer = ({ cssClasses, border }: Props) => {
  return (
    <footer className={`${cssClasses}`}>
      <div
        className={`w-full flex flex-col gap-6 items-center px-6 pt-10 pb-6 bg-white ${
          border && "tabletLarge:border-t border-black tablet:mt-10"
        } tablet:px-12`}
      >
        <div className="w-full max-w-[1400px] flex justify-center tabletLarge:justify-between items-center">
          <nav className="hidden tabletLarge:flex">
            <ul>
              {navigation.general.map(({ title, url }, index) => (
                <li key={index}>
                  <Link href={url} className=" hover:font-light">
                    {title}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href={generalData.social.facebook.url}
                  className="hidden tabletLarge:block desktopSmall:hover:scale-105 desktopSmall:hover:opacity-[85%] transition-all duration-500"
                  target="_blank"
                >
                  <Image
                    src={generalData.social.facebook.image}
                    alt="Facebook logo"
                    width={35}
                    height={35}
                    className="tablet:w-[35px] h-auto"
                  />
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col gap-4 items-center tabletLarge:items-end tabletLarge:gap-1">
            <Link
              href={generalData.social.facebook.url}
              className="p-3 -m-3 tabletLarge:hidden"
              target="_blank"
            >
              <Image
                src={generalData.social.facebook.image}
                alt="Facebook logo"
                width={45}
                height={45}
                className="tablet:w-[40px] h-auto"
              />
            </Link>
            <ImageContainer
              src="/assets/media/carevita-logo.png"
              alt="CareVita logo"
              width={120}
              height={100}
              cssClasses="w-[120px] h-auto"
              smallest={30}
              phone={20}
              desktopSmall={10}
              desktop={10}
            />
            <p className="text-[16px] flex flex-col items-center tabletLarge:items-end tabletLarge:text-right tabletLarge:mt-2 tabletLarge:text-[15px]">
              Designed & developed by:
              <a
                href="https://www.thewrightdesigns.co.za"
                target="_blank"
                className="-m-4 p-4 tabletLarge:m-0 tabletLarge:p-0 text-blue text-[16px] tablet:hover:underline underline-offset-4 tabletLarge:ml-1 tabletLarge:text-[15px]"
              >
                The Wright Designs
              </a>
            </p>
          </div>
        </div>
        <hr className="w-1/2 desktopSmall:w-1/4 desktop:w-1/6" />
        <p className="tabletLarge:text-[16px] grid place-items-center gap-0.5">
          © CareVita {currentYear}
          <Link
            href="https://www.carevita.co.za"
            className="p-4 -m-4 text-link tabletLarge:hover:underline underline-offset-4 decoration-1"
          >
            www.carevita.co.za
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
