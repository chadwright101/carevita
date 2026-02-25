import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";
config({ path: path.join(process.cwd(), ".env.local") });
import { getFirestoreDb } from "../_lib/firebase-admin";
import type { Facility, FacilityNavigation, HomePageContent } from "../_types/facility-types";

interface FacilityMapping {
  jsonFile: string;
  docId: string;
  region: "WC" | "GP" | "EC";
  order: number;
}

const FACILITY_MAPPINGS: FacilityMapping[] = [
  {
    jsonFile: "hartland-data.json",
    docId: "hartland-estate",
    region: "WC",
    order: 1,
  },
  { jsonFile: "crescent-data.json", docId: "the-crescent", region: "WC", order: 2 },
  { jsonFile: "eastlands-data.json", docId: "eastlands", region: "GP", order: 3 },
  { jsonFile: "serene-data.json", docId: "serene-park", region: "GP", order: 4 },
  {
    jsonFile: "parsonage-data.json",
    docId: "parsonage-street-home",
    region: "EC",
    order: 5,
  },
];

async function seedFacilities() {
  const db = getFirestoreDb();
  const dataDir = path.join(process.cwd(), "_data");

  for (const mapping of FACILITY_MAPPINGS) {
    const filePath = path.join(dataDir, mapping.jsonFile);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${mapping.jsonFile}`);
      continue;
    }

    const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const facilityDoc: Facility = {
      general: {
        ...rawData.general,
        region: mapping.region,
      },
      whatWeOffer: rawData.whatWeOffer,
      about: rawData.about,
      ...(rawData.meetTheTeam && { meetTheTeam: rawData.meetTheTeam }),
      images: rawData.images,
      ...(rawData.video && { video: rawData.video }),
      order: mapping.order,
      isActive: true,
      timestamp: Date.now(),
    };

    const facilityNavDoc: FacilityNavigation = {
      slug: rawData.general.slug,
      shortTitle: rawData.general.shortTitle,
      location: rawData.general.location,
      homeUrl: rawData.general.homeUrl,
      hasStaff: Array.isArray(rawData.meetTheTeam) && rawData.meetTheTeam.length > 2,
      title: rawData.general.title,
      extendedTitle: rawData.general.extendedTitle,
      extendedLocation: rawData.general.extendedLocation,
      description: rawData.general.description,
      featuredImage: rawData.images.heroSlider[0],
      region: mapping.region,
      order: mapping.order,
      isActive: true,
    };

    try {
      await db.collection("facilities").doc(mapping.docId).set(facilityDoc);
      console.log(`✅ Migrated facility: ${mapping.docId}`);
      await db.collection("facilityNavigation").doc(mapping.docId).set(facilityNavDoc);
      console.log(`✅ Migrated facilityNavigation: ${mapping.docId}`);
    } catch (error) {
      console.error(`❌ Failed to migrate ${mapping.docId}:`, error);
    }
  }
}

async function seedHomePageContent() {
  const db = getFirestoreDb();
  const generalDataPath = path.join(process.cwd(), "_data", "general-data.json");

  if (!fs.existsSync(generalDataPath)) {
    console.log("⚠️  general-data.json not found");
    return;
  }

  const generalData = JSON.parse(fs.readFileSync(generalDataPath, "utf-8"));

  const homePageContent: HomePageContent = {
    about: generalData.homePage.about,
    ourHomesSliderHomePage: generalData.homePage.ourHomesSliderHomePage,
    services: generalData.homePage.services || [],
    contact: generalData.homePage.contact,
  };

  try {
    await db.collection("siteContent").doc("homePage").set(homePageContent);
    console.log("✅ Migrated homePage content");
  } catch (error) {
    console.error("❌ Failed to migrate homePage content:", error);
  }
}

async function main() {
  console.log("🚀 Starting Firestore migration...\n");

  try {
    await seedFacilities();
    console.log("\n");
    await seedHomePageContent();
    console.log("\n✨ Migration complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

main();
