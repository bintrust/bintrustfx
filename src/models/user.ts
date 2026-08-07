import mongoose, { Schema, model, models, type Types } from "mongoose";

export interface IBalance {
  profit: number;
  bonus: number;
  ref_bonus: number;
  active: number;
  total: number;
}

export interface IWithdrawalInfo {
  bank?: {
    bank_name?: string;
    account_name?: string;
    account_number?: string;
    routing_number?: string;
  };
  crypto?: {
    btc_address?: string;
    eht_address?: string;
  };
  cash_app?: {
    cash_app_tag?: string;
  };
}

export interface IUser {
  _id: Types.ObjectId;
  regform?: string;
  fname?: string;
  lname?: string;
  email: string;
  phone?: string;
  password?: string;
  country?: string;
  address?: string;
  balance?: IBalance;
  transactions: Types.ObjectId[];
  referrals: Types.ObjectId[];
  withdrawal_info?: IWithdrawalInfo;
  reg_date?: Date;
}

const userSchema = new Schema<IUser>({
  regform: { type: String },
  fname: { type: String },
  lname: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String },
  country: { type: String },
  address: { type: String, default: "" },
  balance: {
    profit: Number,
    bonus: Number,
    ref_bonus: Number,
    active: Number,
    total: Number,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  referrals: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  withdrawal_info: {
    bank: {
      bank_name: String,
      account_name: String,
      account_number: String,
      routing_number: String,
    },
    crypto: {
      btc_address: String,
      eht_address: String,
    },
    cash_app: {
      cash_app_tag: String,
    },
  },
  reg_date: { type: Date, default: () => new Date() },
});

const User =
  (models.User as mongoose.Model<IUser>) || model<IUser>("User", userSchema);

export default User;
