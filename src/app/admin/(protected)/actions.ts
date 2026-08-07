"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/mongodb";
import { isAdmin } from "@/lib/admin";
import User, { type IBalance } from "@/models/user";
import Transaction from "@/models/transaction";
import Plan from "@/models/plan";

export interface ActionState {
  ok?: boolean;
  error?: string;
  message?: string;
}

const BALANCE_FIELDS: (keyof IBalance)[] = [
  "profit",
  "bonus",
  "ref_bonus",
  "active",
  "total",
];

async function guard(): Promise<ActionState | null> {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  return null;
}

function num(v: FormDataEntryValue | null): number {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
}

/** Update (upsert) an investment plan's numbers. */
export async function adminUpdatePlan(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const g = await guard();
  if (g) return g;

  const planId = String(formData.get("planId") || "");
  if (!["starter", "silver", "gold"].includes(planId)) {
    return { error: "Invalid plan id" };
  }

  await dbConnect();
  await Plan.findByIdAndUpdate(
    planId,
    {
      _id: planId,
      min: num(formData.get("min")),
      max: num(formData.get("max")),
      pt: num(formData.get("pt")),
      tr: num(formData.get("tr")),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  revalidatePath("/admin/plans");
  return { ok: true, message: `Saved ${planId} plan.` };
}

/** Create a new user account (admin). */
export async function adminCreateUser(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const g = await guard();
  if (g) return g;

  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Email and password are required." };

  await dbConnect();
  if (await User.findOne({ email })) {
    return { error: "A user with that email already exists." };
  }

  await User.create({
    fname: String(formData.get("fname") || ""),
    lname: String(formData.get("lname") || ""),
    email,
    phone: String(formData.get("phone") || ""),
    country: String(formData.get("country") || ""),
    // Plaintext to match the rest of the app (see README caveats).
    password,
    balance: { profit: 0, bonus: 10, ref_bonus: 0, active: 0, total: 10 },
  });

  revalidatePath("/admin/users");
  return { ok: true, message: `User ${email} created.` };
}

/** Delete a user profile and its transactions. */
export async function adminDeleteUser(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const g = await guard();
  if (g) return g;

  const id = String(formData.get("id") || "");
  if (!id) return { error: "Missing user id." };

  await dbConnect();
  const user = await User.findById(id);
  if (!user) return { error: "User not found." };

  await Transaction.deleteMany({ user: id });
  await User.findByIdAndDelete(id);

  revalidatePath("/admin/users");
  return { ok: true, message: "User profile deleted." };
}

/** Add or subtract an amount on one of a user's balance fields. */
export async function adminAdjustBalance(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const g = await guard();
  if (g) return g;

  const id = String(formData.get("id") || "");
  const field = String(formData.get("field") || "") as keyof IBalance;
  const op = String(formData.get("op") || "add");
  const amount = num(formData.get("amount"));

  if (!BALANCE_FIELDS.includes(field)) return { error: "Invalid balance field." };
  if (!amount) return { error: "Enter a non-zero amount." };

  await dbConnect();
  const user = await User.findById(id);
  if (!user) return { error: "User not found." };

  const delta = op === "subtract" ? -amount : amount;
  const balance: IBalance = {
    profit: user.balance?.profit ?? 0,
    bonus: user.balance?.bonus ?? 0,
    ref_bonus: user.balance?.ref_bonus ?? 0,
    active: user.balance?.active ?? 0,
    total: user.balance?.total ?? 0,
  };
  balance[field] = (balance[field] ?? 0) + delta;
  user.balance = balance;
  await user.save();

  revalidatePath(`/admin/users/${id}`);
  return {
    ok: true,
    message: `${op === "subtract" ? "Subtracted" : "Added"} $${amount} ${
      op === "subtract" ? "from" : "to"
    } ${field}.`,
  };
}

/** Create a deposit/withdrawal on a user's behalf, adjusting their balance. */
export async function adminCreateTransaction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const g = await guard();
  if (g) return g;

  const id = String(formData.get("id") || "");
  const type = String(formData.get("type") || "deposit") === "withdrawal"
    ? "withdrawal"
    : "deposit";
  const amount = num(formData.get("amount"));
  const payment_mode = String(formData.get("payment_mode") || "");
  const walletaddress = String(formData.get("walletaddress") || "");
  const status = String(formData.get("status") || "completed");

  if (!amount) return { error: "Enter a non-zero amount." };

  await dbConnect();
  const user = await User.findById(id);
  if (!user) return { error: "User not found." };

  const trx = await Transaction.create({
    type,
    amount,
    payment_mode,
    walletaddress,
    status,
    date: new Date(),
    user: id,
  });
  user.transactions.push(trx._id);

  // Reflect the transaction in the balance.
  const balance: IBalance = {
    profit: user.balance?.profit ?? 0,
    bonus: user.balance?.bonus ?? 0,
    ref_bonus: user.balance?.ref_bonus ?? 0,
    active: user.balance?.active ?? 0,
    total: user.balance?.total ?? 0,
  };
  if (type === "deposit") {
    balance.active += amount;
    balance.total += amount;
  } else {
    balance.total -= amount;
  }
  user.balance = balance;
  await user.save();

  revalidatePath(`/admin/users/${id}`);
  return { ok: true, message: `${type} of $${amount} recorded.` };
}

/** Set/reset a user's password (support action — no plaintext viewing). */
export async function adminSetPassword(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const g = await guard();
  if (g) return g;

  const id = String(formData.get("id") || "");
  const password = String(formData.get("password") || "");
  if (password.length < 4) return { error: "Password is too short." };

  await dbConnect();
  const user = await User.findById(id);
  if (!user) return { error: "User not found." };

  user.password = password;
  await user.save();

  revalidatePath(`/admin/users/${id}`);
  return { ok: true, message: "Password updated." };
}
