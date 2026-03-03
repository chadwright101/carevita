"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Link from "next/link";
import { signInWithFormData } from "@/_actions/auth-actions";
import Button from "@/_components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, formAction] = useActionState(signInWithFormData, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  async function handleAction(formData: FormData) {
    if (executeRecaptcha) {
      const token = await executeRecaptcha("login");
      formData.set("recaptchaToken", token);
    }
    formAction(formData);
  }

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md px-6">
        <h1 className="text-center mb-8">Sign In</h1>
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
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full pl-2 py-1.5 border-black/25 border"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full pl-2 py-1.5 border-black/25 border"
              />
            </div>
            {state.error && <p className="text-error">{state.error}</p>}
            <Button variant="form" cssClasses="w-full justify-center">
              Sign In
            </Button>
            <div className="text-center">
              <Link href="/forgot-password" className="text-link">
                Forgot Password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
