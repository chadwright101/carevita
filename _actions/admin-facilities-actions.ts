"use server";

import { ActionResult } from "@/_types/general-types";
import { Facility } from "@/_types/facility-types";

export async function createFacility(
  prevState: any,
  formData: FormData
): Promise<ActionResult<Facility>> {
  throw new Error("createFacility not implemented");
}

export async function updateFacility(
  prevState: any,
  formData: FormData
): Promise<ActionResult<Facility>> {
  throw new Error("updateFacility not implemented");
}

export async function deleteFacility(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  throw new Error("deleteFacility not implemented");
}

export async function reorderFacilities(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  throw new Error("reorderFacilities not implemented");
}
