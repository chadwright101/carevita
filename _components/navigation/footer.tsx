import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

import navigation from "@/_data/navigation-data.json";
import generalData from "@/_data/general-data.json";

interface Props {
  cssClasses?: string;
}

const currentYear = new Date().getFullYear();

const Footer = ({ cssClasses }: Props) => {
  return (
    <footer className={classNames(cssClasses)}>
      <div className="w-full mx-auto max-w-[1280px] flex flex-col gap-6 items-center px-5 pt-15 mt-15 border-t border-black/25 pb-6 bg-white desktop:pt-10">
        <div className="w-full max-w-[1280px] flex justify-center tablet:justify-between items-center">
          <nav className="hidden tablet:flex">
            <ul>
              {navigation.general.map(({ title, url }, index) => (
                <li key={index}>
                  <Link
                    prefetch={false}
                    href={url}
                    className=" hover:font-light"
                  >
                    {title}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  prefetch={false}
                  href={generalData.social.facebook.url}
                  className="hidden tablet:block desktop:hover:scale-105 desktop:hover:opacity-[85%] transition-all duration-500"
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
          <div className="flex flex-col gap-4 items-center tablet:items-end tablet:gap-1">
            <Link
              prefetch={false}
              href={generalData.social.facebook.url}
              className="p-3 -m-3 tablet:hidden"
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
            <Image
              src="/assets/media/carevita-logo.png"
              alt="CareVita logo"
              width={120}
              height={100}
              className="w-[120px] h-auto"
              sizes="(max-width: 425px) 30vw, 10vw"
            />
            <p className="text-[16px] flex flex-col items-center tablet:items-end tablet:text-right tablet:mt-2 tablet:text-[15px]">
              Designed & developed by:
              <a
                href="https://www.thewrightdesigns.co.za"
                target="_blank"
                className="-m-4 p-4 tablet:m-0 tablet:p-0 text-blue text-[16px] tablet:hover:underline underline-offset-4 tablet:ml-1 tablet:text-[15px]"
              >
                The Wright Designs
              </a>
            </p>
          </div>
        </div>
        <hr className="w-1/2 text-black/25 tablet:w-1/4 desktop:w-1/6" />
        <p className="tablet:text-[16px] grid place-items-center gap-0.5">
          © CareVita {currentYear}
          <Link
            prefetch={false}
            href="https://www.carevita.co.za"
            className="p-4 -m-4 text-link tablet:hover:underline underline-offset-4 decoration-1"
          >
            www.carevita.co.za
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
