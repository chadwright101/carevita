import { useState } from "react";
import Link from "next/link";

import Button from "@/components/button";
import { fetchEmail } from "@/lib/fetchEmail";
import { fetchPhone } from "@/lib/fetchPhone";

interface Props {
  cssClasses?: string;
  data: {
    general: {
      title: string;
      shortTitle: string;
    };
  };
}

const PropertyPagesContactForm = ({
  data: {
    general: { title, shortTitle },
  },
  cssClasses,
}: Props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showEmail, setShowEmail] = useState("");
  const [showPhone, setShowPhone] = useState("");

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
    <div className={`${cssClasses}`}>
      <div className="mt-10 max-w-[1400px] mx-auto flex flex-col gap-8">
        <ul className="flex flex-col gap-6 mt-4 tablet:gap-4 desktop:gap-2">
          <li className="grid grid-cols-[80px_1fr]">
            <p className="text-white text-larger font-light">Email:</p>
            <div className="place-items-start mr-auto">
              {!showEmail ? (
                <p
                  className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                  onClick={async () => {
                    const email = await fetchEmail(shortTitle);
                    setShowEmail(email);
                  }}
                >
                  Show email address
                </p>
              ) : (
                <Link
                  href={`mailto:${showEmail}`}
                  className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0 tabletLarge:hover:underline underline-offset-8 decoration-1"
                >
                  {showEmail}
                </Link>
              )}
            </div>
          </li>
          <li className="grid grid-cols-[80px_1fr]">
            <p className="text-white text-larger font-light">Phone:</p>
            <div className="place-items-start mr-auto">
              {!showPhone ? (
                <p
                  className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                  onClick={async () => {
                    const phone = await fetchPhone(shortTitle);
                    setShowPhone(phone);
                  }}
                >
                  Show phone number
                </p>
              ) : (
                <Link
                  href={`tel:${showPhone}`}
                  className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                >
                  {showPhone}
                </Link>
              )}
            </div>
          </li>
        </ul>
        {!formSubmited ? (
          <>
            <p className="text-white">
              Please fill out the form below, and our staff from{" "}
              <span className="font-light text-white">{title}</span> will be in
              touch with you ASAP...
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <input
                type="text"
                name="property"
                defaultValue={title}
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
              {showMessage && (
                <>
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
                </>
              )}
              {showMessage && !formSubmitting ? (
                <>
                  <Button
                    form
                    onClick={() => setShowMessage(false)}
                    cssClasses="mr-auto"
                  >
                    Submit
                  </Button>
                  {formError && (
                    <p className="text-white text-larger font-thin italic -mt-4">
                      {formError}
                    </p>
                  )}
                </>
              ) : showMessage && formSubmitting ? (
                <Button cssClasses="mr-auto" form disabled>
                  <div className="flex justify-center items-center w-[77px] h-[36px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-y-2 border-l-2 border-white"></div>
                  </div>
                </Button>
              ) : null}
            </form>
            {!showMessage && (
              <Button
                formNext
                onClick={() => setShowMessage(true)}
                cssClasses="mr-auto"
              />
            )}
          </>
        ) : (
          <p className="text-white text-larger font-thin italic underline-offset-8 decoration-1">
            Thank you for your message. We will be in touch soon.
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyPagesContactForm;
