"use server";

import { ActionResult } from "@/_types/general-types";
import { HomePage } from "@/_types/general-types";

export async function updateHomeContent(
  prevState: any,
  formData: FormData
): Promise<ActionResult<HomePage>> {
  throw new Error("updateHomeContent not implemented");
}

export async function updateHomeSlider(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  throw new Error("updateHomeSlider not implemented");
}
