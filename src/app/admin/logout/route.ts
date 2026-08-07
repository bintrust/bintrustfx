import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";

/** Clears only the admin flag and returns to the admin login. */
export async function GET(request: NextRequest) {
  const session = await getSession();
  session.isAdmin = false;
  await session.save();
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
