import { DataProps, GeneralDataProps } from "@/components/utils/data-props";
import Heading, { headingVariant } from "../../heading";
import ImageContainer from "@/components/utils/image-container";

interface Props extends GeneralDataProps {
  cssClasses?: string;
}

const About = ({
  cssClasses,
  data: {
    homePage: {
      about: { paragraphs, list },
    },
  },
}: Props) => {
  return (
    <div className={`${cssClasses}`}>
      <main className="grid desktop:grid-cols-[1fr_550px] gap-10">
        <div className="flex flex-col gap-4">
          <Heading variant={headingVariant.sectionHeading}>About</Heading>
          <p>{paragraphs[0]}</p>
          <p>{paragraphs[1]}</p>
          <p>{paragraphs[2]}</p>
          <ul className="list-disc ml-6">
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>{paragraphs[3]}</p>
        </div>
        <div className="grid grid-rows-2 gap-10 mt-6 tablet:grid-rows-[400px_400px] tabletLarge:grid-cols-2 tabletLarge:grid-rows-1 desktop:grid-cols-1 desktop:grid-rows-[300px_300px]">
          <ImageContainer
            src="/assets/media/the-crescent/9U7A6242.jpg"
            alt="Carevita - About us"
            width={900}
            height={450}
            cssClasses="object-cover w-full h-full"
            tablet={90}
            desktopSmall={50}
            desktop={30}
          />
          <ImageContainer
            src="/assets/media/eastlands/9U7A4662.jpg"
            alt="Carevita - About us"
            width={900}
            height={450}
            cssClasses="object-cover w-full h-full"
            tablet={90}
            desktopSmall={50}
            desktop={30}
          />
        </div>
      </main>
    </div>
  );
};

export default About;
