"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/_lib/auth-utils";
import { getFirestoreDb } from "@/_lib/firebase-admin";
import { ActionResult, HomePage } from "@/_types/general-types";

export async function updateHomeAbout(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifySession();
    const db = getFirestoreDb();
    await db.collection("siteContent").doc("homePage").update({
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
    await db.collection("siteContent").doc("homePage").update({ services });
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
    await db.collection("siteContent").doc("homePage").update({
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
      about: {
        content: formData.get("aboutContent") as string,
      },
      services: JSON.parse((formData.get("services") as string) || "[]"),
      contact: {
        general: formData.get("contactGeneral") as string,
        accounts: formData.get("contactAccounts") as string,
      },
    };

    const db = getFirestoreDb();
    await db.collection("siteContent").doc("homePage").update(data);

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
      .collection("siteContent")
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
