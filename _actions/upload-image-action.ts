"use server";

import { ActionResult } from "@/_types/general-types";

export async function uploadImage(
  prevState: any,
  formData: FormData
): Promise<ActionResult<{ url: string }>> {
  throw new Error("uploadImage not implemented");
}
