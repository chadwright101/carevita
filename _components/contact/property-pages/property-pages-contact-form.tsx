"use client";

import { useState } from "react";
import classNames from "classnames";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import ButtonType from "@/_components/ui/button-type";
import ShowEmailAddress from "@/_components/ui/contact/show-email-address";
import ShowPhoneNumber from "@/_components/ui/contact/show-phone-number";
import RecaptchaNotice from "@/_components/ui/recaptcha-notice";
import { sendEmail } from "@/_actions/send-email-action";

interface Props {
  cssClasses?: string;
  data: {
    general: {
      title: string;
      slug: string;
    };
  };
}

const PropertyPagesContactForm = ({
  data: {
    general: { title, slug },
  },
  cssClasses,
}: Props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showMessage, setShowMessage] = useState(false);

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmited, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  return (
    <div className={classNames(cssClasses)}>
      <div className="mt-10 max-w-[1280px] mx-auto flex flex-col gap-8">
        <ul className="flex flex-col gap-6 mt-4 tablet:gap-4 desktop:gap-2">
          <li className="grid grid-cols-[80px_1fr]">
            <p className="text-white text-larger font-light">Email:</p>
            <div className="place-items-start mr-auto">
              <ShowEmailAddress property={slug} />
            </div>
          </li>
          <li className="grid grid-cols-[80px_1fr]">
            <p className="text-white text-larger font-light">Phone:</p>
            <div className="place-items-start mr-auto">
              <ShowPhoneNumber property={slug} />
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
            <form
              action={async (formData) => {
                setFormSubmitting(true);
                setFormError("");

                try {
                  if (!executeRecaptcha) {
                    setFormError(
                      "Security verification unavailable. Please refresh the page and try again.",
                    );
                    setFormSubmitting(false);
                    return;
                  }

                  const recaptchaToken = await executeRecaptcha("contact_form");
                  formData.append("recaptchaToken", recaptchaToken);

                  const result = await sendEmail(formData);

                  if (result.success) {
                    setFormSubmitting(false);
                    setFormSubmitted(true);
                  } else {
                    setFormError(
                      result.error ||
                        "There was an error sending the email, please try again. If the problem persists, please contact us via phone.",
                    );
                    setFormSubmitting(false);
                  }
                } catch (error) {
                  console.error("Error sending email", error);
                  setFormError(
                    "There was an error sending the email, please try again. If the problem persists, please contact us via phone.",
                  );
                  setFormSubmitting(false);
                }
              }}
              className="flex flex-col gap-10"
            >
              <input
                type="text"
                name="property"
                value={title}
                readOnly
                className="hidden"
              />
              <input type="text" name="_honey" className="hidden" />
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="name"
                  className="text-larger text-white font-extralight"
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
                  autoComplete="name"
                />
              </div>
              {showMessage && (
                <>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="text-larger text-white font-extralight"
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
                      autoComplete="phone"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="email"
                      className="text-larger text-white font-extralight"
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
                      autoComplete="email"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="email"
                      className="text-larger text-white font-extralight"
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
              {showMessage && (
                <>
                  <div className="flex flex-col gap-4">
                    <ButtonType backgroundColor="green" iconArrow cssClasses="mr-auto">
                      Submit
                    </ButtonType>
                    <RecaptchaNotice cssClasses="text-white" />
                  </div>
                  {formError && (
                    <p className="text-white text-larger font-extralight italic -mt-4">
                      {formError}
                    </p>
                  )}
                </>
              )}
            </form>
            {!showMessage && (
              <ButtonType
                backgroundColor="green"
                iconArrow
                type="button"
                onClick={() => setShowMessage(true)}
                cssClasses="mr-auto"
              >
                Next
              </ButtonType>
            )}
          </>
        ) : (
          <p className="text-white text-larger font-extralight italic underline-offset-8 decoration-1">
            Thank you for your message. We will be in touch soon.
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyPagesContactForm;
