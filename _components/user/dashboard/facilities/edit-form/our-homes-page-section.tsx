import classNames from "classnames";
import { forwardRef } from "react";

interface Props {
  ourHomesDescription: string;
  setOurHomesDescription: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
}

const OurHomesPageSection = forwardRef<HTMLDivElement, Props>(
  function OurHomesPageSection(
    {
      ourHomesDescription,
      setOurHomesDescription,
      activeSection,
      toggleSection,
      error,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className="border border-black rounded-md overflow-hidden scroll-mt-24"
      >
        <button
          type="button"
          onClick={() => toggleSection("ourHomesPage")}
          className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span
              className={classNames("text-subheading", {
                "text-error": error,
              })}
            >
              Our Homes Page
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "ourHomesPage" ? "−" : "+"}</span>
        </button>
        {activeSection === "ourHomesPage" && (
          <div className="flex flex-col gap-3 p-4 border-t border-black">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Description</span>
              <textarea
                name="ourHomesDescription"
                value={ourHomesDescription}
                onChange={(e) => setOurHomesDescription(e.target.value)}
                rows={4}
                className="border border-black rounded-md p-2"
              />
            </div>
          </div>
        )}
      </div>
    );
  },
);

export default OurHomesPageSection;
