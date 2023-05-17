import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Heading, { headingVariant } from "../../../heading";

interface Props {
  cssClasses?: string;
}

const Fit = ({ cssClasses }: Props) => {
  const [toggleInfo, setToggleInfo] = useState(false);

  return (
    <section className={`${cssClasses}`}>
      <div className="grid gap-10">
        <Image
          src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/fit/CareVita-fit.jpg"
          alt="CareVita #fit"
          width={200}
          height={200}
          className="mx-auto"
        />
        <Heading
          variant={headingVariant.subheading}
          cssClasses="tablet:text-center tabletLarge:text-center desktopSmall:text-center desktop:text-center"
        >
          Exercise classes for Seniors
        </Heading>
        <p className="desktopSmall:text-center -mt-6">
          Are you looking for a way to improve your wellbeing and health? Look
          no further than our exercise classes!
        </p>
        <div className="tabletLarge:grid grid-cols-2 gap-10">
          <Image
            src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/fit/20230420_144516.jpg"
            alt="#fit"
            width={900}
            height={750}
            className="object-cover h-[400px]"
          />
          <Image
            src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/fit/20230420_141012.jpg"
            alt="#fit"
            width={900}
            height={750}
            className="object-cover hidden h-[400px] tabletLarge:block"
          />
        </div>
        {!toggleInfo && (
          <button
            className="px-12 py-2.5 mx-auto text-subheading font-thin bg-green text-white drop-shadow-md tabletLarge:hover:bg-lightGreen tablet:px-10"
            onClick={() => setToggleInfo(true)}
          >
            View more
          </button>
        )}
      </div>
      {toggleInfo && (
        <article className="grid gap-4 my-10">
          <div className="grid gap-4 bg-blue p-8 phone:p-10 mb-6">
            <p className="text-white text-center">
              Regular exercise has been shown to have numerous benefits for
              Seniors, including{" "}
              <span className="font-light text-white">
                improved cardiovascular health, increased strength
              </span>{" "}
              and <span className="font-light text-white">flexibility</span>,
              and a{" "}
              <span className="font-light text-white">
                reduced risk of falls and injuries
              </span>
              .
            </p>
            <p className="text-white text-center">
              Exercise also{" "}
              <span className="font-light text-white">improves mood</span> and{" "}
              <span className="font-light text-white">sleep</span>, as well as a{" "}
              <span className="font-light text-white">
                reduction of stress and anxiety
              </span>
            </p>
          </div>

          <p>
            Our fitness programmes are designed specifically by qualified
            trainers, physiotherapists and medical practitioners to ensure their
            safety of our Senior members.
          </p>
          <p>
            They include a variety of exercises that are safe, effective and
            fun. Our main focus is on{" "}
            <span className="font-light">strength</span>,{" "}
            <span className="font-light">flexibility</span> and{" "}
            <span className="font-light">balance</span>.
          </p>
          <p>
            The exercise programmes are led by{" "}
            <span className="font-light">certified fitness professionals</span>{" "}
            that understand the unique challenges that come with ageing.
          </p>
          <div className="grid gap-10 mt-6">
            <div className="phone:grid grid-cols-2 tabletLarge:grid-cols-3 gap-10">
              <Image
                src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/fit/20230420_143721.jpg"
                alt="#fit"
                width={900}
                height={750}
                className="object-cover h-[300px] tablet:h-[400px] desktopSmall:h-[500px] order-1 desktopSmall:order-none"
              />
              <Image
                src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/fit/20230420_143829.jpg"
                alt="#fit"
                width={900}
                height={750}
                className="hidden phone:block object-cover h-[300px] tablet:h-[400px] desktopSmall:h-[500px] order-1 desktopSmall:order-none"
              />
              <Image
                src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/fit/20230420_143903.jpg"
                alt="#fit"
                width={900}
                height={750}
                className="hidden tabletLarge:block object-cover h-[300px] tablet:h-[400px] desktopSmall:h-[500px] order-1 desktopSmall:order-none"
              />
            </div>
            <div className="grid gap-10 tabletLarge:grid-cols-2 desktopSmall:grid-cols-3 desktopSmall:col-span-full">
              <Image
                src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/fit/20230420_143400.jpg"
                alt="#fit"
                width={900}
                height={750}
                className="hidden object-right desktopSmall:block object-cover h-[350px]"
              />
              <Image
                src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/fit/20230420_142646.jpg"
                alt="#fit"
                width={900}
                height={750}
                className="object-cover h-[350px]"
              />

              <div className="grid gap-y-6 gap-x-10 tablet:grid-cols-2 tabletLarge:gap-y-4 tabletLarge:flex flex-col">
                <Link
                  href="tel:+27609608695"
                  className="text-paragraph font-thin p-4 -m-4 tabletLarge:p-0 tabletLarge:m-0 grid grid-cols-[50px_1fr] mr-auto items-center tabletLarge:hover:text-green"
                >
                  <Image
                    src="/icons/phone.svg"
                    alt="#fit on phone"
                    width={24}
                    height={24}
                  />
                  060 960 8695
                </Link>
                <Link
                  href="mailto:fit@carevita.co.za"
                  className=" text-paragraph font-thin text-link underline underline-offset-4 p-4 -m-4 tabletLarge:p-0 tabletLarge:m-0 grid grid-cols-[50px_1fr] mr-auto items-center tabletLarge:hover:text-green"
                >
                  <Image
                    src="/icons/email.svg"
                    alt="#fit on email"
                    width={24}
                    height={24}
                  />
                  fit@carevita.co.za
                </Link>

                <Link
                  href="https://www.facebook.com/profile.php?id=100090893863466"
                  target="_blank"
                  className=" text-paragraph font-thin p-4 -m-4 tabletLarge:p-0 tabletLarge:m-0 grid grid-cols-[50px_1fr] mr-auto items-center tabletLarge:hover:text-green"
                >
                  <Image
                    src="/icons/facebook.svg"
                    alt="#fit on Facebook"
                    width={26}
                    height={26}
                    className=" -translate-x-[1px]"
                  />
                  CareVita#fit
                </Link>

                <Link
                  href="https://instagram.com/carevita_fit?igshid=ZGUzMzM3NWJiOQ=="
                  target="_blank"
                  className=" text-paragraph font-thin p-4 -m-4 tabletLarge:p-0 tabletLarge:m-0 grid grid-cols-[50px_1fr] mr-auto items-center tabletLarge:hover:text-green"
                >
                  <Image
                    src="/icons/instagram.svg"
                    alt="#fit on Instagram"
                    width={28}
                    height={28}
                    className=" -translate-x-[2px]"
                  />
                  carevitafit
                </Link>
              </div>
            </div>
          </div>
          <hr className="text-black mt-10" />
        </article>
      )}
    </section>
  );
};

export default Fit;
