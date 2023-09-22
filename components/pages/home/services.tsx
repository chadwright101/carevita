import Image from "next/image";
import Heading, { headingVariant } from "../../heading";
import ImageContainer from "@/components/utils/image-container";

interface Props {
  cssClasses?: string;
}

const Services = ({ cssClasses }: Props) => {
  return (
    <article className={`${cssClasses}`}>
      <Heading variant={headingVariant.sectionHeading}>Services</Heading>
      <div className="flex flex-col gap-20 tablet:gap-14 desktopSmall:gap-10">
        <div className="grid grid-cols-1 grid-rows-[1fr_280px] tablet:grid-rows-[1fr_350px] gap-10 place-items-center tablet:place-items-start tabletLarge:grid-cols-2 tabletLarge:grid-rows-[150px_150px] desktopSmall:grid-rows-[125px_125px] desktop:grid-cols-[1.5fr_2fr]">
          <div className="tablet:grid grid-cols-11 tabletLarge:grid-cols-8 tabletLarge:order-2">
            <Image
              src="/icons/ecg-heart.svg"
              alt=""
              width={50}
              height={50}
              className="mb-6 mx-auto tablet:mx-0 tablet:w-10 tablet:h-auto"
              priority
              quality={50}
            />
            <Heading
              variant={headingVariant.subheading}
              cssClasses="col-span-5 tabletLarge:ml-4 desktopSmall:ml-0 desktop:-translate-x-6"
            >
              Nursing Services
            </Heading>
            <p className="col-span-full">
              CareVita&#39;s main priority is to provide professional nursing
              care to our client&#39;s facilities. Adhering to all legal
              requirements, we manage not only the employees and their training
              but also ensuring that the facility is fully compliant according
              to industry standards. Nursing audits are held regularly, giving
              our clients and developers peace of mind when it comes to the
              management of these specialised services.
            </p>
          </div>
          <ImageContainer
            src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/serene-park/images/9U7A5252.jpg"
            alt="Carevita - Nursing Services"
            width={900}
            height={700}
            cssClasses="object-cover w-full h-full tabletLarge:row-span-2 object-bottom"
            smallest={110}
            phone={80}
            tablet={75}
            desktopSmall={35}
            desktop={25}
          />
        </div>
        <div className="grid grid-cols-1 grid-rows-[1fr_280px] tablet:grid-rows-[1fr_350px] gap-10 place-items-center tablet:place-items-start tabletLarge:grid-cols-2 tabletLarge:grid-rows-[150px_150px] desktopSmall:grid-rows-[125px_125px] desktop:grid-cols-[1.5fr_2fr]">
          <div className="tablet:grid grid-cols-11 tabletLarge:grid-cols-8 tabletLarge:order-2">
            <Image
              src="/icons/bathtub.svg"
              alt=""
              width={50}
              height={50}
              className="mb-6 mx-auto tablet:mx-0 tablet:w-10 tablet:h-auto"
              quality={50}
            />
            <Heading
              variant={headingVariant.subheading}
              cssClasses="col-span-5 tabletLarge:ml-4 desktopSmall:ml-0 desktop:-translate-x-6"
            >
              Supporting Services
            </Heading>
            <p className="col-span-full">
              Our Cleaning, Laundry and Gardening Services are offered to our
              Developers, Retirement Estates and NPO&#39;s in support of the
              Nursing or Catering Services we provide. We manage these services
              with strict rules in terms of quality of work, end results, care
              for resident&#39;s property, quality controls and schedules. Part
              of our services is also to assess and minimize our Environmental
              Impact in terms of the chemicals we use and our water and
              electricity consumption.
            </p>
          </div>
          <ImageContainer
            src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/eastlands/images/9U7A4525.jpg"
            alt="Carevita - Supporting Services"
            width={900}
            height={700}
            cssClasses="object-cover w-full h-full tabletLarge:row-span-2"
            smallest={110}
            phone={80}
            tablet={75}
            desktopSmall={35}
            desktop={25}
          />
        </div>
        <div className="grid grid-cols-1 grid-rows-[1fr_280px] tablet:grid-rows-[1fr_350px] gap-10 place-items-center tablet:place-items-start tabletLarge:grid-cols-2 tabletLarge:grid-rows-[150px_150px] desktopSmall:grid-rows-[125px_125px] desktop:grid-cols-[1.5fr_2fr]">
          <div className="tablet:grid grid-cols-11 tabletLarge:grid-cols-8 tabletLarge:order-2">
            <Image
              src="/icons/local_dining.svg"
              alt=""
              width={50}
              height={50}
              className="mb-6 mx-auto tablet:mx-0 tablet:w-10 tablet:h-auto"
              quality={50}
              sizes="(max-width: 650px) 280px, (max-width: 900px) 350px, 290px"
            />
            <Heading
              variant={headingVariant.subheading}
              cssClasses="col-span-5 tabletLarge:ml-4 desktopSmall:ml-0 desktop:-translate-x-6"
            >
              Catering Services
            </Heading>
            <p className="col-span-full">
              We provide nutritionally well-balanced and quality meals to our
              residents. Beautifully presented and served in a way that allows
              our residents to enjoy their meals whilst still feeling dignified
              and knowing that someone really cares about their health and
              dietary requirements. All our menus are analyzed by our dietician
              and prepared by our well-trained and passionate culinary team.
            </p>
          </div>
          <ImageContainer
            src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/the-crescent/images/9U7A6417.jpg"
            alt="Carevita - Catering Services"
            width={900}
            height={700}
            cssClasses="object-cover w-full h-full tabletLarge:row-span-2"
            smallest={110}
            phone={80}
            tablet={75}
            desktopSmall={35}
            desktop={25}
          />
        </div>
      </div>
    </article>
  );
};

export default Services;
