import Image from "next/image";
import Heading, { headingVariant } from "../../ui/heading";
import classNames from "classnames";
import { Service } from "@/_types/home-types";

interface Props {
  cssClasses?: string;
  services: Service[];
}

const Services = ({ cssClasses, services }: Props) => {
  return (
    <section className={classNames(cssClasses)}>
      <Heading
        variant={headingVariant.sectionHeading}
        cssClasses="mb-10 text-center tablet:text-left"
      >
        Services
      </Heading>
      <div className="flex flex-col gap-20 tablet:gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="grid gap-y-5 gap-x-10 tablet:grid-cols-2 tablet:grid-rows-[40px_1fr] tablet:items-start"
          >
            <Heading
              variant={headingVariant.subheading}
              cssClasses="text-center tablet:text-left"
            >
              {service.title}
            </Heading>
            <p>{service.description}</p>
            <Image
              src={service.image}
              alt={`Carevita - ${service.title}`}
              width={900}
              height={700}
              className="object-cover w-full h-full aspect-video mt-5 tablet:mt-0 tablet:row-start-1 tablet:col-start-1 tablet:row-span-2"
              sizes="(max-width: 425px) 110vw, (max-width: 900px) 75vw, 35vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
