import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";

/** Port of app.js GET /user/logout — resets the session and redirects home. */
export async function GET(request: NextRequest) {
  const session = await getSession();
  session.destroy();
  return NextResponse.redirect(new URL("/", request.url));
}
