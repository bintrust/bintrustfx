import "dotenv/config";
import mongoose from "mongoose";
import Plan from "../src/models/plan";

/** Seeds the three investment plans (port of controllers/plan.js savePlan). */
async function main() {
  await mongoose.connect(process.env.MONGODB_URL as string);

  const existing = await Plan.find({});
  if (existing.length) {
    console.log(`Plans already present (${existing.length}). Nothing to seed.`);
  } else {
    await Plan.insertMany([
      { _id: "starter", min: 300, max: 7500, pt: 3900, tr: 15600 },
      { _id: "silver", min: 7500, max: 20000, pt: 13750, tr: 55000 },
      { _id: "gold", min: 20000, max: 100000, pt: 60000, tr: 240000 },
    ]);
    console.log("Seeded plans: starter, silver, gold");
  }

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
