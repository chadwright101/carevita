import ShowEmailAddress from "@/_components/ui/contact/show-email-address";
import ShowPhoneNumber from "@/_components/ui/contact/show-phone-number";
import classNames from "classnames";

interface ContactInfoListProps {
  propertyId: string;
  cssClasses?: string;
}

const ContactInfoList = ({ propertyId, cssClasses }: ContactInfoListProps) => {
  return (
    <ul className={classNames("flex flex-col gap-6 mt-4 tablet:gap-4 desktop:gap-2 desktop:mb-10 desktop:mt-0", cssClasses)}>
      <li className="grid grid-cols-[80px_1fr] desktop:mr-auto">
        <p className="text-white text-larger font-light">Email:</p>
        <div className="place-items-start">
          <ShowEmailAddress property={propertyId} />
        </div>
      </li>
      <li className="grid grid-cols-[80px_1fr] desktop:mr-auto">
        <p className="text-white text-larger font-light">Phone:</p>
        <div className="place-items-start">
          <ShowPhoneNumber property={propertyId} />
        </div>
      </li>
    </ul>
  );
};

export default ContactInfoList;
