"use server";

import { ActionResult } from "@/_types/general-types";
import { AuthUser } from "@/_types/auth-types";

export async function signIn(
  email: string,
  password: string
): Promise<{ uid: string }> {
  throw new Error("signIn not implemented");
}

export async function signInWithFormData(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  throw new Error("signInWithFormData not implemented");
}

export async function signOut(): Promise<ActionResult> {
  throw new Error("signOut not implemented");
}

export async function resetPassword(
  oobCode: string,
  newPassword: string
): Promise<ActionResult> {
  throw new Error("resetPassword not implemented");
}

export async function resetPasswordWithFormData(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  throw new Error("resetPasswordWithFormData not implemented");
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  throw new Error("getCurrentUser not implemented");
}
