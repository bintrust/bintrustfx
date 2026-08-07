import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import User from "@/models/user";

/**
 * Port of controllers/user.js updateUser.
 * `what` selects the update kind: WITHDRAWAL_INFO (default) | PASSWORD | PROFILE.
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const what: string = body.what || "WITHDRAWAL_INFO";

  await dbConnect();
  const user = await User.findById(session.userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  switch (what) {
    case "WITHDRAWAL_INFO":
      user.withdrawal_info = {
        bank: {
          bank_name: body.bank_name,
          account_name: body.actname,
          account_number: body.actnum,
          routing_number: body.routnum,
        },
        crypto: {
          btc_address: body.btc_address,
        },
        cash_app: {
          cash_app_tag: body.cash_app_tag,
        },
      };
      break;
    case "PASSWORD":
      if (body.password !== body.password_confirmation) {
        return NextResponse.json("Password doesn't match", { status: 401 });
      }
      if (user.password !== body.old_password) {
        return NextResponse.json("Incorrect password", { status: 401 });
      }
      user.password = body.password;
      break;
    case "PROFILE":
      user.fname = body.firstname;
      user.lname = body.surname;
      user.phone = body.phone;
      user.address = body.address;
      break;
    default:
      return NextResponse.json({ error: "Unknown update type" }, { status: 400 });
  }

  await user.save();
  return NextResponse.json("done");
}
