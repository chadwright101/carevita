import Heading, { headingVariant } from "../../../heading";
import ImageContainer from "@/components/utils/image-container";

interface Props {
  about: {
    paragraphs: Array<string>;
    image: { url: string };
  };
  homeName: string;
  whatWeOffer: {
    list: Array<string>;
    pampering?: Array<string>;
    weeklyActivities: Array<string>;
    image: { url: string };
  };
}

const About = ({ about, whatWeOffer, homeName }: Props) => {
  const {
    list,
    pampering,
    weeklyActivities,
    image: whatWeOfferImage,
  } = whatWeOffer;
  const { paragraphs, image: aboutImage } = about;
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
            <p>{about.paragraphs[3]}</p>
          </article>
          <ImageContainer
            src={aboutImage.url}
            alt={`${homeName}`}
            width={1000}
            height={750}
            cssClasses="object-cover h-[250px] phone:h-[275px] tablet:h-[400px] tabletLarge:hidden"
            smallest={90}
            phone={60}
            tablet={60}
            desktopSmall={30}
            desktop={40}
          />
        </div>
      </div>
      <div>
        <article>
          <Heading variant={headingVariant.subheading}>What we offer</Heading>
        </article>
        <div className="grid gap-10">
          <ul className="grid gap-1 list-disc ml-4 gap-x-10 phone:grid-cols-2 tabletLarge:grid-cols-1 desktopSmall:grid-cols-2">
            <ul className="flex flex-col gap-1 list-disc">
              <li>
                Weekly activities
                <ul className="grid gap-1 mt-1 list-[square] ml-8">
                  {weeklyActivities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </li>
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
                <li className="" key={index}>
                  {item}
                </li>
              ))}
            </div>
          </ul>
          <ImageContainer
            src={whatWeOfferImage.url}
            alt={`${homeName} - What we offer`}
            width={1000}
            height={750}
            cssClasses="object-cover h-[250px] phone:h-[275px] tablet:h-[400px] tabletLarge:hidden"
            smallest={90}
            phone={60}
            tablet={60}
            desktopSmall={30}
            desktop={40}
          />
        </div>
      </div>
      <ImageContainer
        src={about.image.url}
        alt={`${homeName}`}
        width={1000}
        height={750}
        cssClasses="hidden object-cover h-[300px] tabletLarge:block desktop:h-[375px]"
        smallest={90}
        phone={60}
        tablet={60}
        desktopSmall={30}
        desktop={40}
      />
      <ImageContainer
        src={whatWeOffer.image.url}
        alt={`${homeName} - What we offer`}
        width={1000}
        height={750}
        cssClasses="hidden object-cover h-[300px] tabletLarge:block desktop:h-[375px]"
        smallest={90}
        phone={60}
        tablet={60}
        desktopSmall={30}
        desktop={40}
      />
    </div>
  );
};

export default About;
