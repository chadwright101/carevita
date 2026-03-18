"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "@/_lib/auth-utils";
import { getFirestoreDb } from "@/_lib/firebase-admin";
import { facilitySchema } from "@/_lib/validation/facility-schema";
import { ActionResult } from "@/_types/general-types";
import { Facility, FacilityGeneral } from "@/_types/facility-types";
import { serializeFirestoreData } from "@/_lib/firebase-serializer";

const regionFullName: Record<string, string> = {
  WC: "Western Cape", GP: "Gauteng", EC: "Eastern Cape",
  KZN: "KwaZulu-Natal", LP: "Limpopo", MP: "Mpumalanga",
  NW: "North West", FS: "Free State", NC: "Northern Cape",
};

export async function getAllFacilitiesAdmin(): Promise<Facility[]> {
  await verifySession();
  const db = getFirestoreDb();
  const snapshot = await db
    .collection("facilitiesContent")
    .where("isActive", "==", true)
    .orderBy("order", "asc")
    .get();
  return snapshot.docs.map((doc) =>
    serializeFirestoreData(doc.data() as Facility)
  );
}

export async function getFacilityBySlugAdmin(slug: string): Promise<Facility | null> {
  await verifySession();
  const db = getFirestoreDb();
  const doc = await db.collection("facilitiesContent").doc(slug).get();
  if (!doc.exists) return null;
  return serializeFirestoreData(doc.data() as Facility);
}

