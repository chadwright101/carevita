import Image from "next/image";
import Heading, { headingVariant } from "../../ui/heading";
import classNames from "classnames";

interface Props {
  cssClasses?: string;
}

const Services = ({ cssClasses }: Props) => {
  return (
    <section className={classNames(cssClasses)}>
      <Heading
        variant={headingVariant.sectionHeading}
        cssClasses="mb-10 text-center tablet:text-left"
      >
        Services
      </Heading>
      <div className="flex flex-col gap-20 tablet:gap-10">
        <div className="grid gap-y-5 gap-x-10 tablet:grid-cols-2 tablet:grid-rows-[40px_1fr] tablet:items-start">
          <div className="flex flex-col w-full items-center gap-2 tablet:flex-row tablet:gap-5">
            <Image
              src="/assets/icons/ecg-heart.svg"
              alt="Heart icon"
              width={40}
              height={40}
              priority
            />
            <Heading
              variant={headingVariant.subheading}
              cssClasses="text-center tablet:text-left"
            >
              Nursing Services
            </Heading>
          </div>
          <p>
            CareVita&#39;s main priority is to provide professional nursing care
            to our client&#39;s facilities. Adhering to all legal requirements,
            we manage not only the employees and their training but also
            ensuring that the facility is fully compliant according to industry
            standards. Nursing audits are held regularly, giving our clients and
            developers peace of mind when it comes to the management of these
            specialised services.
          </p>
          <Image
            src="/assets/media/serene-park/9U7A5252.jpg"
            alt="Carevita - Nursing Services"
            width={900}
            height={700}
            className="object-cover w-full h-full aspect-video mt-5 tablet:mt-0 tablet:row-start-1 tablet:col-start-1 tablet:row-span-2"
            sizes="(max-width: 425px) 110vw, (max-width: 900px) 75vw, 35vw"
          />
        </div>
        <div className="grid gap-y-5 gap-x-10 tablet:grid-cols-2 tablet:grid-rows-[40px_1fr] tablet:items-start">
          <div className="flex flex-col w-full items-center gap-2 tablet:flex-row tablet:gap-5">
            <Image
              src="/assets/icons/bathtub.svg"
              alt="Bath icon"
              width={40}
              height={40}
            />
            <Heading
              variant={headingVariant.subheading}
              cssClasses="text-center tablet:text-left"
            >
              Supporting Services
            </Heading>
          </div>
          <p>
            Our Cleaning, Laundry and Gardening Services are offered to our
            Developers, Retirement Estates and NPO&#39;s in support of the
            Nursing or Catering Services we provide. We manage these services
            with strict rules in terms of quality of work, end results, care for
            resident&#39;s property, quality controls and schedules. Part of our
            services is also to assess and minimize our Environmental Impact in
            terms of the chemicals we use and our water and electricity
            consumption.
          </p>
          <Image
            src="/assets/media/eastlands/9U7A4525.jpg"
            alt="Carevita - Supporting Services"
            width={900}
            height={700}
            className="object-cover w-full h-full aspect-video mt-5 tablet:mt-0 tablet:row-start-1 tablet:col-start-1 tablet:row-span-2"
            sizes="(max-width: 425px) 110vw, (max-width: 900px) 75vw, 35vw"
          />
        </div>
        <div className="grid gap-y-5 gap-x-10 tablet:grid-cols-2 tablet:grid-rows-[40px_1fr] tablet:items-start">
          <div className="flex flex-col w-full items-center gap-2 tablet:flex-row tablet:gap-5">
            <Image
              src="/assets/icons/local_dining.svg"
              alt="Food icon"
              width={40}
              height={40}
            />
            <Heading
              variant={headingVariant.subheading}
              cssClasses="text-center tablet:text-left"
            >
              Catering Services
            </Heading>
          </div>
          <p>
            We provide nutritionally well-balanced and quality meals to our
            residents. Beautifully presented and served in a way that allows our
            residents to enjoy their meals whilst still feeling dignified and
            knowing that someone really cares about their health and dietary
            requirements. All our menus are analyzed by our dietician and
            prepared by our well-trained and passionate culinary team.
          </p>
          <Image
            src="/assets/media/the-crescent/9U7A6417.jpg"
            alt="Carevita - Catering Services"
            width={900}
            height={700}
            className="object-cover w-full h-full aspect-video mt-5 tablet:mt-0 tablet:row-start-1 tablet:col-start-1 tablet:row-span-2"
            sizes="(max-width: 425px) 110vw, (max-width: 900px) 75vw, 35vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
