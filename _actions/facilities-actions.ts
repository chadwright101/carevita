"use server";

import { getFirestoreDb } from "@/_lib/firebase-admin";
import { serializeFirestoreData } from "@/_lib/firebase-serializer";
import {
  Facility,
  FacilityNavigation,
  HomePageContent,
} from "@/_types/facility-types";
import { HomePage } from "@/_types/home-types";

export async function getAllFacilities(): Promise<Facility[]> {
  const db = getFirestoreDb();
  const facilitiesSnapshot = await db
    .collection("facilitiesContent")
    .where("isActive", "==", true)
    .orderBy("order", "asc")
    .get();

  const facilities = facilitiesSnapshot.docs.map((doc) =>
    serializeFirestoreData(doc.data() as Facility),
  );

  return facilities;
}

export async function getFacilityBySlug(
  slug: string,
): Promise<Facility | null> {
  const db = getFirestoreDb();
  const facilitiesSnapshot = await db
    .collection("facilitiesContent")
    .where("general.slug", "==", slug)
    .where("isActive", "==", true)
    .limit(1)
    .get();

  if (facilitiesSnapshot.empty) {
    return null;
  }

  const facility = serializeFirestoreData(
    facilitiesSnapshot.docs[0].data() as Facility,
  );

  return facility;
}

export async function getFacilityNavigation(): Promise<FacilityNavigation[]> {
  const db = getFirestoreDb();
  const snapshot = await db
    .collection("facilitiesContent")
    .where("isActive", "==", true)
    .orderBy("order", "asc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = serializeFirestoreData(doc.data() as Facility);
    return {
      slug: data.general.slug,
      facilityName: data.general.facilityName,
      facilityExtendedName: data.general.facilityExtendedName,
      cityTown: data.general.cityTown,
      extendedLocation: data.general.extendedLocation,
      description: data.ourHomesPage.description || data.location.description,
      province: data.general.province,
      featuredImage: (data.media ?? (data as any).images)?.heroSlider?.[0],
      locationImage: data.location.locationImage,
      hasStaff: Array.isArray(data.meetTheTeam) && data.meetTheTeam.length > 2,
      order: data.order,
      isActive: data.isActive,
    };
  });
}

export async function getHomePageContent(): Promise<HomePage> {
  const db = getFirestoreDb();
  const homePageSnapshot = await db
    .collection("pageContent")
    .doc("homePage")
    .get();

  if (!homePageSnapshot.exists) {
    throw new Error("Home page content not found");
  }

  const homePageContent = serializeFirestoreData(
    homePageSnapshot.data() as HomePage,
  );

  return homePageContent;
}
