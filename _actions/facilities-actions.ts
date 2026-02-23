"use server";

import { getFirestoreDb } from "@/_lib/firebase-admin";
import { serializeFirestoreData } from "@/_lib/firebase-serializer";
import { Facility } from "@/_types/facility-types";
import { HomePageContent } from "@/_types/facility-types";

export async function getAllFacilities(): Promise<Facility[]> {
  const db = getFirestoreDb();
  const facilitiesSnapshot = await db
    .collection("facilities")
    .where("isActive", "==", true)
    .orderBy("order", "asc")
    .get();

  const facilities = facilitiesSnapshot.docs.map((doc) =>
    serializeFirestoreData(doc.data() as Facility)
  );

  return facilities;
}

export async function getFacilityBySlug(slug: string): Promise<Facility | null> {
  const db = getFirestoreDb();
  const facilitiesSnapshot = await db
    .collection("facilities")
    .where("general.slug", "==", slug)
    .where("isActive", "==", true)
    .limit(1)
    .get();

  if (facilitiesSnapshot.empty) {
    return null;
  }

  const facility = serializeFirestoreData(
    facilitiesSnapshot.docs[0].data() as Facility
  );

  return facility;
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const db = getFirestoreDb();
  const homePageSnapshot = await db
    .collection("siteContent")
    .doc("homePage")
    .get();

  if (!homePageSnapshot.exists) {
    throw new Error("Home page content not found");
  }

  const homePageContent = serializeFirestoreData(
    homePageSnapshot.data() as HomePageContent
  );

  return homePageContent;
}
