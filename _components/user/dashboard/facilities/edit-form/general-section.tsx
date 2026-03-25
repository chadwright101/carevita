"use client";

import classNames from "classnames";
import { forwardRef } from "react";

interface Props {
  title: string;
  setTitle: (v: string) => void;
  extendedTitle: string;
  setExtendedTitle: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  region: "" | "EC" | "FS" | "GP" | "KZN" | "LP" | "MP" | "NC" | "NW" | "WC";
  setRegion: (
    v: "" | "EC" | "FS" | "GP" | "KZN" | "LP" | "MP" | "NC" | "NW" | "WC",
  ) => void;
  email: string;
  setEmail: (v: string) => void;
  ccEmail: string;
  setCcEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
}

const GeneralSection = forwardRef<HTMLDivElement, Props>(
  function GeneralSection(
    {
      title,
      setTitle,
      extendedTitle,
      setExtendedTitle,
      city,
      setCity,
      region,
      setRegion,
      email,
      setEmail,
      ccEmail,
      setCcEmail,
      phone,
      setPhone,
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
          onClick={() => toggleSection("general")}
          className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span
              className={classNames("text-subheading", { "text-error": error })}
            >
              General
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "general" ? "−" : "+"}</span>
        </button>
        {activeSection === "general" && (
          <div className="grid tablet:grid-cols-2 gap-x-10 gap-y-5 px-5 py-7 border-t border-black">
            <label className="flex flex-col gap-1 justify-between">
              Facility Name *
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-black rounded p-2"
                autoComplete="off"
                data-bwignore
                data-1p-ignore
                data-lpignore="true"
              />
            </label>
            <label className="flex flex-col gap-1">
              Facility Extended Name (optional)
              <input
                value={extendedTitle}
                onChange={(e) => setExtendedTitle(e.target.value)}
                className="border border-black rounded p-2"
                autoComplete="off"
                data-bwignore
                data-1p-ignore
                data-lpignore="true"
              />
            </label>
            <label className="flex flex-col gap-1">
              City/Town *
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-black rounded p-2"
                autoComplete="off"
                data-bwignore
                data-1p-ignore
                data-lpignore="true"
              />
            </label>
            <label className="flex flex-col gap-1">
              Province *
              <select
                value={region}
                onChange={(e) =>
                  setRegion(
                    e.target.value as
                      | ""
                      | "EC"
                      | "FS"
                      | "GP"
                      | "KZN"
                      | "LP"
                      | "MP"
                      | "NC"
                      | "NW"
                      | "WC",
                  )
                }
                className="border border-black rounded p-2 desktop:hover:cursor-pointer"
              >
                <option value="" disabled>
                  Select Province
                </option>
                <option value="EC">Eastern Cape</option>
                <option value="FS">Free State</option>
                <option value="GP">Gauteng</option>
                <option value="KZN">KwaZulu-Natal</option>
                <option value="LP">Limpopo</option>
                <option value="MP">Mpumalanga</option>
                <option value="NW">North West</option>
                <option value="NC">Northern Cape</option>
                <option value="WC">Western Cape</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              Facility Email *
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black rounded p-2"
                autoComplete="off"
                data-bwignore
                data-1p-ignore
                data-lpignore="true"
              />
            </label>
            <label className="flex flex-col gap-1">
              CC Email (optional)
              <input
                value={ccEmail}
                onChange={(e) => setCcEmail(e.target.value)}
                className="border border-black rounded p-2"
                autoComplete="off"
                data-bwignore
                data-1p-ignore
                data-lpignore="true"
              />
            </label>
            <label className="flex flex-col gap-1">
              Facility Phone *
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-black rounded p-2"
                autoComplete="off"
                data-bwignore
                data-1p-ignore
                data-lpignore="true"
              />
            </label>
          </div>
        )}
        <input type="hidden" name="facilityName" value={title} />
        <input
          type="hidden"
          name="facilityExtendedName"
          value={extendedTitle}
        />
        <input type="hidden" name="city" value={city} />
        <input type="hidden" name="region" value={region} />
        <input type="hidden" name="facilityEmail" value={email} />
        <input type="hidden" name="facilityEmailCC" value={ccEmail} />
        <input type="hidden" name="facilityPhone" value={phone} />
      </div>
    );
  },
);

export default GeneralSection;
