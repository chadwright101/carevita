import Image from "next/image";
import Heading, { headingVariant } from "../heading";

interface Props {
  cssClasses?: string;
}

const About = ({ cssClasses }: Props) => {
  return (
    <div className={`flex flex-col gap-10 desktop:flex-row ${cssClasses}`}>
      <main className="flex flex-col gap-4">
        <Heading variant={headingVariant.sectionHeading}>About</Heading>
        <p>
          CareVita was founded in 2018 with the main purpose of breathing new
          life into the Retirement Management Sector.
        </p>
        <p>
          Our business goal is to create a caring and successful company that
          makes a difference in the daily lives of our elderly and frail as well
          as our clients and employees.
        </p>
        <p>
          Servicing from NPO&nbsp;s to Retirement Estates, we have a solid set
          of core values that serves as the foundation of everything we do,
          particularly when it comes to the main aspects of our business:
        </p>
        <ul className="list-disc ml-6">
          <li>Our Clients & Residents</li>
          <li>Nursing & Caregiving</li>
          <li>Our Food & Procurement</li>
          <li>Our Staff & Training</li>
          <li>Health & Safety Cleaning, Laundry & Gardening</li>
          <li>Our Social Responsibility</li>
          <li>Our Environmental Responsibility</li>
          <li>Legal & Industry Specific Requirements</li>
        </ul>
        <p>
          Our core values determine our company culture and priorities, it
          supports our vision of who we are and why we do what we do. They are
          the essence or DNA of our company's identity – our principles, beliefs
          and philosophies.
        </p>
      </main>
      <div className="grid gap-10 place-items-center tablet:grid-cols-2 tablet:gap-6 desktop:gap-10 desktop:grid-cols-1 desktop:grid-rows-[280px_280px] overflow-hidden">
        <Image
          src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/placeholders/_MG_9874.jpg"
          alt=""
          width={900}
          height={450}
          className="w-full h-full object-cover"
        />
        <Image
          src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/placeholders/_MG_9890.jpg "
          alt=""
          width={900}
          height={450}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default About;
