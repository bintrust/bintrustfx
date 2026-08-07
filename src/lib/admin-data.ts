import { dbConnect } from "@/lib/mongodb";
import User, { type IUser } from "@/models/user";
import Transaction, { type ITransaction } from "@/models/transaction";
import Plan, { type IPlan } from "@/models/plan";

export interface AdminUserRow {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  country: string;
  total: number;
  txns: number;
  regDate: string | null;
}

export async function listUsers(): Promise<AdminUserRow[]> {
  await dbConnect();
  const users = await User.find({}).sort({ reg_date: -1 }).lean<IUser[]>().exec();
  return users.map((u) => ({
    _id: String(u._id),
    fname: u.fname ?? "",
    lname: u.lname ?? "",
    email: u.email,
    phone: u.phone ?? "",
    country: u.country ?? "",
    total: u.balance?.total ?? 0,
    txns: Array.isArray(u.transactions) ? u.transactions.length : 0,
    regDate: u.reg_date ? new Date(u.reg_date).toISOString() : null,
  }));
}

export interface AdminUserDetail {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  password: string;
  regDate: string | null;
  balance: { profit: number; bonus: number; ref_bonus: number; active: number; total: number };
  withdrawal_info: IUser["withdrawal_info"];
  transactions: {
    _id: string;
    type: string;
    amount: number;
    payment_mode: string;
    status: string;
    date: string | null;
    walletaddress: string;
  }[];
}

export async function getUserDetail(id: string): Promise<AdminUserDetail | null> {
  await dbConnect();
  void Transaction;
  let user;
  try {
    user = await User.findById(id)
      .populate("transactions")
      .lean<Omit<IUser, "transactions"> & { transactions: ITransaction[] }>()
      .exec();
  } catch {
    return null; // invalid ObjectId etc.
  }
  if (!user) return null;

  return {
    _id: String(user._id),
    fname: user.fname ?? "",
    lname: user.lname ?? "",
    email: user.email,
    phone: user.phone ?? "",
    country: user.country ?? "",
    address: user.address ?? "",
    password: user.password ?? "",
    regDate: user.reg_date ? new Date(user.reg_date).toISOString() : null,
    balance: {
      profit: user.balance?.profit ?? 0,
      bonus: user.balance?.bonus ?? 0,
      ref_bonus: user.balance?.ref_bonus ?? 0,
      active: user.balance?.active ?? 0,
      total: user.balance?.total ?? 0,
    },
    withdrawal_info: user.withdrawal_info ?? {},
    transactions: (user.transactions ?? []).map((t) => ({
      _id: String(t._id),
      type: t.type ?? "",
      amount: t.amount ?? 0,
      payment_mode: t.payment_mode ?? "",
      status: t.status ?? "",
      date: t.date ? new Date(t.date).toISOString() : null,
      walletaddress: t.walletaddress ?? "",
    })),
  };
}

export async function getAllPlans() {
  await dbConnect();
  const docs = await Plan.find({}).lean<IPlan[]>().exec();
  const byId = new Map(docs.map((d) => [String(d._id), d]));
  const pick = (id: string) => {
    const d = byId.get(id);
    return {
      min: d?.min ?? 0,
      max: d?.max ?? 0,
      pt: d?.pt ?? 0,
      tr: d?.tr ?? 0,
    };
  };
  return {
    starter: pick("starter"),
    silver: pick("silver"),
    gold: pick("gold"),
  };
}

export async function countUsers(): Promise<number> {
  await dbConnect();
  return User.countDocuments({});
}
