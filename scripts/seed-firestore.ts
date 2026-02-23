import { getFirestoreDb, getFirebaseAdminApp } from "@/_lib/firebase-admin";
import * as fs from "fs";
import * as path from "path";

interface SeedConfig {
  jsonFile: string;
  docId: string;
  region: "WC" | "GP" | "EC";
  order: number;
}

const SEED_CONFIG: SeedConfig[] = [
  {
    jsonFile: "hartland-data.json",
    docId: "hartland-estate",
    region: "WC",
    order: 1,
  },
  {
    jsonFile: "crescent-data.json",
    docId: "the-crescent",
    region: "WC",
    order: 2,
  },
  {
    jsonFile: "eastlands-data.json",
    docId: "eastlands",
    region: "GP",
    order: 3,
  },
  {
    jsonFile: "serene-data.json",
    docId: "serene-park",
    region: "GP",
    order: 4,
  },
  {
    jsonFile: "parsonage-data.json",
    docId: "parsonage-street-home",
    region: "EC",
    order: 5,
  },
];

async function seedFirestore() {
  console.log("Starting Firestore seed...");

  try {
    getFirebaseAdminApp();
    const db = getFirestoreDb();

    for (const config of SEED_CONFIG) {
      try {
        const filePath = path.join(process.cwd(), "_data", config.jsonFile);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(fileContent);

        const facilityDoc = {
          ...jsonData,
          region: config.region,
          order: config.order,
          isActive: true,
          timestamp: Date.now(),
        };

        await db
          .collection("facilities")
          .doc(config.docId)
          .set(facilityDoc);

        console.log(`✓ Seeded ${config.docId} from ${config.jsonFile}`);
      } catch (error) {
        console.error(
          `✗ Failed to seed ${config.docId}:`,
          error instanceof Error ? error.message : error
        );
      }
    }

    console.log("Firestore seed complete!");
  } catch (error) {
    console.error(
      "Seed failed:",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

seedFirestore();
