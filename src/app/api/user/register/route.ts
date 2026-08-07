import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import User from "@/models/user";

/** Port of controllers/user.js saveUser + the app.js POST /user/register route. */
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.password !== body.password_confirmation) {
    return NextResponse.json({ error: "Password mismatch" }, { status: 400 });
  }

  const email = String(body.email || "").toLowerCase().trim();

  await dbConnect();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  const balance = {
    profit: 0.0,
    bonus: 10.0,
    ref_bonus: 0.0,
    active: 0.0,
    total: 10.0,
  };

  const newUser = await User.create({
    regform: body.regform,
    fname: body.fname,
    lname: body.lname,
    email,
    phone: body.phone,
    // NOTE: stored as plaintext to preserve the original behavior (see README).
    password: body.password,
    country: body.country,
    balance,
  });

  const session = await getSession();
  session.userId = String(newUser._id);
  session.isLoggedIn = true;
  await session.save();

  return NextResponse.json(
    { success: true, userId: String(newUser._id) },
    { status: 201 }
  );
}
