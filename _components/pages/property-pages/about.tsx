import Image from "next/image";
import parse from "html-react-parser";
import { DataProps } from "@/_lib/utils/data-props";
import Heading, { headingVariant } from "../../ui/heading";

interface Props {
  general: {
    facilityName: string;
  };
  about: {
    content: string | string[];
    image: string;
  };
  whatWeOffer: {
    offerings: string;
    image: string;
  };
}

const About = ({
  general: { facilityName },
  about: { content, image: aboutImage },
  whatWeOffer: { offerings, image },
}: Props) => {
  return (
    <div className="grid gap-16 tablet:grid-cols-2 tablet:gap-10">
      <div id="about" className="scroll-mt-32">
        <Heading
          variant={headingVariant.subheading}
          cssClasses="mb-5 text-center tablet:text-left"
        >
          About us
        </Heading>
        <div className="flex flex-col gap-10">
          {(() => {
            const html = Array.isArray(content)
              ? content.map((p) => `<p>${p}</p>`).join("")
              : content;
            return (
              <article className="[&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_li]:mb-0 [&_li:not(:first-child)]:-mt-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4">
                {parse(html)}
              </article>
            );
          })()}
          <Image
            src={aboutImage}
            alt={`${facilityName}`}
            width={800}
            height={600}
            className="object-cover aspect-video"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </div>
      <div>
        <article>
          <Heading variant={headingVariant.subheading} cssClasses="mb-5">
            What we offer
          </Heading>
        </article>
        <div className="grid gap-10">
          <article className="desktop:columns-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_li]:mb-0 [&_li:not(:first-child)]:-mt-4 [&_li]:break-inside-avoid [&_ul]:break-inside-avoid [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4">
            {parse(offerings)}
          </article>
          <Image
            src={image}
            alt={`${facilityName} - What we offer`}
            width={800}
            height={600}
            className="object-cover aspect-video"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
