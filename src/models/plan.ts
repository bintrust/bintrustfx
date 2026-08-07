import mongoose, { Schema, model, models } from "mongoose";

export interface IPlan {
  _id: string;
  min?: number;
  max?: number;
  pt?: number;
  tr?: number;
}

const plansSchema = new Schema<IPlan>({
  _id: String,
  min: Number,
  max: Number,
  pt: Number,
  tr: Number,
});

// Model name kept as "Plans" to match the existing collection.
const Plan =
  (models.Plans as mongoose.Model<IPlan>) ||
  model<IPlan>("Plans", plansSchema);

export default Plan;
