"use server";

import { verifyRecaptchaToken } from "@/_lib/verify-recaptcha";
import { getFirestoreDb } from "@/_lib/firebase-admin";
import { serializeFirestoreData } from "@/_lib/firebase-serializer";
import { Facility } from "@/_types/facility-types";
import { HomePage } from "@/_types/home-types";

// General Contact
export const fetchGeneralEmail = async (recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  const db = getFirestoreDb();
  const doc = await db.collection("pageContent").doc("homePage").get();
  const data = serializeFirestoreData(doc.data() as HomePage);
  return data?.contact?.general ?? "";
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
  const db = getFirestoreDb();
  const doc = await db.collection("pageContent").doc("homePage").get();
  const data = serializeFirestoreData(doc.data() as HomePage);
  return data?.contact?.accounts ?? "";
};

export const fetchFacilityEmail = async (slug: string, recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  const db = getFirestoreDb();
  const doc = await db.collection("facilitiesContent").doc(slug).get();
  const data = serializeFirestoreData(doc.data() as Facility);
  return data?.general?.facilityEmail ?? "";
};

export const fetchFacilityPhone = async (slug: string, recaptchaToken?: string) => {
  if (recaptchaToken) {
    const result = await verifyRecaptchaToken(recaptchaToken);
    if (!result.success) {
      throw new Error(result.error || "reCAPTCHA verification failed");
    }
  }
  const db = getFirestoreDb();
  const doc = await db.collection("facilitiesContent").doc(slug).get();
  const data = serializeFirestoreData(doc.data() as Facility);
  return data?.general?.facilityPhone ?? "";
};
