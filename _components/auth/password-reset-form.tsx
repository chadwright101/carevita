"use client";

import { useState } from "react";
import { getFirebaseAuth } from "@/_lib/firebase-client";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import ButtonType from "@/_components/ui/button-type";

export function PasswordResetForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAction(formData: FormData) {
    setError(null);
    setIsLoading(true);
    try {
      const auth = getFirebaseAuth();
      await sendPasswordResetEmail(auth, formData.get("email") as string, {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/password-reset`,
      });
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md px-6 text-center flex flex-col gap-4">
          <p>
            Password reset email has been sent. Please check your inbox and
            follow the link to reset your password.
          </p>
          <Link href="/login" className="text-link">
            Back to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md px-6">
        <h1 className="text-center mb-8">Forgot Password</h1>
        <form action={handleAction}>
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
                disabled={isLoading}
                className="w-full pl-2 py-1.5 border border-black/25"
              />
            </div>

            {error && <p className="text-error">{error}</p>}

            <ButtonType backgroundColor="green" iconArrow cssClasses="w-full justify-center" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Email"}
            </ButtonType>

            <div className="text-center">
              <Link href="/login" className="text-link">
                Back to Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
