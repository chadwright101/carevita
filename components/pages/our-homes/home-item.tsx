import Link from "next/link";
import ImageContainer from "@/components/utils/image-container";
import Button from "../../button";
import Heading, { headingVariant } from "../../heading";
import { DataProps } from "@/components/utils/data-props";

interface Props extends DataProps {
  cssClasses?: string;
  featuredImage: string;
}

const HomeItem = ({
  cssClasses,
  data: {
    general: { title, extendedTitle, extendedLocation, description, homeUrl },
  },
  featuredImage,
}: Props) => {
  return (
    <article className={`flex flex-col gap-10 ${cssClasses}`}>
      <div className="flex flex-col">
        <Link href={homeUrl}>
          <Heading
            cssClasses="desktopSmall:hover:text-green"
            variant={headingVariant.subheading}
          >
            {extendedTitle}
          </Heading>
        </Link>
        <h3 className="font-thin text-paragraph -mt-6 tablet:-mt-4 desktop:-mt-7 text-center tablet:text-left">
          {extendedLocation}
        </h3>
      </div>
      <ImageContainer
        src={featuredImage}
        alt={`${title} - ${extendedLocation}`}
        width={1000}
        height={750}
        cssClasses="object-cover h-[225px] phone:h-[300px] tablet:h-[380px] tabletLarge:h-[280px] desktop:h-[325px]"
        smallest={90}
        tablet={80}
        desktopSmall={40}
        desktop={25}
        eager
        url={homeUrl}
      />
      <p className="desktop:h-[135px]">{description}</p>
      <Button url={homeUrl} cssClasses="mx-auto"></Button>
    </article>
  );
};

export default HomeItem;
