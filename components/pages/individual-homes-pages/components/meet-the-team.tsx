import Image from "next/image";

import Heading, { headingVariant } from "../../../heading";

interface Props {
  meetTheTeam: {
    paragraph: string;
    images: Array<{
      position: string;
      url: string;
      teamMember: string;
      bio: string;
    }>;
  };
  homeName: string;
}

const MeetTheTeam = ({ meetTheTeam, homeName }: Props) => {
  return (
    <div>
      <Heading variant={headingVariant.subheading}>Meet the team</Heading>
      <p>{meetTheTeam.paragraph}</p>
      <div className="flex flex-wrap justify-around gap-8 mt-16 tabletLarge:mt-10 desktop:grid grid-cols-3">
        {meetTheTeam.images.map(({ position, url, teamMember, bio }, index) => (
          <article
            key={index}
            className="flex flex-col items-center gap-8 max-w-[375px] tabletLarge:gap-6 desktop:max-w-full"
          >
            <h4 className="text-larger text-center">{position}</h4>
            <Image
              src={url}
              alt={`${homeName} ${position}`}
              width={400}
              height={400}
              className="object-cover w-[325px] h-[325px] desktop:w-full"
            />

            <ul className="flex flex-col gap-4">
              <li className="text-center text-larger">{teamMember}</li>
              <li>{bio}</li>
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
