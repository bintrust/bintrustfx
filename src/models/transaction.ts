import mongoose, { Schema, model, models, type Types } from "mongoose";

export interface ITransaction {
  _id: Types.ObjectId;
  type?: string;
  amount?: number;
  payment_mode?: string;
  status?: string;
  date?: Date;
  walletaddress?: string;
  user?: Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>({
  type: String,
  amount: Number,
  payment_mode: String,
  status: String,
  date: Date,
  walletaddress: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Transaction =
  (models.Transaction as mongoose.Model<ITransaction>) ||
  model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
