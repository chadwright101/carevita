import Image from "next/image";
import Button from "../button";
import Heading, { headingVariant } from "../heading";

interface Props {
  cssClasses?: string;
  heroImageUrl: any;
  heroImageAlt: any;
  heading: string;
  location: string;
  paragraph: string;
  buttonUrl: string;
}

const HomeItem = ({
  cssClasses,
  heroImageUrl,
  heroImageAlt,
  heading,
  location,
  paragraph,
  buttonUrl,
}: Props) => {
  return (
    <article className={`flex flex-col gap-10 ${cssClasses}`}>
      <div className="flex flex-col gap-1">
        <Heading
          variant={headingVariant.subheading}
          cssClasses="-mb-0.5 tablet:-mb-0.5 desktop:-mb-0.5"
        >
          {heading}
        </Heading>
        <h3 className="font-thin text-paragraph text-center tablet:text-left">
          {location}
        </h3>
      </div>
      <Image
        src={heroImageUrl}
        alt={heroImageAlt}
        width={1000}
        height={750}
        className="object-cover h-[300px] tablet:h-[380px] tabletLarge:h-[280px] desktop:h-[250px]"
      />
      <p>{paragraph}</p>
      <Button url={buttonUrl} cssClasses="mx-auto"></Button>
    </article>
  );
};

export default HomeItem;
