"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/_lib/auth-utils";
import { getFirestoreDb } from "@/_lib/firebase-admin";
import { ActionResult } from "@/_types/general-types";
import { HomePage } from "@/_types/home-types";

export async function updateHomeAbout(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifySession();
    const db = getFirestoreDb();
    await db.collection("pageContent").doc("homePage").update({
      "about.content": formData.get("aboutContent") as string,
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update about",
    };
  }
}

export async function updateHomeServices(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifySession();
    const services = JSON.parse((formData.get("services") as string) || "[]");
    const db = getFirestoreDb();
    await db.collection("pageContent").doc("homePage").update({ services });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update services",
    };
  }
}

export async function updateHomeContact(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifySession();
    const db = getFirestoreDb();
    await db.collection("pageContent").doc("homePage").update({
      "contact.general": formData.get("contactGeneral") as string,
      "contact.accounts": formData.get("contactAccounts") as string,
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update contact",
    };
  }
}

export async function updateHomeContent(
  prevState: any,
  formData: FormData
): Promise<ActionResult<HomePage>> {
  try {
    await verifySession();

    const data = {
      meta: {
        title: formData.get("metaTitle") as string,
        description: formData.get("metaDescription") as string,
        keywords: formData.get("metaKeywords") as string,
        images: JSON.parse((formData.get("metaImages") as string) || "[]"),
      },
      about: {
        content: formData.get("aboutContent") as string,
        image1: formData.get("aboutImage1") as string,
        image2: formData.get("aboutImage2") as string,
      },
      ourHomesSliderHomePage: JSON.parse(
        (formData.get("ourHomesSliderHomePage") as string) || "[]",
      ),
      heroDisplayMode: formData.get("heroDisplayMode") as string,
      heroSlider: JSON.parse((formData.get("heroSlider") as string) || "[]"),
      heroLargeMp4: formData.get("heroLargeMp4") as string,
      heroLargeWebm: formData.get("heroLargeWebm") as string,
      heroSmallMp4: formData.get("heroSmallMp4") as string,
      heroSmallWebm: formData.get("heroSmallWebm") as string,
      heroPosterImage: formData.get("heroPosterImage") as string,
      heroOverlayLogo: formData.get("heroOverlayLogo") as string,
      services: JSON.parse((formData.get("services") as string) || "[]"),
      contact: {
        general: formData.get("contactGeneral") as string,
        accounts: formData.get("contactAccounts") as string,
      },
    };

    const db = getFirestoreDb();
    await db.collection("pageContent").doc("homePage").update(data);

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update home content",
    };
  }
}

export async function updateHomeSlider(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifySession();

    const images: string[] = JSON.parse(
      (formData.get("ourHomesSliderHomePage") as string) || "[]"
    );

    const db = getFirestoreDb();
    await db
      .collection("pageContent")
      .doc("homePage")
      .update({ ourHomesSliderHomePage: images });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update home slider",
    };
  }
}
