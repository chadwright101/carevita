import ImageContainer from "@/components/utils/image-container";
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
  loading?: "eager" | "lazy";
}

const HomeItem = ({
  cssClasses,
  heroImageUrl,
  heroImageAlt,
  heading,
  location,
  paragraph,
  buttonUrl,
  loading,
}: Props) => {
  return (
    <article className={`flex flex-col gap-10 ${cssClasses}`}>
      <div className="flex flex-col">
        <Heading variant={headingVariant.subheading}>{heading}</Heading>
        <h3 className="font-thin text-paragraph -mt-6 tablet:-mt-4 desktop:-mt-7 text-center tablet:text-left">
          {location}
        </h3>
      </div>
      <ImageContainer
        src={heroImageUrl}
        alt={heroImageAlt}
        width={1000}
        height={750}
        cssClasses="object-cover h-[225px] phone:h-[300px] tablet:h-[380px] tabletLarge:h-[280px] desktop:h-[250px]"
        smallest={90}
        tablet={80}
        desktopSmall={40}
        desktop={25}
        eager
      />
      <p>{paragraph}</p>
      <Button url={buttonUrl} cssClasses="mx-auto"></Button>
    </article>
  );
};

export default HomeItem;
