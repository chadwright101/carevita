import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import ButtonLink from "../../ui/button-link";
import Heading, { headingVariant } from "../../ui/heading";
import { FacilityNavigation } from "@/_types/facility-types";

interface Props {
  cssClasses?: string;
  data: FacilityNavigation;
  featuredImage: string;
}

const HomeItem = ({
  cssClasses,
  data: { title, extendedTitle, extendedLocation, description, homeUrl },
  featuredImage,
}: Props) => {
  return (
    <article
      className={classNames(
        "flex flex-col h-full justify-between items-center gap-10",
        cssClasses,
      )}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Link
            prefetch={false}
            href={homeUrl}
            className="tablet:place-self-start"
          >
            <Heading
              cssClasses="text-center tablet:text-left desktop:hover:text-green ease-in-out duration-300"
              variant={headingVariant.subheading}
            >
              {extendedTitle}
            </Heading>
          </Link>
          <h3 className="font-extralight text-paragraph text-center tablet:text-left">
            {extendedLocation}
          </h3>
        </div>
        <Link href={homeUrl} className="overflow-hidden">
          <Image
            src={featuredImage}
            alt={`${title} - ${extendedLocation}`}
            width={1000}
            height={750}
            className="object-cover aspect-video ease-in-out delay-75 duration-500 desktop:hover:scale-[102%]"
            priority
            sizes="(max-width: 425px) 90vw, (max-width: 900px) 80vw, 40vw"
          />
        </Link>
        <p>{description}</p>
      </div>
      <ButtonLink href={homeUrl} backgroundColor="green" />
    </article>
  );
};

export default HomeItem;
