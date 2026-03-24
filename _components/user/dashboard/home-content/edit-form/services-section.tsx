"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import { Service } from "@/_types/home-types";
import ServiceList from "@/_components/user/dashboard/home-content/edit-form/service-list";

interface Props {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
  onPendingAdd?: (url: string) => void;
  onPendingRemove?: (url: string) => void;
}

const ServiceSection = forwardRef<HTMLDivElement, Props>(
  function ServiceSection(
    { services, setServices, activeSection, toggleSection, error, onPendingAdd, onPendingRemove },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className="border border-black rounded-md overflow-hidden scroll-mt-24"
      >
        <button
          type="button"
          onClick={() => toggleSection("services")}
          className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span
              className={classNames("text-subheading", {
                "text-error": error,
              })}
            >
              Services
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "services" ? "−" : "+"}</span>
        </button>
        {activeSection === "services" && (
          <p className="text-smallest px-4 pb-2">
            A minimum of 3 and a maximum of 5 services can be added.
          </p>
        )}
        {activeSection === "services" && (
          <ServiceList services={services} setServices={setServices} onPendingAdd={onPendingAdd} onPendingRemove={onPendingRemove} />
        )}
        <input type="hidden" name="services" value={JSON.stringify(services)} />
      </div>
    );
  },
);

export default ServiceSection;
