"use client";

import classNames from "classnames";
import { forwardRef } from "react";

interface Props {
  contactGeneral: string;
  setContactGeneral: (v: string) => void;
  contactAccounts: string;
  setContactAccounts: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
}

const ContactSection = forwardRef<HTMLDivElement, Props>(
  function ContactSection(
    {
      contactGeneral,
      setContactGeneral,
      contactAccounts,
      setContactAccounts,
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
          onClick={() => toggleSection("contact")}
          className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span
              className={classNames("text-subheading", { "text-error": error })}
            >
              Contact
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "contact" ? "−" : "+"}</span>
        </button>
        {activeSection === "contact" && (
          <div className="flex flex-col gap-4 px-5 py-7 border-t border-black">
            <label className="flex flex-col gap-1">
              General Email *
              <input
                value={contactGeneral}
                onChange={(e) => setContactGeneral(e.target.value)}
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              Accounts Email *
              <input
                value={contactAccounts}
                onChange={(e) => setContactAccounts(e.target.value)}
                className="border border-black rounded p-2"
              />
            </label>
          </div>
        )}
        <input type="hidden" name="contactGeneral" value={contactGeneral} />
        <input type="hidden" name="contactAccounts" value={contactAccounts} />
      </div>
    );
  },
);

export default ContactSection;
