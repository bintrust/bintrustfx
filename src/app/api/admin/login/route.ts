import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { checkAdminCredentials } from "@/lib/admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body ?? {};

  if (!checkAdminCredentials(String(username ?? ""), String(password ?? ""))) {
    return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
