import { useState } from "react";
import Link from "next/link";

import BusinessPortfolioContactForm from "@/components/business-portfolio/business-portfolio-contact-form";
import Layout from "@/components/layout";
import ImageContainer from "@/components/utils/image-container";

import data from "@/data/business-portfolio.json";

const BusinessPortfolio = () => {
  const [showEmail, setShowEmail] = useState("");

  const { intro, arms } = data;
  return (
    <Layout cssClasses="border-b-2 border-blue pb-20">
      <div className="flex flex-col gap-y-4 mt-16 tabletLarge:flex-row tabletLarge:justify-between">
        <div>
          <h2 className="uppercase text-subheading font-light mb-1">
            CareVita (Pty) Ltd
          </h2>
          <h1>Business Portfolio</h1>
        </div>
        <h4 className="text-paragraph font-light">Mar 2024</h4>
      </div>
      <FadedLine cssClasses="tabletLarge:text-white" />
      <main className="mb-16">
        <div className="desktopSmall:grid grid-cols-2 gap-x-10">
          <ul className="grid gap-y-10">
            {intro.map(({ title, paragraph, image }, index) => (
              <li
                key={index}
                className={`grid gap-10 ${
                  index % 2
                    ? "tabletLarge:grid-cols-[300px_1fr]"
                    : "tabletLarge:grid-cols-[1fr_300px]"
                } desktopSmall:grid-cols-1`}
              >
                <div
                  className={`flex flex-col gap-y-4 ${
                    index % 2 ? "tabletLarge:order-1" : ""
                  }`}
                >
                  <h3 className="leading-5">{title}</h3>
                  <p>{paragraph}</p>
                </div>
                <ImageContainer
                  width={900}
                  height={500}
                  src={image}
                  cssClasses={`w-full aspect-video tabletLarge:aspect-square ${
                    index === 1
                      ? "aspect-[3/5] phone:aspect-[4/5] tablet:aspect-square"
                      : ""
                  } object-cover desktopSmall:hidden`}
                />
              </li>
            ))}
          </ul>
          <div className="hidden desktopSmall:grid grid-cols-2 gap-x-10">
            <ImageContainer
              width={240}
              height={400}
              src={intro[0].image}
              cssClasses="w-full h-full object-cover"
            />
            <ImageContainer
              width={240}
              height={400}
              src={intro[1].image}
              cssClasses="w-full h-full object-cover"
            />
          </div>
        </div>
        <FadedLine cssClasses="my-20" />
        <div className="desktopSmall:grid grid-cols-2 gap-x-10">
          <div className="hidden desktopSmall:grid gap-y-10 h-full">
            <div className="h-full bg-[url('/DJI_0548.jpg')] bg-center"></div>
            <div className="h-full bg-[url('/DJI_0548.jpg')] bg-center"></div>
            <div className="h-full bg-[url('/DJI_0548.jpg')] bg-center"></div>
          </div>
          <ul>
            {arms.map(({ title, paragraph, image }, index) => (
              <li
                key={index}
                className={`tabletLarge:grid gap-x-10 ${
                  index === 3
                    ? "desktopSmall:border-none pb-0 mb-0"
                    : "border-b border-black/[15%] pb-10 mb-10"
                } ${
                  index % 2
                    ? "tabletLarge:grid-cols-[300px_1fr]"
                    : "tabletLarge:grid-cols-[1fr_300px]"
                } desktopSmall:grid-cols-1 desktopSmall:p-0`}
              >
                <div
                  className={`flex flex-col gap-y-4 ${
                    index === 3 ? "mb-0" : "mb-10"
                  } ${index % 2 ? "tabletLarge:order-1" : ""} ${
                    !image ? "tabletLarge:col-span-2" : ""
                  }`}
                >
                  <h3 className="leading-5">{title}</h3>
                  <p>{paragraph}</p>
                </div>
                {image ? (
                  <ImageContainer
                    width={900}
                    height={500}
                    src={image}
                    cssClasses="w-full aspect-video object-cover tabletLarge:aspect-square desktopSmall:hidden"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <section className="grid desktopSmall:grid-cols-2 gap-x-10">
        <div className="grid gap-y-10">
          <h2>Contact</h2>
          <ul>
            <li className="grid grid-cols-[80px_1fr]">
              <p className="text-larger font-light">Email:</p>
              <div className="place-items-start mr-auto">
                {!showEmail ? (
                  <p
                    className="text-larger font-thin italic underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                    onClick={async () => {
                      const email = await fetch(`/api/contact-details-general`);
                      const data = await email.json();
                      const emailValue = data.general;
                      setShowEmail(emailValue);
                    }}
                  >
                    Show email address
                  </p>
                ) : (
                  <Link
                    href={`mailto:${showEmail}`}
                    className="text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktopSmall:p-0 desktopSmall:m-0 tabletLarge:hover:underline underline-offset-8 decoration-1"
                  >
                    {showEmail}
                  </Link>
                )}
              </div>
            </li>
          </ul>
          <p className="italic font-[100]">
            Please fill out the form below and our team will get back to you
            ASAP...
          </p>
          <BusinessPortfolioContactForm />
        </div>
        <ImageContainer
          width={900}
          height={500}
          src="/DJI_0548.jpg"
          cssClasses="hidden w-full object-cover h-full desktopSmall:block"
        />
      </section>
    </Layout>
  );
};

interface LineProps {
  cssClasses?: string;
}

const FadedLine = ({ cssClasses }: LineProps) => {
  return <hr className={`text-black/[15%] my-10 ${cssClasses}`} />;
};

export default BusinessPortfolio;
