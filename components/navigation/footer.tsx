import Image from "next/image";
import Link from "next/link";

import navigation from "../../data/navigation-data.json";
import ImageContainer from "../utils/image-container";

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
            </ul>
          </nav>
          <div className="flex flex-col gap-4 items-center tabletLarge:items-end tabletLarge:gap-1">
            <ImageContainer
              src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/carevita-logo.png"
              alt="CareVita logo"
              width={120}
              height={100}
              cssClasses="w-[120px] h-auto"
              smallest={30}
              phone={20}
              desktopSmall={10}
              desktop={10}
            />
            <p className="text-[16px] flex flex-col items-center tabletLarge:items-end tabletLarge:text-right tabletLarge:text-[15px]">
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
        <hr className="w-1/2 desktopSmall:w-1/3" />
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