export async function createFacility(
  prevState: any,
  formData: FormData
): Promise<ActionResult<Facility>> {
  try {
    await verifySession();

    const slug = formData.get("slug") as string;
    const city = formData.get("city") as string;
    const region = formData.get("region") as string;

    const facilityData: Facility = {
      general: {
        title: formData.get("title") as string,
        extendedTitle: (formData.get("extendedTitle") as string) || (formData.get("title") as string),
        location: `${city}, ${region}`,
        extendedLocation: `${city}, ${regionFullName[region]}`,
        region: region as FacilityGeneral["region"],
        email: formData.get("facilityEmail") as string,
        phone: (() => { const p = formData.get("facilityPhone") as string; return p.startsWith("+270") ? "+27" + p.slice(4) : p; })(),
        homeUrl: `/our-homes/${slug}`,
        slug,
      },
      location: {
        description: formData.get("description") as string,
        contactImage: formData.get("contactImage") as string,
        map: {
          lat: parseFloat(formData.get("mapLat") as string),
          lng: parseFloat(formData.get("mapLng") as string),
          zoom: 13.75,
        },
      },
      meta: {
        keywords: formData.get("metaKeywords") as string,
        images: JSON.parse((formData.get("metaImages") as string) || "[]"),
      },
      ourHomesPage: {
        description: (formData.get("ourHomesDescription") as string) || "",
      },
      whatWeOffer: {
        list: (formData.get("whatWeOfferList") as string) ?? "",
        image: formData.get("whatWeOfferImage") as string,
        pampering: JSON.parse(
          (formData.get("pampering") as string) || "[]"
        ),
        weeklyActivities: JSON.parse(
          (formData.get("weeklyActivities") as string) || "[]"
        ),
      },
      about: {
        paragraphs: (formData.get("aboutParagraphs") as string) ?? "",
        image: formData.get("aboutImage") as string,
      },
      meetTheTeam: JSON.parse(
        (formData.get("meetTheTeam") as string) || "[]"
      ),
      media: {
        heroSlider: JSON.parse(
          (formData.get("heroSlider") as string) || "[]"
        ),
        gallerySlider: JSON.parse(
          (formData.get("gallerySlider") as string) || "[]"
        ),
        heroDisplayMode: (formData.get("heroDisplayMode") as "slider" | "video") || undefined,
        video: (() => {
          const desktopMp4 = (formData.get("heroDesktopMp4") as string) || "";
          const desktopWebm = (formData.get("heroDesktopWebm") as string) || "";
          const mobileMp4 = (formData.get("heroMobileMp4") as string) || "";
          const mobileWebm = (formData.get("heroMobileWebm") as string) || "";
          const poster = (formData.get("heroPoster") as string) || "";
          return desktopMp4 || desktopWebm || mobileMp4 || mobileWebm || poster
            ? { desktopMp4, desktopWebm, mobileMp4, mobileWebm, poster }
            : undefined;
        })(),
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
    await db.collection("facilitiesContent").doc(slug).set(facilityData);

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
    const city = formData.get("city") as string;
    const region = formData.get("region") as string;

    const facilityData: Facility = {
      general: {
        title: formData.get("title") as string,
        extendedTitle: (formData.get("extendedTitle") as string) || (formData.get("title") as string),
        location: `${city}, ${region}`,
        extendedLocation: `${city}, ${regionFullName[region]}`,
        region: region as FacilityGeneral["region"],
        email: formData.get("facilityEmail") as string,
        phone: (() => { const p = formData.get("facilityPhone") as string; return p.startsWith("+270") ? "+27" + p.slice(4) : p; })(),
        homeUrl: `/our-homes/${slug}`,
        slug,
      },
      location: {
        description: formData.get("description") as string,
        contactImage: formData.get("contactImage") as string,
        map: {
          lat: parseFloat(formData.get("mapLat") as string),
          lng: parseFloat(formData.get("mapLng") as string),
          zoom: 13.75,
        },
      },
      meta: {
        keywords: formData.get("metaKeywords") as string,
        images: JSON.parse((formData.get("metaImages") as string) || "[]"),
      },
      ourHomesPage: {
        description: (formData.get("ourHomesDescription") as string) || "",
      },
      whatWeOffer: {
        list: (formData.get("whatWeOfferList") as string) ?? "",
        image: formData.get("whatWeOfferImage") as string,
        pampering: JSON.parse(
          (formData.get("pampering") as string) || "[]"
        ),
        weeklyActivities: JSON.parse(
          (formData.get("weeklyActivities") as string) || "[]"
        ),
      },
      about: {
        paragraphs: (formData.get("aboutParagraphs") as string) ?? "",
        image: formData.get("aboutImage") as string,
      },
      meetTheTeam: JSON.parse(
        (formData.get("meetTheTeam") as string) || "[]"
      ),
      media: {
        heroSlider: JSON.parse(
          (formData.get("heroSlider") as string) || "[]"
        ),
        gallerySlider: JSON.parse(
          (formData.get("gallerySlider") as string) || "[]"
        ),
        heroDisplayMode: (formData.get("heroDisplayMode") as "slider" | "video") || undefined,
        video: (() => {
          const desktopMp4 = (formData.get("heroDesktopMp4") as string) || "";
          const desktopWebm = (formData.get("heroDesktopWebm") as string) || "";
          const mobileMp4 = (formData.get("heroMobileMp4") as string) || "";
          const mobileWebm = (formData.get("heroMobileWebm") as string) || "";
          const poster = (formData.get("heroPoster") as string) || "";
          return desktopMp4 || desktopWebm || mobileMp4 || mobileWebm || poster
            ? { desktopMp4, desktopWebm, mobileMp4, mobileWebm, poster }
            : undefined;
        })(),
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
    await db.collection("facilitiesContent").doc(slug).set(facilityData, { merge: true });

    revalidatePath("/");
    revalidatePath("/our-homes");
    revalidatePath(`/our-homes/${slug}`);
    revalidatePath("/dashboard");
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update facility",
    };
  }
  redirect("/dashboard");
}

export async function deleteFacility(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifySession();

    const slug = formData.get("slug") as string;
    const db = getFirestoreDb();

    await db.collection("facilitiesContent").doc(slug).update({ isActive: false });

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
      const ref = db.collection("facilitiesContent").doc(item.slug);
      batch.update(ref, { order: item.order });
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

export async function updateFacilityOrder(
  orderPayload: { slug: string; order: number }[]
): Promise<ActionResult> {
  try {
    await verifySession();

    const db = getFirestoreDb();
    const batch = db.batch();

    for (const item of orderPayload) {
      batch.update(db.collection("facilitiesContent").doc(item.slug), { order: item.order });
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
