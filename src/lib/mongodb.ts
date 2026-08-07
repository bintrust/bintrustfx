import mongoose from "mongoose";

/**
 * Serverless-safe Mongoose connection.
 *
 * On Vercel each function invocation may reuse a warm container, so we cache the
 * connection promise on the Node global to avoid opening a new connection (and
 * exhausting the Atlas connection pool) on every request / hot reload.
 */

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Missing MONGODB_URL environment variable. Set it in .env (local) and in the Vercel project settings."
  );
}

mongoose.set("strictQuery", true);

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL as string, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
