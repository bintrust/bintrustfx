import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import User from "@/models/user";

/** Port of controllers/user.js loginUser + the app.js POST /user/login route. */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = String(body.email || "").toLowerCase().trim();

  await dbConnect();

  const user = await User.findOne({ email });
  // Plaintext comparison preserved from the original (see README).
  if (!user || user.password !== body.password) {
    return NextResponse.json(
      { error: "Incorrect email or password" },
      { status: 401 }
    );
  }

  const session = await getSession();
  session.userId = String(user._id);
  session.isLoggedIn = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
