import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

/**
 * Admin auth is credential-based (ADMIN_USERNAME / ADMIN_PASSWORD env vars).
 * A successful /api/admin/login sets `session.isAdmin`.
 */

export function checkAdminCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) {
    throw new Error(
      "ADMIN_USERNAME and ADMIN_PASSWORD must be set in the environment."
    );
  }
  return username === u && password === p;
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return session.isAdmin === true;
}

/** Server-side guard for admin pages/actions — redirects to /admin/login if not an admin. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
