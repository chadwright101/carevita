"use server";

import { ActionResult } from "@/_types/general-types";
import { AuthUser } from "@/_types/auth-types";
import { redirect } from "next/navigation";
import {
  createSessionCookie,
  clearSessionCookie,
  verifySession,
} from "@/_lib/auth-utils";
import { passwordResetSchema } from "@/_lib/validation/password-schema";

export async function signIn(
  email: string,
  password: string
): Promise<{ uid: string }> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  const data = await response.json();
  return { uid: data.localId };
}

export async function signInWithFormData(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { uid } = await signIn(email, password);
    await createSessionCookie(uid);

    return { success: true };
  } catch {
    return { success: false, error: "Invalid email or password" };
  }
}

export async function signOut(): Promise<void> {
  await clearSessionCookie();
  redirect("/login");
}

export async function resetPassword(
  oobCode: string,
  newPassword: string
): Promise<ActionResult> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oobCode, newPassword }),
    }
  );

  if (!response.ok) {
    return { success: false, error: "Password reset failed. The link may have expired." };
  }

  return { success: true };
}

export async function resetPasswordWithFormData(
  _prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    const parsed = passwordResetSchema.safeParse({
      oobCode: formData.get("oobCode"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    return await resetPassword(parsed.data.oobCode, parsed.data.password);
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const uid = await verifySession();
    return { uid };
  } catch {
    return null;
  }
}
