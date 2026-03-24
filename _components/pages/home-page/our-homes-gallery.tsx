import classNames from "classnames";
import ButtonLink from "../../ui/button-link";
import Heading, { headingVariant } from "../../ui/heading";
import OurHomesSlider from "../../sliders/our-homes-slider";

interface Props {
  cssClasses?: string;
  images: string[];
}

const OurHomesGallery = ({ cssClasses, images }: Props) => {
  return (
    <section className={classNames("relative", cssClasses)}>
      <Heading
        variant={headingVariant.sectionHeading}
        cssClasses="mb-10 text-center tablet:text-left"
      >
        Gallery
      </Heading>
      <OurHomesSlider cssClasses="mb-10" images={images} />
      <div className="flex w-full justify-center z-10 desktop:absolute desktop:top-40 desktop:right-10 desktop:w-auto">
        <ButtonLink href="our-homes">View Our Homes</ButtonLink>
      </div>
    </section>
  );
};

export default OurHomesGallery;
