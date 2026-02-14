import classNames from "classnames";
import Button from "../../ui/button";
import Heading, { headingVariant } from "../../ui/heading";
import OurHomesSlider from "../../sliders/our-homes-slider";

interface Props {
  cssClasses?: string;
}

const OurHomesGallery = ({ cssClasses }: Props) => {
  return (
    <section className={classNames("relative", cssClasses)}>
      <Heading
        variant={headingVariant.sectionHeading}
        cssClasses="mb-10 text-center tablet:text-left"
      >
        Gallery
      </Heading>
      <OurHomesSlider cssClasses="mb-10" />
      <div className="flex w-full justify-center z-10 desktop:absolute desktop:top-40 desktop:right-10 desktop:w-auto">
        <Button url="our-homes">View Our Homes</Button>
      </div>
    </section>
  );
};

export default OurHomesGallery;
