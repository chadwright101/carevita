import Image from "next/image";
import BusinessPortfolioContactForm from "@/_components/business-portfolio/business-portfolio-contact-form";
import ShowEmailAddress from "@/_components/ui/contact/show-email-address";
import Layout from "@/_lib/page-wrapper";
import classNames from "classnames";

import data from "@/_data/business-portfolio.json";
import Head from "next/head";

const BusinessPortfolio = () => {
  const { intro, arms } = data;
  return (
    <>
      <Head>
        <title>Business Portfolio - CareVita (Pty) Ltd</title>
        <meta
          name="description"
          content="CareVita was founded in 2018 to bridge the gap between exceptional care and unparalleled service."
        />
        <meta name="keywords" content="carevita, business portfolio" />
      </Head>
      <Layout cssClasses="border-b-2 border-blue pb-20">
        <div className="flex flex-col gap-y-4 mt-16 tablet:flex-row tablet:justify-between">
          <div>
            <h2 className="uppercase text-subheading font-light mb-1">
              CareVita (Pty) Ltd
            </h2>
            <h1>Business Portfolio</h1>
          </div>
          <h4 className="text-paragraph font-light">Mar 2024</h4>
        </div>
        <FadedLine cssClasses="tablet:text-white" />
        <main className="mb-16">
          <div className="desktop:grid grid-cols-2 gap-x-10">
            <ul className="grid gap-y-10">
              {intro.map(({ title, paragraph, image }, index) => (
                <li
                  key={index}
                  className={classNames(
                    "grid gap-10 desktop:grid-cols-1",
                    index % 2
                      ? "tablet:grid-cols-[300px_1fr]"
                      : "tablet:grid-cols-[1fr_300px]",
                  )}
                >
                  <div
                    className={classNames(
                      "flex flex-col gap-y-4",
                      index % 2 && "tablet:order-1",
                    )}
                  >
                    <h3 className="leading-5">{title}</h3>
                    <p>{paragraph}</p>
                  </div>
                  <Image
                    width={900}
                    height={500}
                    src={image}
                    alt={title}
                    className={classNames(
                      "w-full aspect-video tablet:aspect-square object-cover desktop:hidden",
                      index === 1 &&
                        "aspect-[3/5] phone:aspect-[4/5] tablet:aspect-square",
                    )}
                    sizes="(max-width: 900px) 90vw, 50vw"
                  />
                </li>
              ))}
            </ul>
            <div className="hidden desktop:grid desktop:grid-cols-2 gap-10">
              <Image
                width={240}
                height={400}
                src={intro[0].image}
                alt={intro[0].title}
                className="w-full h-full object-cover aspect-video"
                sizes="(max-width: 1280px) 50vw, 25vw"
              />
              <Image
                width={240}
                height={400}
                src={intro[1].image}
                alt={intro[1].title}
                className="w-full h-full object-cover aspect-video"
                sizes="(max-width: 1280px) 50vw, 25vw"
              />
            </div>
          </div>
          <FadedLine cssClasses="my-20" />
          <div className="desktop:grid grid-cols-2 gap-x-10">
            <div className="hidden desktop:grid desktop:grid-cols-2 gap-10 h-full">
              <Image
                width={800}
                height={600}
                src={arms[0].image as string}
                alt={arms[0].title}
                className="w-full h-full object-cover desktop:col-span-2"
                sizes="50vw"
              />
              <Image
                width={700}
                height={600}
                src={arms[1].image as string}
                alt={arms[1].title}
                className="w-full h-full object-cover"
                sizes="25vw"
              />
              <Image
                width={500}
                height={600}
                src={arms[2].image as string}
                alt={arms[2].title}
                className="w-full h-full object-cover"
                sizes="25vw"
              />
            </div>
            <ul>
              {arms.map(({ title, paragraph, image }, index) => (
                <li
                  key={index}
                  className={classNames(
                    "tablet:grid gap-x-10 desktop:grid-cols-1 desktop:p-0",
                    index === 3
                      ? "desktop:border-none pb-0 mb-0"
                      : "border-b border-black/[15%] pb-10 mb-10",
                    index % 2
                      ? "tablet:grid-cols-[300px_1fr]"
                      : "tablet:grid-cols-[1fr_300px]",
                  )}
                >
                  <div
                    className={classNames(
                      "flex flex-col gap-y-4",
                      index !== 3 && "mb-10",
                      index % 2 && "tablet:order-1",
                      !image && "tablet:col-span-2",
                    )}
                  >
                    <h3 className="leading-5">{title}</h3>
                    <p>{paragraph}</p>
                  </div>
                  {image ? (
                    <Image
                      width={900}
                      height={500}
                      src={image}
                      alt={title}
                      className="w-full aspect-video object-cover tablet:aspect-square desktop:hidden"
                      sizes="(max-width: 900px) 90vw, 50vw"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </main>
        <section className="grid desktop:grid-cols-2 gap-x-10">
          <div className="grid gap-y-10">
            <h2>Contact</h2>
            <ul>
              <li className="grid grid-cols-[80px_1fr]">
                <p className="text-larger font-light">Email:</p>
                <div className="place-items-start mr-auto">
                  <ShowEmailAddress property="general" blackText />
                </div>
              </li>
            </ul>
            <p className="italic font-extralight">
              Please fill out the form below and our team will get back to you
              ASAP...
            </p>
            <BusinessPortfolioContactForm />
          </div>
          <Image
            width={900}
            height={500}
            src="/assets/media/serene-park/9U7A5024-HDR.jpg"
            alt="CareVita Contact"
            className="hidden w-full object-cover h-full desktop:block"
            sizes="50vw"
          />
        </section>
      </Layout>
    </>
  );
};

interface LineProps {
  cssClasses?: string;
}

const FadedLine = ({ cssClasses }: LineProps) => {
  return <hr className={classNames("text-black/[15%] my-10", cssClasses)} />;
};

export default BusinessPortfolio;
