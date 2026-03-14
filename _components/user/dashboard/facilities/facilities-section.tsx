"use client";

import { Facility } from "@/_types/facility-types";
import FacilityList from "./facility-list";

interface Props {
  facilities: Facility[];
}

export default function FacilitiesSection({ facilities }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-subheading">Facilities</h2>
      <FacilityList facilities={facilities} />
    </section>
  );
}
