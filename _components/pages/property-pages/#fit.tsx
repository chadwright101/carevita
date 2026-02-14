import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import classNames from "classnames";

import Heading, { headingVariant } from "../../ui/heading";

interface Props {
  cssClasses?: string;
}

const Fit = ({ cssClasses }: Props) => {
  const [toggleInfo, setToggleInfo] = useState(false);

  return (
    <section className={classNames(cssClasses)}>
      <div className="grid gap-10">
        <Image
          src="/assets/media/fit/CareVita-fit.jpg"
          alt="CareVita #fit"
          width={200}
          height={200}
          className="mx-auto"
        />
        <Heading variant={headingVariant.subheading} cssClasses="text-center">
          Exercise classes for Seniors
        </Heading>
        <p className="desktop:text-center -mt-6">
          Are you looking for a way to improve your wellbeing and health? Look
          no further than our exercise classes!
        </p>
        <div className="grid tablet:grid-cols-2 gap-10">
          <Image
            src="/assets/media/fit/20230420_144516.jpg"
            alt="#fit"
            width={900}
            height={750}
            className="object-cover h-[400px]"
            sizes="(max-width: 650px) 80vw, (max-width: 1100px) 50vw, 30vw"
          />
          <Image
            src="/assets/media/fit/20230420_141012.jpg"
            alt="#fit"
            width={900}
            height={750}
            className="object-cover h-[400px]"
            sizes="(max-width: 650px) 80vw, (max-width: 1100px) 50vw, 30vw"
          />
        </div>
        {!toggleInfo && (
          <button
            className="px-12 py-2.5 mx-auto text-subheading font-extralight bg-green text-white drop-shadow-md tablet:hover:bg-lightGreen tablet:px-10"
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
            <div className="phone:grid grid-cols-2 tablet:grid-cols-3 gap-10">
              <Image
                src="/assets/media/fit/20230420_143721.jpg"
                alt="#fit"
                width={900}
                height={750}
                className="object-cover h-[300px] tablet:h-[400px] desktop:h-[500px] order-1 desktop:order-none"
                sizes="(max-width: 650px) 80vw, 25vw"
              />
              <Image
                src="/assets/media/fit/20230420_143829.jpg"
                alt="#fit"
                width={900}
                height={750}
                className="hidden phone:block object-cover h-[300px] tablet:h-[400px] desktop:h-[500px] order-1 desktop:order-none"
                sizes="(max-width: 650px) 80vw, 25vw"
              />
              <Image
                src="/assets/media/fit/20230420_143903.jpg"
                alt="#fit"
                width={900}
                height={750}
                className="hidden tablet:block object-cover h-[300px] tablet:h-[400px] desktop:h-[500px] order-1 desktop:order-none"
                sizes="(max-width: 650px) 80vw, 25vw"
              />
            </div>
            <div className="grid gap-10 tablet:grid-cols-2 desktop:grid-cols-3 desktop:col-span-full">
              <Image
                src="/assets/media/fit/20230420_143400.jpg"
                alt="#fit"
                width={900}
                height={750}
                className="hidden object-right desktop:block object-cover h-[350px]"
                sizes="(max-width: 650px) 80vw, 35vw"
              />
              <Image
                src="/assets/media/fit/20230420_142646.jpg"
                alt="#fit"
                width={900}
                height={750}
                className="object-cover h-[350px]"
                sizes="(max-width: 650px) 80vw, 35vw"
              />

              <div className="grid gap-y-6 gap-x-10 tablet:grid-cols-2 tablet:gap-y-4 tablet:flex flex-col">
                <Link
                  prefetch={false}
                  href="tel:+27609608695"
                  className="text-paragraph font-extralight p-4 -m-4 tablet:p-0 tablet:m-0 grid grid-cols-[50px_1fr] mr-auto items-center tablet:hover:text-green"
                >
                  <Image
                    src="/assets/icons/phone.svg"
                    alt="#fit on phone"
                    width={24}
                    height={24}
                  />
                  060 960 8695
                </Link>
                <Link
                  prefetch={false}
                  href="mailto:fit@carevita.co.za"
                  className=" text-paragraph font-extralight text-link underline underline-offset-4 p-4 -m-4 tablet:p-0 tablet:m-0 grid grid-cols-[50px_1fr] mr-auto items-center tablet:hover:text-green"
                >
                  <Image
                    src="/assets/icons/email.svg"
                    alt="#fit on email"
                    width={24}
                    height={24}
                  />
                  fit@carevita.co.za
                </Link>

                <Link
                  prefetch={false}
                  href="https://www.facebook.com/profile.php?id=100090893863466"
                  target="_blank"
                  className=" text-paragraph font-extralight p-4 -m-4 tablet:p-0 tablet:m-0 grid grid-cols-[50px_1fr] mr-auto items-center tablet:hover:text-green"
                >
                  <Image
                    src="/assets/icons/facebook.svg"
                    alt="#fit on Facebook"
                    width={26}
                    height={26}
                    className=" -translate-x-[1px]"
                  />
                  CareVita#fit
                </Link>

                <Link
                  prefetch={false}
                  href="https://instagram.com/carevita_fit?igshid=ZGUzMzM3NWJiOQ=="
                  target="_blank"
                  className=" text-paragraph font-extralight p-4 -m-4 tablet:p-0 tablet:m-0 grid grid-cols-[50px_1fr] mr-auto items-center tablet:hover:text-green"
                >
                  <Image
                    src="/assets/icons/instagram.svg"
                    alt="#fit on Instagram"
                    width={28}
                    height={28}
                    className=" -translate-x-[2px]"
                  />
                  carevita_fit
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
