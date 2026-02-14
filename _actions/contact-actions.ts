"use server";

import generalData from "@/_data/general-data.json";
import crescentData from "@/_data/crescent-data.json";
import eastlandsData from "@/_data/eastlands-data.json";
import sereneData from "@/_data/serene-data.json";
import parsonageData from "@/_data/parsonage-data.json";
import hartlandData from "@/_data/hartland-data.json";
import { verifyRecaptchaToken } from "@/_lib/verify-recaptcha";

// General Contact
export const fetchGeneralEmail = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return generalData.homePage.contact.general;
};

export const fetchGeneralPhone = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return "";
};

export const fetchAccountsEmail = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return generalData.homePage.contact.accounts;
};

// The Crescent
export const fetchCrescentEmail = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return crescentData.general.email;
};

export const fetchCrescentPhone = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return crescentData.general.phone;
};

// Eastlands
export const fetchEastlandsEmail = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return eastlandsData.general.email;
};

export const fetchEastlandsPhone = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return eastlandsData.general.phone;
};

// Serene Park
export const fetchSereneEmail = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return sereneData.general.email;
};

export const fetchSerenePhone = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return sereneData.general.phone;
};

// Parsonage Street
export const fetchParsonageEmail = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return parsonageData.general.email;
};

export const fetchParsonagePhone = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return parsonageData.general.phone;
};

// Hartland Estate
export const fetchHartlandEmail = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return hartlandData.general.email;
};

export const fetchHartlandPhone = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  return hartlandData.general.phone;
};
