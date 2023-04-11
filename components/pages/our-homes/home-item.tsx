import Image from "next/image";
import Button from "../../button";
import Heading, { headingVariant } from "../../heading";

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
      <div className="flex flex-col">
        <Heading variant={headingVariant.subheading}>{heading}</Heading>
        <h3 className="font-thin text-paragraph -mt-6 tablet:-mt-4 desktop:-mt-7 text-center tablet:text-left">
          {location}
        </h3>
      </div>
      <Image
        src={heroImageUrl}
        alt={heroImageAlt}
        width={1000}
        height={750}
        className="object-cover h-[225px] phone:h-[300px] tablet:h-[380px] tabletLarge:h-[280px] desktop:h-[250px]"
      />
      <p>{paragraph}</p>
      <Button url={buttonUrl} cssClasses="mx-auto"></Button>
    </article>
  );
};

export default HomeItem;
