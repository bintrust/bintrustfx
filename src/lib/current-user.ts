import { dbConnect } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import User, { type IUser } from "@/models/user";
import Transaction, { type ITransaction } from "@/models/transaction";

export type PlainTransaction = Omit<ITransaction, "_id" | "user"> & {
  _id: string;
  user?: string;
};

export type PlainUser = Omit<
  IUser,
  "_id" | "transactions" | "referrals" | "password"
> & {
  _id: string;
  transactions: PlainTransaction[];
  referrals: string[];
};

/**
 * Server-side equivalent of the old Express middleware that loaded
 * `req.session.userId` into `req.user` with transactions populated.
 * Returns a plain (serializable) object with the password stripped, or null.
 */
export async function getCurrentUser(): Promise<PlainUser | null> {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) return null;

  await dbConnect();
  // Ensure the Transaction model is registered before populate runs.
  void Transaction;

  const user = await User.findById(session.userId)
    .populate("transactions")
    .lean<IUser & { transactions: ITransaction[] }>()
    .exec();

  if (!user) return null;

  return JSON.parse(JSON.stringify({ ...user, password: undefined })) as PlainUser;
}
