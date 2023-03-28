import { useState, ReactNode } from "react";
import Button from "./button";

interface Props {
  cssClasses?: string;
}

const ContactForm = ({ cssClasses }: Props) => {
  const [showCrescent, setShowCrescent] = useState(false);
  const [showEastlands, setShowEastlands] = useState(false);
  const [showSerenePark, setShowSerenePark] = useState(false);

  return (
    <>
      {/* the crescent form */}

      <div className={`mt-10 max-w-[1400px] mx-auto ${cssClasses}`}>
        {!showCrescent && !showEastlands && !showSerenePark && (
          <>
            <p className="text-white mb-10">
              Please select which facility you&nbsp;d like to get in touch
              with...
            </p>
            <Button
              mobileHomesForm
              onClick={() => setShowCrescent(!showCrescent)}
              cssClasses="text-left"
            >
              The Crescent Retirement Lodge
            </Button>
          </>
        )}

        {showCrescent && (
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-center font-thin tablet:text-left">
              The Crescent Lodge
            </h4>
            <form action="" method="POST" className="flex flex-col gap-7">
              <div className="flex flex-col gap-3 tablet:grid grid-cols-[80px_1fr]">
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
              <div className="flex flex-col gap-3 tablet:grid grid-cols-[80px_1fr]">
                <label
                  htmlFor="email"
                  className="text-larger text-white font-thin"
                >
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  placeholder="Email address"
                  className="pl-2 py-1.5"
                />
              </div>
              <div className="flex flex-col gap-3 tablet:grid grid-cols-[80px_1fr]">
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
                  rows={4}
                />
              </div>
              <div className="flex justify-between mt-4">
                <Button form onClick={() => setShowCrescent(false)}>
                  Submit
                </Button>
                <Button formBack onClick={() => setShowCrescent(false)}>
                  Back
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* eastlands form form */}

      <div className={`mt-10 max-w-[1400px] mx-auto ${cssClasses}`}>
        {!showCrescent && !showEastlands && !showSerenePark && (
          <Button
            mobileHomesForm
            onClick={() => setShowEastlands(!showEastlands)}
            cssClasses="text-left"
          >
            Eastlands Mature Lifestyle Estate
          </Button>
        )}

        {showEastlands && (
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-center font-thin tablet:text-left">
              Eastlands Mature Lifestyle Estate
            </h4>
            <form action="" method="POST" className="flex flex-col gap-7">
              <div className="flex flex-col gap-3 tablet:grid grid-cols-[80px_1fr]">
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
              <div className="flex flex-col gap-3 tablet:grid grid-cols-[80px_1fr]">
                <label
                  htmlFor="email"
                  className="text-larger text-white font-thin"
                >
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  placeholder="Email address"
                  className="pl-2 py-1.5"
                />
              </div>
              <div className="flex flex-col gap-3 tablet:grid grid-cols-[80px_1fr]">
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
                  rows={4}
                />
              </div>
              <div className="flex justify-between mt-4">
                <Button form onClick={() => setShowEastlands(false)}>
                  Submit
                </Button>
                <Button formBack onClick={() => setShowEastlands(false)}>
                  Back
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* serenepark form form */}

      <div className={`mt-10 max-w-[1400px] mx-auto ${cssClasses}`}>
        {!showCrescent && !showEastlands && !showSerenePark && (
          <Button
            mobileHomesForm
            onClick={() => setShowSerenePark(!showSerenePark)}
            cssClasses="text-left"
          >
            Serenepark Retirement Centre
          </Button>
        )}

        {showSerenePark && (
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-center font-thin tablet:text-left">
              Serenepark Retirement Centre
            </h4>
            <form action="" method="POST" className="flex flex-col gap-7">
              <div className="flex flex-col gap-3 tablet:grid grid-cols-[80px_1fr]">
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
              <div className="flex flex-col gap-3 tablet:grid grid-cols-[80px_1fr]">
                <label
                  htmlFor="email"
                  className="text-larger text-white font-thin"
                >
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  placeholder="Email address"
                  className="pl-2 py-1.5"
                />
              </div>
              <div className="flex flex-col gap-3 tablet:grid grid-cols-[80px_1fr]">
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
                  rows={4}
                />
              </div>
              <div className="flex justify-between mt-4">
                <Button form onClick={() => setShowSerenePark(false)}>
                  Submit
                </Button>
                <Button formBack onClick={() => setShowSerenePark(false)}>
                  Back
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactForm;
