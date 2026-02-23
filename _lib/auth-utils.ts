import { cookies } from "next/headers";
import { getAdminAuth } from "@/_lib/firebase-admin";

const SESSION_COOKIE_NAME = "carevita_session";
const SESSION_COOKIE_MAX_AGE = 14 * 24 * 60 * 60;

export async function createSessionCookie(uid: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const uid = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return uid || null;
}

export async function verifySession(): Promise<string> {
  const uid = await getSessionUserId();
  if (!uid) {
    throw new Error("No active session");
  }

  try {
    const auth = getAdminAuth();
    await auth.getUser(uid);
    return uid;
  } catch (error) {
    await clearSessionCookie();
    throw new Error("Invalid session");
  }
}
