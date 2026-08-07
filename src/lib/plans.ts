import { dbConnect } from "@/lib/mongodb";
import Plan, { type IPlan } from "@/models/plan";

export interface PlanValues {
  min: number;
  max: number;
  pt: number;
  tr: number;
}

export type PlansMap = Record<"starter" | "silver" | "gold", PlanValues>;

// Fallbacks matching controllers/plan.js savePlan(), used if the DB is empty.
const DEFAULTS: PlansMap = {
  starter: { min: 300, max: 7500, pt: 3900, tr: 15600 },
  silver: { min: 7500, max: 20000, pt: 13750, tr: 55000 },
  gold: { min: 20000, max: 100000, pt: 60000, tr: 240000 },
};

export async function fetchPlansMap(): Promise<PlansMap> {
  await dbConnect();
  const docs = await Plan.find({}).lean<IPlan[]>().exec();
  const byId = new Map(docs.map((d) => [String(d._id), d]));

  const pick = (id: keyof PlansMap): PlanValues => {
    const d = byId.get(id);
    if (!d) return DEFAULTS[id];
    return {
      min: d.min ?? DEFAULTS[id].min,
      max: d.max ?? DEFAULTS[id].max,
      pt: d.pt ?? DEFAULTS[id].pt,
      tr: d.tr ?? DEFAULTS[id].tr,
    };
  };

  return {
    starter: pick("starter"),
    silver: pick("silver"),
    gold: pick("gold"),
  };
}
