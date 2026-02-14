import Image from "next/image";
import { GeneralDataProps } from "@/_lib/utils/data-props";
import Heading, { headingVariant } from "../../ui/heading";
import classNames from "classnames";

interface Props extends GeneralDataProps {
  cssClasses?: string;
}

const About = ({
  cssClasses,
  data: {
    homePage: {
      about: { paragraphs, list },
    },
  },
}: Props) => {
  return (
    <main
      className={classNames(
        "grid desktop:grid-cols-[1fr_550px] gap-10",
        cssClasses,
      )}
    >
      <div className="flex flex-col gap-4">
        <Heading
          variant={headingVariant.sectionHeading}
          cssClasses="mb-6 text-center tablet:text-left"
        >
          About
        </Heading>
        <p>{paragraphs[0]}</p>
        <p>{paragraphs[1]}</p>
        <p>{paragraphs[2]}</p>
        <ul className="list-disc ml-6">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{paragraphs[3]}</p>
      </div>
      <div className="grid gap-10 mt-6 min-[800px]:grid-cols-2 desktop:grid-cols-1 desktop:grid-rows-[300px_300px]">
        <Image
          src="/assets/media/the-crescent/9U7A6242.jpg"
          alt="Carevita - About us"
          width={900}
          height={450}
          className="object-cover aspect-video w-full h-full desktop:aspect-[5/3]"
          sizes="(max-width: 900px) 90vw, 50vw"
        />
        <Image
          src="/assets/media/eastlands/9U7A4662.jpg"
          alt="Carevita - About us"
          width={900}
          height={450}
          className="object-cover aspect-video w-full h-full desktop:aspect-[4/3]"
          sizes="(max-width: 900px) 90vw, 50vw"
        />
      </div>
    </main>
  );
};

export default About;
