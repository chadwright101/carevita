"use client";

import { useState } from "react";
import { PROPERTIES } from "@/_lib/properties-config";
import { sendEmail } from "@/_actions/send-email-action";

export const useContactForm = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );
  const [formState, setFormState] = useState({
    submitting: false,
    submitted: false,
    error: "",
  });

  const handlePropertySelect = (id: string) => {
    setSelectedPropertyId(id);
    setFormState({ submitting: false, submitted: false, error: "" });
  };

  const handleBack = () => {
    setSelectedPropertyId(null);
    setFormState({ submitting: false, submitted: false, error: "" });
  };

  const handleSubmit = async (formData: FormData) => {
    setFormState({ ...formState, submitting: true });

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        setFormState({ submitting: false, submitted: true, error: "" });
      } else {
        setFormState({
          submitting: false,
          submitted: false,
          error:
            result.error ||
            "There was an error sending the email, please try again. If the problem persists, please contact us via phone.",
        });
      }
    } catch (error) {
      setFormState({
        submitting: false,
        submitted: false,
        error:
          "There was an error sending the email, please try again. If the problem persists, please contact us via phone.",
      });
    }
  };

  const selectedProperty = PROPERTIES.find((p) => p.id === selectedPropertyId);

  return {
    selectedPropertyId,
    selectedProperty,
    formState,
    handlePropertySelect,
    handleBack,
    handleSubmit,
  };
};
