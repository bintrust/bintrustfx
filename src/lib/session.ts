import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

/**
 * Replaces the old Express `client-sessions` cookie. iron-session stores the
 * data in a signed + encrypted cookie, which is stateless and works on Vercel's
 * serverless runtime without any external session store.
 */

export interface SessionData {
  userId?: string;
  isLoggedIn: boolean;
  isAdmin?: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

const password = process.env.SESSION_PASSWORD;

if (!password || password.length < 32) {
  throw new Error(
    "SESSION_PASSWORD must be set and at least 32 characters long. Add it to .env and Vercel project settings."
  );
}

export const sessionOptions: SessionOptions = {
  password,
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  },
  // 24 hours, matching the old client-sessions `duration`.
  ttl: 60 * 60 * 24,
};

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  if (session.isLoggedIn === undefined) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
}
