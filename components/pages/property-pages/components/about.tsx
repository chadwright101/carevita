import { DataProps } from "@/components/utils/data-props";
import Heading, { headingVariant } from "../../../heading";
import ImageContainer from "@/components/utils/image-container";
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
    <div className="grid gap-16 tabletLarge:grid-cols-2 tabletLarge:gap-10">
      <div>
        <Heading variant={headingVariant.subheading}>About us</Heading>
        <div className="flex flex-col gap-10">
          <article>
            <p className="mb-4">{paragraphs[0]}</p>
            <p className="mb-4">{paragraphs[1]}</p>
            <p className="mb-4">{paragraphs[2]}</p>
            <p className="mb-4">{paragraphs[3]}</p>
            <p className="mb-4">{paragraphs[4]}</p>
            <p className="mb-4">{paragraphs[5]}</p>
            <p>{paragraphs[6]}</p>
          </article>
          <ImageContainer
            src={aboutImage}
            alt={`${title}`}
            width={1000}
            height={750}
            cssClasses="object-cover h-[250px] phone:h-[275px] tablet:h-[400px] tabletLarge:hidden"
            phone={70}
            desktop={30}
          />
        </div>
      </div>
      <div>
        <article>
          <Heading variant={headingVariant.subheading}>What we offer</Heading>
        </article>
        <div className="grid gap-10">
          <ul
            className={classNames("grid gap-1 list-disc ml-4 gap-x-10", {
              "phone:grid-cols-2 tabletLarge:grid-cols-1 desktopSmall:grid-cols-2":
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
          <ImageContainer
            src={image}
            alt={`${title} - What we offer`}
            width={1000}
            height={750}
            cssClasses="object-cover h-[250px] phone:h-[275px] tablet:h-[400px] tabletLarge:hidden"
            phone={70}
            desktop={30}
          />
        </div>
      </div>
      <ImageContainer
        src={aboutImage}
        alt={`${title}`}
        width={1000}
        height={750}
        cssClasses="hidden object-cover h-[300px] tabletLarge:block desktop:h-[375px]"
        phone={90}
        tabletLarge={60}
        desktop={40}
      />
      <ImageContainer
        src={image}
        alt={`${title} - What we offer`}
        width={1000}
        height={750}
        cssClasses="hidden object-cover h-[300px] tabletLarge:block desktop:h-[375px]"
        phone={90}
        desktop={40}
      />
    </div>
  );
};

export default About;
