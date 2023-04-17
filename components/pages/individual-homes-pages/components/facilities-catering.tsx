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
        <div className="tablet:grid grid-cols-12 tabletLarge:grid-cols-11 desktop:grid-cols-8">
          <Image
            src="/icons/walker.svg"
            alt=""
            width={50}
            height={50}
            className="mb-6 mx-auto tablet:mx-0 tablet:w-10 tablet:h-auto"
            priority
          />
          <Heading
            variant={headingVariant.subheading}
            cssClasses="col-span-5 tabletLarge:ml-4 desktopSmall:ml-0 desktop:-translate-x-6"
          >
            Facilities
          </Heading>
        </div>
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
        <div className="tablet:grid grid-cols-12 tabletLarge:grid-cols-8 desktopSmall:grid-cols-10 desktop:grid-cols-12">
          <Image
            src="/icons/catering.svg"
            alt=""
            width={50}
            height={50}
            className="mb-6 mx-auto tablet:mx-0 tablet:w-10 tablet:h-auto"
            priority
          />
          <Heading variant={headingVariant.subheading}>Catering</Heading>
        </div>
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
