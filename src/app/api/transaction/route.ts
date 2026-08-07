import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import User from "@/models/user";
import Transaction from "@/models/transaction";

/**
 * Reads the request body whether it arrives as JSON (React forms) or as
 * application/x-www-form-urlencoded (the legacy jQuery `$.ajax(serialize())`
 * deposit/withdrawal forms).
 */
async function readBody(request: NextRequest): Promise<Record<string, string>> {
  const ct = request.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return (await request.json()) as Record<string, string>;
  }
  const form = await request.formData();
  const obj: Record<string, string> = {};
  for (const [k, v] of form.entries()) obj[k] = String(v);
  return obj;
}

/** Port of controllers/transaction.js createTransaction (deposit + withdrawal). */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await readBody(request);
  const typeParam = request.nextUrl.searchParams.get("type") || body.type;
  const type = typeParam === "withdrawal" ? "withdrawal" : "deposit";

  let walletaddress = body.walletaddress;
  switch (body.payment_mode) {
    case "Ethereum":
      walletaddress = body.ethereum;
      break;
    case "Bitcoin":
      walletaddress = body.bitcoin;
      break;
    default:
      walletaddress = body.walletaddress || body.usdt;
      break;
  }

  await dbConnect();

  const savedTrx = await Transaction.create({
    type,
    amount: body.amount,
    payment_mode: body.payment_mode,
    walletaddress,
    status: "pending",
    date: new Date(),
    user: session.userId,
  });

  const user = await User.findById(session.userId);
  if (user) {
    user.transactions.push(savedTrx._id);
    await user.save();
  }

  return new NextResponse("done", { status: 200 });
}
