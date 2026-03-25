import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
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
      about: { content, image1, image2 },
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
        <div
          className="[&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_li]:mb-0 [&_li]:leading-3 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
      </div>
      <div className="grid gap-10 mt-6 min-[800px]:grid-cols-2 desktop:grid-cols-1 desktop:grid-rows-[300px_300px]">
        <Image
          src={image1}
          alt="Carevita - About us"
          width={900}
          height={450}
          className="object-cover aspect-video w-full h-full desktop:aspect-[5/3]"
          sizes="(max-width: 900px) 90vw, 50vw"
        />
        <Image
          src={image2}
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
