"use server";

import { verifySession } from "@/_lib/auth-utils";
import { getAdminStorage } from "@/_lib/firebase-admin";
import { ActionResult } from "@/_types/general-types";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export async function uploadImage(
  prevState: any,
  formData: FormData
): Promise<ActionResult<{ url: string }>> {
  try {
    await verifySession();

    const file = formData.get("file") as File;
    const storagePath = formData.get("storagePath") as string;

    if (!file || file.size === 0) {
      return { success: false, error: "No file provided" };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return { success: false, error: "Invalid file type. Use JPEG, PNG, or WebP" };
    }

    if (file.size > MAX_SIZE_BYTES) {
      return { success: false, error: "File exceeds 5MB limit" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const storage = getAdminStorage();
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
    const fileRef = bucket.file(`${storagePath}/${file.name}`);

    await fileRef.save(buffer, { contentType: file.type });
    await fileRef.makePublic();

    const url = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;

    return { success: true, data: { url } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
}
