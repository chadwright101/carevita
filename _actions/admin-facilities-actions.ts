"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/_lib/auth-utils";
import { getFirestoreDb } from "@/_lib/firebase-admin";
import { facilitySchema } from "@/_lib/validation/facility-schema";
import { ActionResult } from "@/_types/general-types";
import { Facility } from "@/_types/facility-types";
import { serializeFirestoreData } from "@/_lib/firebase-serializer";

export async function getAllFacilitiesAdmin(): Promise<Facility[]> {
  await verifySession();
  const db = getFirestoreDb();
  const snapshot = await db
    .collection("facilities")
    .where("isActive", "==", true)
    .orderBy("order", "asc")
    .get();
  return snapshot.docs.map((doc) =>
    serializeFirestoreData(doc.data() as Facility)
  );
}

export async function createFacility(
  prevState: any,
  formData: FormData
): Promise<ActionResult<Facility>> {
  try {
    await verifySession();

    const slug = formData.get("slug") as string;

    const facilityData: Facility = {
      general: {
        shortTitle: formData.get("shortTitle") as string,
        title: formData.get("title") as string,
        extendedTitle: formData.get("extendedTitle") as string,
        location: formData.get("location") as string,
        extendedLocation: formData.get("extendedLocation") as string,
        region: formData.get("region") as "WC" | "GP" | "EC",
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        homeUrl: formData.get("homeUrl") as string,
        slug,
        description: formData.get("description") as string,
        contactImage: formData.get("contactImage") as string,
        map: {
          lat: parseFloat(formData.get("mapLat") as string),
          lng: parseFloat(formData.get("mapLng") as string),
          zoom: parseInt(formData.get("mapZoom") as string),
        },
        meta: {
          keywords: formData.get("metaKeywords") as string,
          images: JSON.parse((formData.get("metaImages") as string) || "[]"),
        },
      },
      whatWeOffer: {
        list: JSON.parse((formData.get("whatWeOfferList") as string) || "[]"),
        image: formData.get("whatWeOfferImage") as string,
        pampering: JSON.parse(
          (formData.get("pampering") as string) || "[]"
        ),
        weeklyActivities: JSON.parse(
          (formData.get("weeklyActivities") as string) || "[]"
        ),
      },
      about: {
        paragraphs: JSON.parse(
          (formData.get("aboutParagraphs") as string) || "[]"
        ),
        image: formData.get("aboutImage") as string,
      },
      meetTheTeam: JSON.parse(
        (formData.get("meetTheTeam") as string) || "[]"
      ),
      images: {
        heroSlider: JSON.parse(
          (formData.get("heroSlider") as string) || "[]"
        ),
        gallerySlider: JSON.parse(
          (formData.get("gallerySlider") as string) || "[]"
        ),
      },
      order: parseInt(formData.get("order") as string) || 0,
      isActive: true,
      timestamp: Date.now(),
    };

    const parsed = facilitySchema.safeParse(facilityData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const db = getFirestoreDb();
    await db.collection("facilities").doc(slug).set(facilityData);

    revalidatePath("/");
    revalidatePath("/our-homes");
    revalidatePath(`/our-homes/${slug}`);

    return { success: true, data: facilityData };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create facility",
    };
  }
}

export async function updateFacility(
  prevState: any,
  formData: FormData
): Promise<ActionResult<Facility>> {
  try {
    await verifySession();

    const slug = formData.get("slug") as string;

    const facilityData: Facility = {
      general: {
        shortTitle: formData.get("shortTitle") as string,
        title: formData.get("title") as string,
        extendedTitle: formData.get("extendedTitle") as string,
        location: formData.get("location") as string,
        extendedLocation: formData.get("extendedLocation") as string,
        region: formData.get("region") as "WC" | "GP" | "EC",
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        homeUrl: formData.get("homeUrl") as string,
        slug,
        description: formData.get("description") as string,
        contactImage: formData.get("contactImage") as string,
        map: {
          lat: parseFloat(formData.get("mapLat") as string),
          lng: parseFloat(formData.get("mapLng") as string),
          zoom: parseInt(formData.get("mapZoom") as string),
        },
        meta: {
          keywords: formData.get("metaKeywords") as string,
          images: JSON.parse((formData.get("metaImages") as string) || "[]"),
        },
      },
      whatWeOffer: {
        list: JSON.parse((formData.get("whatWeOfferList") as string) || "[]"),
        image: formData.get("whatWeOfferImage") as string,
        pampering: JSON.parse(
          (formData.get("pampering") as string) || "[]"
        ),
        weeklyActivities: JSON.parse(
          (formData.get("weeklyActivities") as string) || "[]"
        ),
      },
      about: {
        paragraphs: JSON.parse(
          (formData.get("aboutParagraphs") as string) || "[]"
        ),
        image: formData.get("aboutImage") as string,
      },
      meetTheTeam: JSON.parse(
        (formData.get("meetTheTeam") as string) || "[]"
      ),
      images: {
        heroSlider: JSON.parse(
          (formData.get("heroSlider") as string) || "[]"
        ),
        gallerySlider: JSON.parse(
          (formData.get("gallerySlider") as string) || "[]"
        ),
      },
      order: parseInt(formData.get("order") as string) || 0,
      isActive: formData.get("isActive") === "true",
      timestamp: Date.now(),
    };

    const parsed = facilitySchema.safeParse(facilityData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const db = getFirestoreDb();
    await db.collection("facilities").doc(slug).set(facilityData, { merge: true });

    revalidatePath("/");
    revalidatePath("/our-homes");
    revalidatePath(`/our-homes/${slug}`);

    return { success: true, data: facilityData };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update facility",
    };
  }
}

export async function deleteFacility(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifySession();

    const slug = formData.get("slug") as string;
    const db = getFirestoreDb();

    await db.collection("facilities").doc(slug).update({ isActive: false });

    revalidatePath("/");
    revalidatePath("/our-homes");
    revalidatePath(`/our-homes/${slug}`);
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete facility",
    };
  }
}

export async function reorderFacilities(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifySession();

    const order: Array<{ slug: string; order: number }> = JSON.parse(
      formData.get("order") as string
    );

    const db = getFirestoreDb();
    const batch = db.batch();

    for (const item of order) {
      const ref = db.collection("facilities").doc(item.slug);
      batch.update(ref, { order: item.order });
    }

    for (const item of order) {
      const navRef = db.collection("facilityNavigation").doc(item.slug);
      batch.update(navRef, { order: item.order });
    }

    await batch.commit();

    revalidatePath("/");
    revalidatePath("/our-homes");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to reorder facilities",
    };
  }
}
