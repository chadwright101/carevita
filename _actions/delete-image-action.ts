"use server";

import { verifySession } from "@/_lib/auth-utils";
import { getAdminStorage } from "@/_lib/firebase-admin";
import { ActionResult } from "@/_types/general-types";

export async function deleteImage(storageUrl: string): Promise<ActionResult> {
  try {
    await verifySession();

    const url = new URL(storageUrl);
    const objectPath = decodeURIComponent(url.pathname.split("/").slice(2).join("/"));

    const storage = getAdminStorage();
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);

    await bucket.file(objectPath).delete();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete image",
    };
  }
}
