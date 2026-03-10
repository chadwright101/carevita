"use server";

import generalData from "@/_data/general-data.json";
import { verifyRecaptchaToken } from "@/_lib/verify-recaptcha";
import { getFirestoreDb } from "@/_lib/firebase-admin";
import { serializeFirestoreData } from "@/_lib/firebase-serializer";
import { Facility } from "@/_types/facility-types";

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

export const fetchFacilityEmail = async (slug: string, recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  const db = getFirestoreDb();
  const doc = await db.collection("facilities").doc(slug).get();
  const data = serializeFirestoreData(doc.data() as Facility);
  return data?.general?.email ?? "";
};

export const fetchFacilityPhone = async (slug: string, recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  const db = getFirestoreDb();
  const doc = await db.collection("facilities").doc(slug).get();
  const data = serializeFirestoreData(doc.data() as Facility);
  return data?.general?.phone ?? "";
};
