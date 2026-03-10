"use client";

import { useState } from "react";
import { FacilityNavigation } from "@/_types/facility-types";

export const useContactForm = (facilities: FacilityNavigation[]) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );

  const handlePropertySelect = (id: string) => {
    setSelectedPropertyId(id);
  };

  const handleBack = () => {
    setSelectedPropertyId(null);
  };

  const selectedProperty = facilities.find((f) => f.slug === selectedPropertyId);

  return {
    selectedPropertyId,
    selectedProperty,
    handlePropertySelect,
    handleBack,
  };
};
