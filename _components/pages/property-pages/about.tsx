import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { DataProps } from "@/_lib/utils/data-props";
import Heading, { headingVariant } from "../../ui/heading";

interface Props {
  general: {
    title: string;
  };
  about: {
    paragraphs: string | string[];
    image: string;
  };
  whatWeOffer: {
    list: string;
    image: string;
  };
}

const About = ({
  general: { title },
  about: { paragraphs, image: aboutImage },
  whatWeOffer: { list, image },
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
            const html = Array.isArray(paragraphs)
              ? paragraphs.map((p) => `<p>${p}</p>`).join("")
              : paragraphs;
            return (
              <article
                className="[&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_li]:mb-1 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
              />
            );
          })()}
          <Image
            src={aboutImage}
            alt={`${title}`}
            width={800}
            height={600}
            className="object-cover aspect-video tablet:hidden"
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
          <article
            className="desktop:columns-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_li]:mb-1 [&_li]:break-inside-avoid [&_ul]:break-inside-avoid [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(list) }}
          />
          <Image
            src={image}
            alt={`${title} - What we offer`}
            width={800}
            height={600}
            className="object-cover aspect-video tablet:hidden"
          />
        </div>
      </div>
      <Image
        src={aboutImage}
        alt={`${title}`}
        width={650}
        height={450}
        className="hidden object-cover aspect-video tablet:block"
      />
      <Image
        src={image}
        alt={`${title} - What we offer`}
        width={650}
        height={450}
        className="hidden object-cover aspect-video tablet:block"
      />
    </div>
  );
};

export default About;
