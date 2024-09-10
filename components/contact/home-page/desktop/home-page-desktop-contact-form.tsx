import Link from "next/link";
import { useState } from "react";

import Button from "@/components/button";
import ImageContainer from "@/components/utils/image-container";

import classNames from "classnames";

import crescentData from "@/data/crescent-data.json";
import eastlandsData from "@/data/eastlands-data.json";
import sereneData from "@/data/serene-data.json";
import parsonageData from "@/data/parsonage-data.json";
import { fetchEmail } from "@/lib/fetchEmail";
import { fetchPhone } from "@/lib/fetchPhone";

const HomePageDesktopContactForm = () => {
  const [showCrescent, setShowCrescent] = useState(false);
  const [showEastlands, setShowEastlands] = useState(false);
  const [showSerenePark, setShowSerenePark] = useState(false);
  const [showParsonage, setShowParsonage] = useState(false);
  const [showCrescentEmail, setShowCrescentEmail] = useState("");
  const [showEastlandsEmail, setShowEastlandsEmail] = useState("");
  const [showSereneParkEmail, setShowSereneParkEmail] = useState("");
  const [showParsonageEmail, setShowParsonageEmail] = useState("");
  const [showCrescentPhone, setShowCrescentPhone] = useState("");
  const [showEastlandsPhone, setShowEastlandsPhone] = useState("");
  const [showSereneParkPhone, setShowSereneParkPhone] = useState("");
  const [showParsonagePhone, setShowParsonagePhone] = useState("");

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmited, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitting(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const property = formData.get("property");
    const message = formData.get("message");

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-email-code": process.env.NEXT_PUBLIC_API_EMAIL_SECRET_CODE || "",
      },
      body: JSON.stringify({ name, phone, email, message, property }),
    });

    if (response.ok) {
      formData.delete("name");
      formData.delete("email");
      formData.delete("number");
      formData.delete("message");
      setFormSubmitting(false);
      setFormSubmitted(true);
    } else {
      console.error("Error sending email", response);
      setFormError(
        "There was an error sending the email, please try again. If the problem persists, please contact us via phone."
      );
      setFormSubmitting(false);
    }
  };

  return (
    <div className="hidden desktop:block max-w-[1400px] mx-auto">
      <p className="text-white mb-10 pb-10 border-b border-white">
        Please select which facility you&#39;d like to get in touch with...
      </p>
      <div className="grid grid-cols-4">
        {/* the crescent */}
        <Button
          desktopHomesForm
          onClick={() => {
            setShowCrescent(true);
            setShowParsonage(false);
            setShowEastlands(false);
            setShowSerenePark(false);
            setFormSubmitted(false);
            setFormError("");
          }}
          extendedTitle={crescentData.general.title}
          location={crescentData.general.location}
          cssClasses={classNames("ease-in-out duration-300 text-left", {
            "hover:scale-105 hover:-mb-[10px]": !showCrescent,
            "border-b-2 border-white pb-2 -mb-[10px]": showCrescent,
          })}
          arrowCssClasses={classNames("", {
            hidden: !showCrescent,
          })}
          homeIconUrl="/assets/icons/beach-white.svg"
          homeIconAlt="Beach umbrella icon"
        />

        {/* eastlands */}
        <Button
          desktopHomesForm
          onClick={() => {
            setShowCrescent(false);
            setShowEastlands(true);
            setShowParsonage(false);
            setShowSerenePark(false);
            setFormSubmitted(false);
            setFormError("");
          }}
          extendedTitle={eastlandsData.general.title}
          location={eastlandsData.general.location}
          cssClasses={classNames("ease-in-out duration-300", {
            "hover:scale-105 hover:-mb-[10px]": !showEastlands,
            "border-b-2 border-white pb-2 -mb-[10px]": showEastlands,
          })}
          arrowCssClasses={classNames("", {
            hidden: !showEastlands,
          })}
          homeIconUrl="/assets/icons/flower-white.svg"
          homeIconAlt="Flower icon"
        />

        {/* serenepark */}
        <Button
          desktopHomesForm
          onClick={() => {
            setShowCrescent(false);
            setShowEastlands(false);
            setShowParsonage(false);
            setShowSerenePark(true);
            setFormSubmitted(false);
            setFormError("");
          }}
          extendedTitle={sereneData.general.title}
          location={sereneData.general.location}
          cssClasses={classNames("ease-in-out duration-300", {
            "hover:scale-105 hover:-mb-[10px]": !showSerenePark,
            "border-b-2 border-white pb-2 -mb-[10px]": showSerenePark,
          })}
          arrowCssClasses={classNames("", {
            hidden: !showSerenePark,
          })}
          homeIconUrl="/assets/icons/leaves-white.svg"
          homeIconAlt="Leaves icon"
        />

        {/* parsonage */}
        <Button
          desktopHomesForm
          onClick={() => {
            setShowCrescent(false);
            setShowEastlands(false);
            setShowSerenePark(false);
            setShowParsonage(true);
            setFormSubmitted(false);
            setFormError("");
          }}
          extendedTitle={parsonageData.general.title}
          location={parsonageData.general.location}
          cssClasses={classNames("ease-in-out duration-300", {
            "hover:scale-105 hover:-mb-[10px]": !showParsonage,
            "border-b-2 border-white pb-2 -mb-[10px]": showParsonage,
          })}
          arrowCssClasses={classNames("", {
            hidden: !showParsonage,
          })}
          homeIconUrl="/assets/icons/sun-white.svg"
          homeIconAlt="Sun icon"
        />
      </div>

      {/* the crescent */}
      {showCrescent && (
        <div className="grid grid-cols-2 gap-10 mt-10">
          <div>
            <ul className="flex flex-col gap-2 mb-10">
              <li className="grid grid-cols-[80px_1fr] mr-auto">
                <p className="text-white text-larger font-light">Email:</p>
                {showCrescentEmail ? (
                  <Link
                    prefetch={false}
                    href={`mailto:${showCrescentEmail}`}
                    className="text-white text-larger hover:underline underline-offset-4 decoration-1"
                  >
                    {showCrescentEmail}
                  </Link>
                ) : (
                  <button
                    className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
                    onClick={async () => {
                      const email = await fetchEmail("crescent");
                      setShowCrescentEmail(email);
                    }}
                  >
                    Show email address
                  </button>
                )}
              </li>
              <li className="grid grid-cols-[80px_1fr] mr-auto">
                <p className="text-white text-larger font-light">Phone:</p>
                {showCrescentPhone ? (
                  <Link
                    prefetch={false}
                    href={`tel:${showCrescentPhone}`}
                    className="text-white text-larger hover:underline underline-offset-4 decoration-1"
                  >
                    {showCrescentPhone}
                  </Link>
                ) : (
                  <button
                    className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
                    onClick={async () => {
                      const phone = await fetchPhone("crescent");
                      setShowCrescentPhone(phone);
                    }}
                  >
                    Show phone number
                  </button>
                )}
              </li>
            </ul>
            {!formSubmited ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="property"
                  defaultValue={crescentData.general.title}
                  className="hidden"
                />
                <input type="text" name="_honey" className="hidden" />
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-larger text-white font-thin"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Full name"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-larger text-white font-thin"
                  >
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Phone number"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here"
                    className="pl-2 py-1.5"
                    rows={3}
                  />
                </div>
                <div className="mt-5">
                  {!formSubmitting ? (
                    <Button form>Submit</Button>
                  ) : (
                    <Button form disabled>
                      <div className="flex justify-center items-center w-[77px] h-[36px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-y-2 border-l-2 border-white"></div>
                      </div>
                    </Button>
                  )}
                </div>
                {formError && <p className="text-white italic">{formError}</p>}
              </form>
            ) : (
              <p className="text-white text-subheading font-thin italic underline-offset-8 decoration-1">
                Thank you for your message. We will be in touch soon.
              </p>
            )}
          </div>
          <div className="overflow-hidden">
            <ImageContainer
              src="/assets/media/the-crescent/Crescent-5.jpg"
              alt="Contact The Crescent"
              width={505}
              height={680}
              cssClasses="object-cover w-full h-full"
              desktop={35}
            />
          </div>
        </div>
      )}
      {showEastlands && (
        <div className="grid grid-cols-2 gap-10 mt-10">
          <div>
            <ul className="flex flex-col gap-2 mb-10">
              <li className="grid grid-cols-[80px_1fr] mr-auto">
                <p className="text-white text-larger font-light">Email:</p>
                {showEastlandsEmail ? (
                  <Link
                    prefetch={false}
                    href={`mailto:${showEastlandsEmail}`}
                    className="text-white text-larger hover:underline underline-offset-4 decoration-1"
                  >
                    {showEastlandsEmail}
                  </Link>
                ) : (
                  <button
                    className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
                    onClick={async () => {
                      const email = await fetchEmail("eastlands");
                      setShowEastlandsEmail(email);
                    }}
                  >
                    Show email address
                  </button>
                )}
              </li>
              <li className="grid grid-cols-[80px_1fr] mr-auto">
                <p className="text-white text-larger font-light">Phone:</p>
                {showEastlandsPhone ? (
                  <Link
                    prefetch={false}
                    href={`tel:${showEastlandsPhone}`}
                    className="text-white text-larger hover:underline underline-offset-4 decoration-1"
                  >
                    {showEastlandsPhone}
                  </Link>
                ) : (
                  <button
                    className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
                    onClick={async () => {
                      const phone = await fetchPhone("eastlands");
                      setShowEastlandsPhone(phone);
                    }}
                  >
                    Show phone number
                  </button>
                )}
              </li>
            </ul>
            {!formSubmited ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="property"
                  defaultValue={eastlandsData.general.title}
                  className="hidden"
                />
                <input type="text" name="_honey" className="hidden" />
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-larger text-white font-thin"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Full name"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-larger text-white font-thin"
                  >
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Phone number"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here"
                    className="pl-2 py-1.5"
                    rows={3}
                  />
                </div>
                <div className="mt-5">
                  {!formSubmitting ? (
                    <Button form>Submit</Button>
                  ) : (
                    <Button form disabled>
                      <div className="flex justify-center items-center w-[77px] h-[36px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-y-2 border-l-2 border-white"></div>
                      </div>
                    </Button>
                  )}
                </div>
                {formError && <p className="text-white italic">{formError}</p>}
              </form>
            ) : (
              <p className="text-white text-subheading font-thin italic underline-offset-8 decoration-1">
                Thank you for your message. We will be in touch soon.
              </p>
            )}
          </div>
          <div className="overflow-hidden">
            <ImageContainer
              src="/assets/media/eastlands/9U7A4633-HDR.jpg"
              alt="Contact Eastlands"
              width={505}
              height={680}
              cssClasses="object-cover w-full h-full"
              desktop={35}
            />
          </div>
        </div>
      )}
      {showSerenePark && (
        <div className="grid grid-cols-2 gap-10 mt-10">
          <div>
            <ul className="flex flex-col gap-2 mb-10">
              <li className="grid grid-cols-[80px_1fr] mr-auto">
                <p className="text-white text-larger font-light">Email:</p>
                {showSereneParkEmail ? (
                  <Link
                    prefetch={false}
                    href={`mailto:${showSereneParkEmail}`}
                    className="text-white text-larger hover:underline underline-offset-4 decoration-1"
                  >
                    {showSereneParkEmail}
                  </Link>
                ) : (
                  <button
                    className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
                    onClick={async () => {
                      const email = await fetchEmail("serene");
                      setShowSereneParkEmail(email);
                    }}
                  >
                    Show email address
                  </button>
                )}
              </li>
              <li className="grid grid-cols-[80px_1fr] mr-auto">
                <p className="text-white text-larger font-light">Phone:</p>
                {showSereneParkPhone ? (
                  <Link
                    prefetch={false}
                    href={`tel:${showSereneParkPhone}`}
                    className="text-white text-larger hover:underline underline-offset-4 decoration-1"
                  >
                    {showSereneParkPhone}
                  </Link>
                ) : (
                  <button
                    className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
                    onClick={async () => {
                      const phone = await fetchPhone("serene");
                      setShowSereneParkPhone(phone);
                    }}
                  >
                    Show phone number
                  </button>
                )}
              </li>
            </ul>
            {!formSubmited ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="property"
                  defaultValue={sereneData.general.title}
                  className="hidden"
                />
                <input type="text" name="_honey" className="hidden" />
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-larger text-white font-thin"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Full name"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-larger text-white font-thin"
                  >
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Phone number"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here"
                    className="pl-2 py-1.5"
                    rows={3}
                  />
                </div>
                <div className="mt-5">
                  {!formSubmitting ? (
                    <Button form>Submit</Button>
                  ) : (
                    <Button form disabled>
                      <div className="flex justify-center items-center w-[77px] h-[36px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-y-2 border-l-2 border-white"></div>
                      </div>
                    </Button>
                  )}
                </div>
                {formError && <p className="text-white italic">{formError}</p>}
              </form>
            ) : (
              <p className="text-white text-subheading font-thin italic underline-offset-8 decoration-1">
                Thank you for your message. We will be in touch soon.
              </p>
            )}
          </div>
          <div className="overflow-hidden">
            <ImageContainer
              src="/assets/media/serene-park/9U7A5003-HDR.jpg"
              alt="Contact Serene Park"
              width={505}
              height={680}
              cssClasses="object-cover w-full h-full"
              desktop={35}
            />
          </div>
        </div>
      )}
      {showParsonage && (
        <div className="grid grid-cols-2 gap-10 mt-10">
          <div>
            <ul className="flex flex-col gap-2 mb-10">
              <li className="grid grid-cols-[80px_1fr] mr-auto">
                <p className="text-white text-larger font-light">Email:</p>
                {showParsonageEmail ? (
                  <Link
                    prefetch={false}
                    href={`mailto:${showParsonageEmail}`}
                    className="text-white text-larger hover:underline underline-offset-4 decoration-1"
                  >
                    {showParsonageEmail}
                  </Link>
                ) : (
                  <button
                    className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
                    onClick={async () => {
                      const email = await fetchEmail("parsonage");
                      setShowParsonageEmail(email);
                    }}
                  >
                    Show email address
                  </button>
                )}
              </li>
              <li className="grid grid-cols-[80px_1fr] mr-auto">
                <p className="text-white text-larger font-light">Phone:</p>
                {showParsonagePhone ? (
                  <Link
                    prefetch={false}
                    href={`tel:${showParsonagePhone}`}
                    className="text-white text-larger hover:underline underline-offset-4 decoration-1"
                  >
                    {showParsonagePhone}
                  </Link>
                ) : (
                  <button
                    className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
                    onClick={async () => {
                      const phone = await fetchPhone("parsonage");
                      setShowParsonagePhone(phone);
                    }}
                  >
                    Show phone number
                  </button>
                )}
              </li>
            </ul>
            {!formSubmited ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="property"
                  defaultValue={parsonageData.general.title}
                  className="hidden"
                />
                <input type="text" name="_honey" className="hidden" />
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-larger text-white font-thin"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Full name"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-larger text-white font-thin"
                  >
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Phone number"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here"
                    className="pl-2 py-1.5"
                    rows={3}
                  />
                </div>
                <div className="mt-5">
                  {!formSubmitting ? (
                    <Button form>Submit</Button>
                  ) : (
                    <Button form disabled>
                      <div className="flex justify-center items-center w-[77px] h-[36px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-y-2 border-l-2 border-white"></div>
                      </div>
                    </Button>
                  )}
                </div>
                {formError && <p className="text-white italic">{formError}</p>}
              </form>
            ) : (
              <p className="text-white text-subheading font-thin italic underline-offset-8 decoration-1">
                Thank you for your message. We will be in touch soon.
              </p>
            )}
          </div>
          <div className="overflow-hidden">
            <ImageContainer
              src="/assets/media/parsonage-street/9U7A3468.jpg"
              alt="Contact Serene Park"
              width={505}
              height={680}
              cssClasses="object-cover w-full h-full"
              desktop={35}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageDesktopContactForm;
