"use client";

import { useActionState, useTransition } from "react";
import ButtonType from "@/_components/ui/button-type";
import ContactInfoList from "@/_components/contact/contact-info-list";
import RecaptchaNotice from "@/_components/ui/recaptcha-notice";
import { FacilityNavigation } from "@/_types/facility-types";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendEmailWithActionState } from "@/_actions/send-email-action";

interface MobilePropertyContactFormProps {
  property: FacilityNavigation;
  onBack: () => void;
}

const MobilePropertyContactForm = ({
  property,
  onBack,
}: MobilePropertyContactFormProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, formAction] = useActionState(sendEmailWithActionState, {
    success: false,
    error: "",
  });
  const [, startTransition] = useTransition();

  const handleFormAction = async (formData: FormData) => {
    if (!executeRecaptcha) {
      return;
    }
    const recaptchaToken = await executeRecaptcha("contact_form");
    formData.append("recaptchaToken", recaptchaToken);
    startTransition(() => formAction(formData));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h4 className="text-white text-center font-light tablet:text-left">
          {property.facilityExtendedName}
        </h4>
        <p className="text-white text-center tablet:text-left">
          {property.extendedLocation}
        </p>
      </div>
      <ContactInfoList propertyId={property.slug} />
      {!state.success ? (
        <form action={handleFormAction} className="flex flex-col gap-5">
          <input
            type="text"
            name="property"
            defaultValue={property.facilityExtendedName}
            className="hidden"
          />
          <input
            type="text"
            name="propertySlug"
            defaultValue={property.slug}
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
          <div className="flex flex-col gap-3">
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
          <div className="flex flex-col gap-5 mt-5">
            <div className="flex gap-4 w-full justify-between">
              <ButtonType backgroundColor="green" iconArrow>
                Submit
              </ButtonType>
              <ButtonType
                backgroundColor="lightGreen"
                type="button"
                onClick={onBack}
              >
                Back
              </ButtonType>
            </div>
            <RecaptchaNotice cssClasses="text-white" />
          </div>
          {state.error && <p className="text-white italic">{state.error}</p>}
        </form>
      ) : (
        <div className="flex flex-col gap-6">
          <p className="text-white text-subheading font-extralight italic underline-offset-8 decoration-1">
            Thank you for your message. We will be in touch soon.
          </p>
          <ButtonType
            backgroundColor="lightGreen"
            type="button"
            onClick={onBack}
          >
            Back
          </ButtonType>
        </div>
      )}
    </div>
  );
};

export default MobilePropertyContactForm;
