"use client";

import Image from "next/image";
import { useActionState, useTransition } from "react";
import Button from "@/_components/ui/button";
import ContactInfoList from "@/_components/contact/contact-info-list";
import RecaptchaNotice from "@/_components/ui/recaptcha-notice";
import { PropertyConfig } from "@/_lib/properties-config";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendEmailWithActionState } from "@/_actions/send-email-action";

interface PropertyContactFormProps {
  property: PropertyConfig;
}

const PropertyContactForm = ({ property }: PropertyContactFormProps) => {
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
    <div className="grid grid-cols-2 gap-10 mt-10">
      <div>
        <ContactInfoList propertyId={property.id} />
        {!state.success ? (
          <form action={handleFormAction} className="flex flex-col gap-4">
            <input
              type="text"
              name="property"
              value={property.data.general.title}
              readOnly
              className="hidden"
            />
            <input type="text" name="_honey" className="hidden" />
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
            <div className="mt-5 flex flex-col items-start gap-4">
              <Button variant="form">Submit</Button>
              <RecaptchaNotice cssClasses="text-white" />
            </div>
            {state.error && <p className="text-white italic">{state.error}</p>}
          </form>
        ) : (
          <p className="text-white text-subheading font-extralight italic underline-offset-8 decoration-1">
            Thank you for your message. We will be in touch soon.
          </p>
        )}
      </div>
      <div className="overflow-hidden">
        <Image
          src={property.contactImage.src}
          alt={property.contactImage.alt}
          width={505}
          height={680}
          className="object-cover aspect-video w-full h-full"
          sizes="35vw"
        />
      </div>
    </div>
  );
};

export default PropertyContactForm;
