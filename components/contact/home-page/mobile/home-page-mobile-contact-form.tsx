import Link from "next/link";
import { useState } from "react";

import Button from "@/components/button";

import crescentData from "@/data/crescent-data.json";
import eastlandsData from "@/data/eastlands-data.json";
import sereneData from "@/data/serene-data.json";
import parsonageData from "@/data/parsonage-data.json";
import hartlandData from "@/data/hartland-data.json";

import { fetchEmail } from "@/lib/fetchEmail";
import { fetchPhone } from "@/lib/fetchPhone";

const HomePageMobileContactForm = () => {
  const [showCrescent, setShowCrescent] = useState(false);
  const [showEastlands, setShowEastlands] = useState(false);
  const [showSerenePark, setShowSerenePark] = useState(false);
  const [showParsonage, setShowParsonage] = useState(false);
  const [showHartland, setShowHartland] = useState(false);
  const [showCrescentEmail, setShowCrescentEmail] = useState("");
  const [showEastlandsEmail, setShowEastlandsEmail] = useState("");
  const [showSereneParkEmail, setShowSereneParkEmail] = useState("");
  const [showParsonageEmail, setShowParsonageEmail] = useState("");
  const [showHartlandEmail, setShowHartlandEmail] = useState("");
  const [showCrescentPhone, setShowCrescentPhone] = useState("");
  const [showEastlandsPhone, setShowEastlandsPhone] = useState("");
  const [showSereneParkPhone, setShowSereneParkPhone] = useState("");
  const [showParsonagePhone, setShowParsonagePhone] = useState("");
  const [showHartlandPhone, setShowHartlandPhone] = useState("");

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
    <div className="desktop:hidden">
      {/* the crescent form */}
      <div className="mt-10 max-w-[1400px] mx-auto">
        {!showCrescent &&
          !showEastlands &&
          !showSerenePark &&
          !showParsonage &&
          !showHartland && (
            <>
              <p className="text-white mb-8">
                Please select which facility you&#39;d like to get in touch
                with...
              </p>
              <Button
                mobileHomesForm
                onClick={() => setShowCrescent(!showCrescent)}
                cssClasses="text-left"
                extendedTitle={crescentData.general.title}
                location={crescentData.general.location}
                homeIconUrl="/assets/icons/beach-blue.svg"
                homeIconAlt="Beach umbrella icon"
              />
            </>
          )}

        {showCrescent && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h4 className="text-white text-center font-light tablet:text-left">
                {crescentData.general.title}
              </h4>
              <p className="text-white text-center tablet:text-left">
                {crescentData.general.location}
              </p>
            </div>
            <ul className="flex flex-col gap-6 mt-4 tablet:gap-4 desktop:gap-2">
              <li className="grid grid-cols-[80px_1fr]">
                <p className="text-white text-larger font-light">Email:</p>
                <div className="place-items-start">
                  {showCrescentEmail ? (
                    <Link
                      prefetch={false}
                      href={`mailto:${showCrescentEmail}`}
                      className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                    >
                      {showCrescentEmail}
                    </Link>
                  ) : (
                    <button
                      className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                      onClick={async () => {
                        const email = await fetchEmail("crescent");
                        setShowCrescentEmail(email);
                      }}
                    >
                      Show email address
                    </button>
                  )}
                </div>
              </li>
              <li className="grid grid-cols-[80px_1fr]">
                <p className="text-white text-larger font-light">Phone:</p>
                <div className="place-items-start">
                  {showCrescentPhone ? (
                    <Link
                      prefetch={false}
                      href={`tel:${showCrescentPhone}`}
                      className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                    >
                      {showCrescentPhone}
                    </Link>
                  ) : (
                    <button
                      className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                      onClick={async () => {
                        const phone = await fetchPhone("crescent");
                        setShowCrescentPhone(phone);
                      }}
                    >
                      Show phone number
                    </button>
                  )}
                </div>
              </li>
            </ul>
            {!formSubmited ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  name="property"
                  defaultValue={crescentData.general.title}
                  className="hidden"
                />
                <input type="text" name="_honey" className="hidden" />
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex justify-between mt-2">
                  {!formSubmitting ? (
                    <Button form onClick={() => setShowCrescent(false)}>
                      Submit
                    </Button>
                  ) : (
                    <Button form disabled>
                      <div className="flex justify-center items-center w-[77px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-y-2 border-l-2 border-white"></div>
                      </div>
                    </Button>
                  )}
                  <Button
                    formBack
                    onClick={() => {
                      setShowCrescent(false);
                      setFormSubmitted(false);
                    }}
                  >
                    Back
                  </Button>
                </div>
                {formError && <p className="text-white italic">{formError}</p>}
              </form>
            ) : (
              <>
                <p className="text-white text-larger italic py-4">
                  Thank you for your message, we will be in touch ASAP...
                </p>
                <div className="flex justify-start">
                  <Button
                    formBack
                    onClick={() => {
                      setShowCrescent(false);
                      setFormSubmitted(false);
                    }}
                    cssClasses=""
                  >
                    Back
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* eastlands form */}

      <div className="mt-10 max-w-[1400px] mx-auto">
        {!showCrescent &&
          !showEastlands &&
          !showSerenePark &&
          !showParsonage &&
          !showHartland && (
            <Button
              mobileHomesForm
              onClick={() => {
                setShowEastlands(!showEastlands);
                setFormError("");
              }}
              cssClasses="text-left"
              extendedTitle={eastlandsData.general.title}
              location={eastlandsData.general.location}
              homeIconUrl="/assets/icons/flower-blue.svg"
              homeIconAlt="Flower icon"
            />
          )}

        {showEastlands && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h4 className="text-white text-center font-light tablet:text-left">
                {eastlandsData.general.title}
              </h4>
              <p className="text-white text-center tablet:text-left">
                {eastlandsData.general.location}
              </p>
            </div>
            <ul className="flex flex-col gap-6 mt-4 tablet:gap-4 desktop:gap-2">
              <li className="grid grid-cols-[80px_1fr]">
                <p className="text-white text-larger font-light">Email:</p>
                <div className="place-items-start">
                  {showEastlandsEmail ? (
                    <Link
                      prefetch={false}
                      href={`mailto:${showEastlandsEmail}`}
                      className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                    >
                      {showEastlandsEmail}
                    </Link>
                  ) : (
                    <button
                      className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                      onClick={async () => {
                        const email = await fetchEmail("eastlands");
                        setShowEastlandsEmail(email);
                      }}
                    >
                      Show email address
                    </button>
                  )}
                </div>
              </li>
              <li className="grid grid-cols-[80px_1fr]">
                <p className="text-white text-larger font-light">Phone:</p>
                <div className="place-items-start">
                  {showEastlandsPhone ? (
                    <Link
                      prefetch={false}
                      href={`tel:${showEastlandsPhone}`}
                      className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                    >
                      {showEastlandsPhone}
                    </Link>
                  ) : (
                    <button
                      className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                      onClick={async () => {
                        const phone = await fetchPhone("eastlands");
                        setShowEastlandsPhone(phone);
                      }}
                    >
                      Show phone number
                    </button>
                  )}
                </div>
              </li>
            </ul>
            {!formSubmited ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  name="property"
                  defaultValue={eastlandsData.general.title}
                  className="hidden"
                />
                <input type="text" name="_honey" className="hidden" />
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex justify-between mt-2">
                  {!formSubmitting ? (
                    <Button form onClick={() => setShowEastlands(false)}>
                      Submit
                    </Button>
                  ) : (
                    <Button form disabled>
                      <div className="flex justify-center items-center w-[77px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-y-2 border-l-2 border-white"></div>
                      </div>
                    </Button>
                  )}
                  <Button
                    formBack
                    onClick={() => {
                      setShowEastlands(false);
                      setFormSubmitted(false);
                    }}
                  >
                    Back
                  </Button>
                </div>
                {formError && <p className="text-white italic">{formError}</p>}
              </form>
            ) : (
              <>
                <p className="text-white text-larger italic py-4">
                  Thank you for your message, we will be in touch ASAP...
                </p>
                <div className="flex justify-start">
                  <Button
                    formBack
                    onClick={() => {
                      setShowEastlands(false);
                      setFormSubmitted(false);
                    }}
                    cssClasses=""
                  >
                    Back
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* serenepark form */}

      <div className="mt-10 max-w-[1400px] mx-auto">
        {!showCrescent &&
          !showEastlands &&
          !showSerenePark &&
          !showParsonage &&
          !showHartland && (
            <Button
              mobileHomesForm
              onClick={() => {
                setShowSerenePark(!showSerenePark);
                setFormError("");
              }}
              cssClasses="text-left"
              extendedTitle={sereneData.general.title}
              location={sereneData.general.location}
              homeIconUrl="/assets/icons/leaves-blue.svg"
              homeIconAlt="Leaves icon"
            />
          )}

        {showSerenePark && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h4 className="text-white text-center font-light tablet:text-left">
                {sereneData.general.title}
              </h4>
              <p className="text-white text-center tablet:text-left">
                {sereneData.general.location}
              </p>
            </div>
            <ul className="flex flex-col  gap-6 mt-4 tablet:gap-4 desktop:gap-2">
              <li className="grid grid-cols-[80px_1fr]">
                <p className="text-white text-larger font-light">Email:</p>
                <div className="place-items-start">
                  {showSereneParkEmail ? (
                    <Link
                      prefetch={false}
                      href={`mailto:${showSereneParkEmail}`}
                      className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                    >
                      {showSereneParkEmail}
                    </Link>
                  ) : (
                    <button
                      className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                      onClick={async () => {
                        const email = await fetchEmail("serene");
                        setShowSereneParkEmail(email);
                      }}
                    >
                      Show email address
                    </button>
                  )}
                </div>
              </li>
              <li className="grid grid-cols-[80px_1fr]">
                <p className="text-white text-larger font-light">Phone:</p>
                <div className="place-items-start">
                  {showSereneParkPhone ? (
                    <Link
                      prefetch={false}
                      href={`tel:${showSereneParkPhone}`}
                      className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                    >
                      {showSereneParkPhone}
                    </Link>
                  ) : (
                    <button
                      className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                      onClick={async () => {
                        const phone = await fetchPhone("serene");
                        setShowSereneParkPhone(phone);
                      }}
                    >
                      Show phone number
                    </button>
                  )}
                </div>
              </li>
            </ul>
            {!formSubmited ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  name="subject"
                  defaultValue={`Website Contact Form - ${sereneData.general.title}`}
                  className="hidden"
                />
                <input type="text" name="_honey" className="hidden" />
                <input
                  type="text"
                  name="property"
                  defaultValue={sereneData.general.title}
                  className="hidden"
                />
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex justify-between mt-2">
                  {!formSubmitting ? (
                    <Button form onClick={() => setShowSerenePark(false)}>
                      Submit
                    </Button>
                  ) : (
                    <Button form disabled>
                      <div className="flex justify-center items-center w-[77px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-y-2 border-l-2 border-white"></div>
                      </div>
                    </Button>
                  )}
                  <Button
                    formBack
                    onClick={() => {
                      setShowSerenePark(false);
                      setFormSubmitted(false);
                    }}
                  >
                    Back
                  </Button>
                </div>
                {formError && <p className="text-white italic">{formError}</p>}
              </form>
            ) : (
              <>
                <p className="text-white text-larger italic py-4">
                  Thank you for your message, we will be in touch ASAP...
                </p>
                <div className="flex justify-start">
                  <Button
                    formBack
                    onClick={() => {
                      setShowSerenePark(false);
                      setFormSubmitted(false);
                    }}
                    cssClasses=""
                  >
                    Back
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* parsonage form */}

      <div className="mt-10 max-w-[1400px] mx-auto">
        {!showCrescent &&
          !showEastlands &&
          !showSerenePark &&
          !showParsonage &&
          !showHartland && (
            <Button
              mobileHomesForm
              onClick={() => {
                setShowParsonage(!showParsonage);
                setFormError("");
              }}
              cssClasses="text-left"
              extendedTitle={parsonageData.general.title}
              location={parsonageData.general.location}
              homeIconUrl="/assets/icons/sun-blue.svg"
              homeIconAlt="Sun icon"
            />
          )}

        {showParsonage && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h4 className="text-white text-center font-light tablet:text-left">
                {parsonageData.general.title}
              </h4>
              <p className="text-white text-center tablet:text-left">
                {parsonageData.general.location}
              </p>
            </div>
            <ul className="flex flex-col  gap-6 mt-4 tablet:gap-4 desktop:gap-2">
              <li className="grid grid-cols-[80px_1fr]">
                <p className="text-white text-larger font-light">Email:</p>
                <div className="place-items-start">
                  {showParsonageEmail ? (
                    <Link
                      prefetch={false}
                      href={`mailto:${showParsonageEmail}`}
                      className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                    >
                      {showParsonageEmail}
                    </Link>
                  ) : (
                    <button
                      className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                      onClick={async () => {
                        const email = await fetchEmail("parsonage");
                        setShowParsonageEmail(email);
                      }}
                    >
                      Show email address
                    </button>
                  )}
                </div>
              </li>
              <li className="grid grid-cols-[80px_1fr]">
                <p className="text-white text-larger font-light">Phone:</p>
                <div className="place-items-start">
                  {showParsonagePhone ? (
                    <Link
                      prefetch={false}
                      href={`tel:${showParsonagePhone}`}
                      className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                    >
                      {showParsonagePhone}
                    </Link>
                  ) : (
                    <button
                      className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                      onClick={async () => {
                        const phone = await fetchPhone("parsonage");
                        setShowParsonagePhone(phone);
                      }}
                    >
                      Show phone number
                    </button>
                  )}
                </div>
              </li>
            </ul>
            {!formSubmited ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  name="property"
                  defaultValue={parsonageData.general.title}
                  className="hidden"
                />
                <input type="text" name="_honey" className="hidden" />
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex justify-between mt-2">
                  {!formSubmitting ? (
                    <Button form onClick={() => setShowParsonage(false)}>
                      Submit
                    </Button>
                  ) : (
                    <Button form disabled>
                      <div className="flex justify-center items-center w-[77px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-y-2 border-l-2 border-white"></div>
                      </div>
                    </Button>
                  )}
                  <Button
                    formBack
                    onClick={() => {
                      setShowParsonage(false);
                      setFormSubmitted(false);
                    }}
                  >
                    Back
                  </Button>
                </div>
                {formError && <p className="text-white italic">{formError}</p>}
              </form>
            ) : (
              <>
                <p className="text-white text-larger italic py-4">
                  Thank you for your message, we will be in touch ASAP...
                </p>
                <div className="flex justify-start">
                  <Button
                    formBack
                    onClick={() => {
                      setShowParsonage(false);
                      setFormSubmitted(false);
                    }}
                    cssClasses=""
                  >
                    Back
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* hartland estate form */}

      <div className="mt-10 max-w-[1400px] mx-auto">
        {!showCrescent &&
          !showEastlands &&
          !showSerenePark &&
          !showParsonage &&
          !showHartland && (
            <Button
              mobileHomesForm
              onClick={() => {
                setShowHartland(!showHartland);
                setFormError("");
              }}
              cssClasses="text-left"
              extendedTitle={hartlandData.general.title}
              location={hartlandData.general.location}
              homeIconUrl="/assets/icons/spa-blue.svg"
              homeIconAlt="Cottage icon"
            />
          )}

        {showHartland && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h4 className="text-white text-center font-light tablet:text-left">
                {hartlandData.general.title}
              </h4>
              <p className="text-white text-center tablet:text-left">
                {hartlandData.general.location}
              </p>
            </div>
            <ul className="flex flex-col gap-6 mt-4 tablet:gap-4 desktop:gap-2">
              <li className="grid grid-cols-[80px_1fr]">
                <p className="text-white text-larger font-light">Email:</p>
                <div className="place-items-start">
                  {showHartlandEmail ? (
                    <Link
                      prefetch={false}
                      href={`mailto:${showHartlandEmail}`}
                      className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                    >
                      {showHartlandEmail}
                    </Link>
                  ) : (
                    <button
                      className="text-larger font-thin italic text-white underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                      onClick={async () => {
                        const email = await fetchEmail("hartland");
                        setShowHartlandEmail(email);
                      }}
                    >
                      Show email address
                    </button>
                  )}
                </div>
              </li>
              <li className="grid grid-cols-[80px_1fr]">
                <p className="text-white text-larger font-light">Phone:</p>
                <div className="place-items-start">
                  {showHartlandPhone ? (
                    <Link
                      prefetch={false}
                      href={`tel:${showHartlandPhone}`}
                      className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                    >
                      {showHartlandPhone}
                    </Link>
                  ) : (
                    <button
                      className="text-larger font-thin italic text-white underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                      onClick={async () => {
                        const phone = await fetchPhone("hartland");
                        setShowHartlandPhone(phone);
                      }}
                    >
                      Show phone number
                    </button>
                  )}
                </div>
              </li>
            </ul>
            {!formSubmited ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  name="property"
                  defaultValue={hartlandData.general.title}
                  className="hidden"
                />
                <input type="text" name="_honey" className="hidden" />
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="message"
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
                <div className="flex justify-between mt-2">
                  {!formSubmitting ? (
                    <Button form onClick={() => setShowHartland(false)}>
                      Submit
                    </Button>
                  ) : (
                    <Button form disabled>
                      <div className="flex justify-center items-center w-[77px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-y-2 border-l-2 border-white"></div>
                      </div>
                    </Button>
                  )}
                  <Button
                    formBack
                    onClick={() => {
                      setShowHartland(false);
                      setFormSubmitted(false);
                    }}
                  >
                    Back
                  </Button>
                </div>
                {formError && <p className="text-white italic">{formError}</p>}
              </form>
            ) : (
              <>
                <p className="text-white text-larger italic py-4">
                  Thank you for your message, we will be in touch ASAP...
                </p>
                <div className="flex justify-start">
                  <Button
                    formBack
                    onClick={() => {
                      setShowHartland(false);
                      setFormSubmitted(false);
                    }}
                    cssClasses=""
                  >
                    Back
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePageMobileContactForm;
