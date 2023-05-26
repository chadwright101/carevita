import Heading, { headingVariant } from "../../../heading";
import ImageContainer from "@/components/utils/image-container";

interface Props {
  meetTheTeam: {
    images: Array<{
      position: string;
      url: string;
      teamMember: string;
    }>;
  };
  homeName: string;
}

const MeetTheTeam = ({ meetTheTeam, homeName }: Props) => {
  return (
    <div>
      <Heading variant={headingVariant.subheading}>Meet the team</Heading>
      <div className="flex flex-col items-center tablet:grid grid-cols-2 desktopSmall:flex desktopSmall:flex-row tabletLarge:flex-wrap justify-around gap-x-8 gap-y-10 desktop:gap-y-16 mt-16 tabletLarge:mt-10 desktop:justify-center">
        {meetTheTeam.images.map(({ position, url, teamMember }, index) => (
          <div key={index}>
            <article className="flex flex-col items-center gap-8 max-w-[375px] tabletLarge:gap-6 desktop:max-w-full">
              <h4 className="text-larger text-center">{position}</h4>
              <ImageContainer
                src={url}
                alt={`${homeName} ${position}`}
                width={400}
                height={400}
                cssClasses="object-cover w-[325px] h-[400px] desktop:w-[400px] desktop:h-[500px]"
                phone={250}
                tablet={250}
                desktopSmall={250}
                desktop={400}
              />
              <p className="text-center text-larger">{teamMember}</p>
            </article>

            {index < meetTheTeam.images.length - 1 && (
              <hr className="text-black mt-10 tablet:hidden" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
