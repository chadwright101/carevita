"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Link from "next/link";
import { signInWithFormData } from "@/_actions/auth-actions";
import ButtonType from "@/_components/ui/button-type";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    startTransition(() => formAction(formData));
  }

  const showSpinner = isPending || state.success;

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md px-6">
        <h1 className="text-center mb-8">
          {showSpinner ? "Signing In..." : "Sign In"}
        </h1>
        <form action={handleAction}>
          <div className="relative">
            {showSpinner && (
              <div className="absolute inset-0 bg-white flex justify-center z-10">
                <div className="spinner-black-large" />
              </div>
            )}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={showSpinner}
                  className="w-full pl-2 py-1.5 border-black/25 border"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={showSpinner}
                    className="w-full pl-2 py-1.5 pr-16 border-black/25 border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[14px] desktop:hover:cursor-pointer"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {state.error && <p className="text-error">{state.error}</p>}
              <ButtonType
                backgroundColor="green"
                iconArrow
                cssClasses="w-full justify-center"
                disabled={showSpinner}
              >
                Sign In
              </ButtonType>
              <div className="text-center">
                <Link href="/forgot-password" className="text-link">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
