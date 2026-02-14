import Image from "next/image";
import { DataProps } from "@/_lib/utils/data-props";
import Heading, { headingVariant } from "../../ui/heading";
import classNames from "classnames";

interface Props {
  general: {
    title: string;
  };
  about: {
    paragraphs: string[];
    image: string;
  };
  whatWeOffer: {
    list: string[];
    pampering?: string[];
    weeklyActivities?: string[];
    image: string;
  };
}

const About = ({
  general: { title },
  about: { paragraphs, image: aboutImage },
  whatWeOffer: { list, pampering, weeklyActivities, image },
}: Props) => {
  return (
    <div className="grid gap-16 tablet:grid-cols-2 tablet:gap-10">
      <div id="about" className="scroll-mt-32">
        <Heading
          variant={headingVariant.subheading}
          cssClasses="mb-5 text-center tablet:text-left"
        >
          About us
        </Heading>
        <div className="flex flex-col gap-10">
          <article>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={classNames({
                  "mb-4": index !== paragraphs.length - 1,
                })}
              >
                {paragraph}
              </p>
            ))}
          </article>
          <Image
            src={aboutImage}
            alt={`${title}`}
            width={800}
            height={600}
            className="object-cover aspect-video tablet:hidden"
          />
        </div>
      </div>
      <div>
        <article>
          <Heading variant={headingVariant.subheading} cssClasses="mb-5">
            What we offer
          </Heading>
        </article>
        <div className="grid gap-10">
          <ul
            className={classNames("grid gap-1 list-disc ml-4 gap-x-10", {
              "phone:grid-cols-2 tablet:grid-cols-1 desktop:grid-cols-2":
                weeklyActivities || pampering,
            })}
          >
            <ul className="flex flex-col gap-1 list-disc">
              {weeklyActivities && (
                <li>
                  Weekly activities
                  <ul className="grid gap-1 mt-1 list-[square] ml-8">
                    {weeklyActivities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </li>
              )}
              {pampering && (
                <li>
                  Pampering
                  <ul className="grid mt-1 gap-1 list-[square] ml-8">
                    {pampering.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
            <div className="flex flex-col gap-1">
              {list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </div>
          </ul>
          <Image
            src={image}
            alt={`${title} - What we offer`}
            width={800}
            height={600}
            className="object-cover aspect-video tablet:hidden"
          />
        </div>
      </div>
      <Image
        src={aboutImage}
        alt={`${title}`}
        width={650}
        height={450}
        className="hidden object-cover aspect-video tablet:block"
      />
      <Image
        src={image}
        alt={`${title} - What we offer`}
        width={650}
        height={450}
        className="hidden object-cover aspect-video tablet:block"
      />
    </div>
  );
};

export default About;
