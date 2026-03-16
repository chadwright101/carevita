"use server";

import { verifySession } from "@/_lib/auth-utils";
import { getAdminStorage } from "@/_lib/firebase-admin";
import { ActionResult } from "@/_types/general-types";

const ALLOWED_TYPES = ["video/mp4", "video/webm"];
const MAX_SIZE_BYTES = 3 * 1024 * 1024;

export async function uploadVideo(
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
      return { success: false, error: "Invalid file type. Use MP4 or WebM" };
    }

    const maxSizeOverride = formData.get("maxSizeBytes");
    const MAX = maxSizeOverride ? parseInt(maxSizeOverride as string) : MAX_SIZE_BYTES;

    if (file.size > MAX) {
      const mb = (MAX / (1024 * 1024)).toFixed(2).replace(/\.?0+$/, "");
      return { success: false, error: `File exceeds ${mb}MB limit` };
    }

    const rawBuffer = Buffer.from(await file.arrayBuffer());

    const storage = getAdminStorage();
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);

    const dotIndex = file.name.lastIndexOf(".");
    const base = dotIndex !== -1 ? file.name.slice(0, dotIndex) : file.name;
    const ext = dotIndex !== -1 ? file.name.slice(dotIndex + 1) : "mp4";
    const filename = `${base}-${Date.now()}.${ext}`;
    const fileRef = bucket.file(`${storagePath}/${filename}`);

    await fileRef.save(rawBuffer, { contentType: file.type });
    await fileRef.makePublic();

    const url = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;

    return { success: true, data: { url } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload video",
    };
  }
}
