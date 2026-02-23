"use server";

import { Facility } from "@/_types/facility-types";
import { HomePage } from "@/_types/general-types";

export async function getAllFacilities(): Promise<Facility[]> {
  throw new Error("getAllFacilities not implemented");
}

export async function getFacilityBySlug(slug: string): Promise<Facility | null> {
  throw new Error("getFacilityBySlug not implemented");
}

export async function getHomePageContent(): Promise<HomePage> {
  throw new Error("getHomePageContent not implemented");
}
