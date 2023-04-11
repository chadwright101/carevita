import Image from "next/image";

import Heading, { headingVariant } from "../../../heading";

interface Props {
  catering: {
    paragraphs: Array<string>;
    image: { url: string; alt: string };
  };
  facilities: { list: Array<string>; image: { url: string; alt: string } };
}

const FacilitesCatering = ({ catering, facilities }: Props) => {
  return (
    <div className="grid gap-16 tabletLarge:grid-cols-2 tabletLarge:gap-10">
      <div>
        <Heading variant={headingVariant.subheading}>Facilities</Heading>
        <article className="flex flex-col gap-10">
          <ul className="list-disc ml-10">
            {facilities.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <Image
            src={facilities.image.url}
            alt={facilities.image.alt}
            width={1000}
            height={750}
            className="object-cover h-[250px] phone:h-[275px] tablet:h-[400px] tabletLarge:hidden"
          />
        </article>
      </div>
      <div>
        <Heading variant={headingVariant.subheading}>Catering</Heading>
        <div className="flex flex-col gap-10">
          <article>
            <p className="mb-4">{catering.paragraphs[0]}</p>
            <p className="mb-4">{catering.paragraphs[1]}</p>
            <p className="mb-4">{catering.paragraphs[2]}</p>
            <p>{catering.paragraphs[3]}</p>
          </article>

          <Image
            src={catering.image.url}
            alt={catering.image.alt}
            width={1000}
            height={750}
            className="object-cover h-[250px] phone:h-[275px] tablet:h-[400px] tabletLarge:hidden"
          />
        </div>
      </div>
      <Image
        src={facilities.image.url}
        alt={facilities.image.alt}
        width={1000}
        height={750}
        className="hidden object-cover h-[300px] desktop:h-[375px] tabletLarge:block"
      />
      <Image
        src={catering.image.url}
        alt={catering.image.alt}
        width={1000}
        height={750}
        className="hidden object-cover h-[300px] tabletLarge:block desktop:h-[375px]"
      />
    </div>
  );
};

export default FacilitesCatering;
