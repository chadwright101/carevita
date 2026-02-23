"use client";

import { useState } from "react";
import { PROPERTIES } from "@/_lib/properties-config";

export const useContactForm = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );

  const handlePropertySelect = (id: string) => {
    setSelectedPropertyId(id);
  };

  const handleBack = () => {
    setSelectedPropertyId(null);
  };

  const selectedProperty = PROPERTIES.find((p) => p.id === selectedPropertyId);

  return {
    selectedPropertyId,
    selectedProperty,
    handlePropertySelect,
    handleBack,
  };
};
