import { useState } from "react";

import Button from "@/components/button";

const BusinessPortfolioContactForm = () => {
  const [showMessage, setShowMessage] = useState(false);

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
        "general-email": "general-email",
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
    <div className="flex flex-col gap-8">
      {!formSubmited ? (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <input type="text" name="_honey" className="hidden" />
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="text-larger  font-thin">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Full name"
                className="pl-2 py-1.5 border border-black/[15%]"
              />
            </div>
            {showMessage && (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-larger  font-thin">
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Phone number"
                    className="pl-2 py-1.5 border border-black/[15%]"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-larger  font-thin">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="pl-2 py-1.5 border border-black/[15%]"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-larger  font-thin">
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here"
                    className="pl-2 py-1.5 border border-black/[15%]"
                    rows={5}
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
                  <p className=" text-larger font-thin italic -mt-4">
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
        <p className=" text-larger font-thin italic underline-offset-8 decoration-1">
          Thank you for your message. We will be in touch soon.
        </p>
      )}
    </div>
  );
};

export default BusinessPortfolioContactForm;
