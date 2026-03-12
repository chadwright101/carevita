"use server";

import sharp from "sharp";
import { verifySession } from "@/_lib/auth-utils";
import { getAdminStorage } from "@/_lib/firebase-admin";
import { ActionResult } from "@/_types/general-types";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

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
      return { success: false, error: "File exceeds 10MB limit" };
    }

    const rawBuffer = Buffer.from(await file.arrayBuffer());
    const processedBuffer = await sharp(rawBuffer)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp()
      .toBuffer();

    const storage = getAdminStorage();
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);

    const dotIndex = file.name.lastIndexOf(".");
    const base = dotIndex !== -1 ? file.name.slice(0, dotIndex) : file.name;
    const filename = `${base}-${Date.now()}.webp`;
    const fileRef = bucket.file(`${storagePath}/${filename}`);

    await fileRef.save(processedBuffer, { contentType: "image/webp" });
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
