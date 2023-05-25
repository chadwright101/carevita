import Image from "next/image";
import Link from "next/link";

import menuList from "../data/navigation-data.json";

interface Props {
  cssClasses?: string;
  border?: boolean;
}

const Footer = ({ cssClasses, border }: Props) => {
  return (
    <footer className={`${cssClasses}`}>
      {/* mobile view */}
      <div
        className={`w-full flex flex-col gap-4 items-center px-6 pt-10 pb-6 bg-white ${
          border && "tabletLarge:border-t border-black tablet:mt-10"
        } tablet:px-12`}
      >
        <div className="w-full max-w-[1400px] flex justify-center tabletLarge:justify-between items-center">
          <nav className="hidden tabletLarge:flex">
            <ul>
              {menuList.navigation.desktop.map(({ title, url }, index) => (
                <li key={index}>
                  <Link href={url} className=" hover:font-light">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Image
            src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/carevita-logo.png"
            alt="CareVita logo"
            width={120}
            height={100}
            className="w-[120px] h-auto"
            sizes="(max-width: 900px) 100px, (max-width: 1400px) 100px, 100px"
            quality={50}
          />
        </div>
        <p className="tabletLarge:text-[16px]">
          © CareVita |{" "}
          <Link
            href="https://www.carevita.co.za"
            className="p-4 -m-4 tabletLarge:hover:underline underline-offset-4 decoration-1"
          >
            www.carevita.co.za
          </Link>
        </p>
      </div>

      {/* desktop view */}
    </footer>
  );
};

export default Footer;
