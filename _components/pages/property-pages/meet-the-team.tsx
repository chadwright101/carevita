import Image from "next/image";
import Heading, { headingVariant } from "../../ui/heading";

interface Props {
  meetTheTeam: Array<{
    position: string;
    url: string;
    teamMember: string;
  }>;
  homeName: string;
}

const MeetTheTeam = ({ meetTheTeam, homeName }: Props) => {
  return (
    <div>
      <Heading
        variant={headingVariant.subheading}
        cssClasses="mb-5 text-center tablet:text-left"
      >
        Meet the team
      </Heading>
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-10">
        {meetTheTeam.map(({ position, url, teamMember }, index) => (
          <article key={index}>
            <div className="flex flex-col items-center max-w-[400px] desktop:max-w-full">
              <Image
                src={url}
                alt={`${homeName} ${position}`}
                width={400}
                height={400}
                className="object-cover mb-5 aspect-[3.5/4]"
              />
              <h4 className="text-larger text-center">{position}</h4>
              <p className="text-center text-larger">{teamMember}</p>
            </div>

            {index < meetTheTeam.length - 1 && (
              <hr className="text-black/25 mt-10 tablet:hidden" />
            )}
          </article>
        ))}
      </ul>
    </div>
  );
};

export default MeetTheTeam;
