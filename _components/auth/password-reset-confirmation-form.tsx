"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { resetPasswordWithFormData } from "@/_actions/auth-actions";
import { validatePassword } from "@/_lib/validation/password-schema";
import Button from "@/_components/ui/button";

interface PasswordResetConfirmationFormProps {
  oobCode: string;
}

export function PasswordResetConfirmationForm({
  oobCode,
}: PasswordResetConfirmationFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState(validatePassword(""));
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [state, formAction] = useActionState(resetPasswordWithFormData, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (state.success) {
      router.push("/login");
    }
  }, [state.success, router]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setValidation(validatePassword(pwd));
  };

  useEffect(() => {
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [password, confirmPassword]);

  const isFormValid = validation.isValid && passwordsMatch && password.length > 0;

  const getStrengthColor = () => {
    switch (validation.strength) {
      case "strong":
        return "bg-green";
      case "medium":
        return "bg-lightGreen";
      default:
        return "bg-error";
    }
  };

  const unmetRequirements = validation.requirements.filter((r) => !r.met);

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md px-6">
        <h1 className="text-center mb-8">Reset Password</h1>
        <form action={formAction}>
          <input type="hidden" name="oobCode" value={oobCode} />
          <div className="flex flex-col gap-5">
            {state.error && (
              <p className="text-error">{state.error}</p>
            )}

            <div>
              <label htmlFor="password" className="block mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className="w-full pl-2 py-1.5 pr-16 border border-black/25"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-smaller desktop:hover:cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  className="w-full pl-2 py-1.5 pr-16 border border-black/25"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-smaller desktop:hover:cursor-pointer"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {password && (
              <div className="border border-black/20 rounded-lg p-4 flex flex-col gap-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-smaller font-medium">Password Strength</span>
                    <span className="text-smaller font-medium capitalize">
                      {validation.strength}
                    </span>
                  </div>
                  <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{
                        width:
                          validation.strength === "strong"
                            ? "100%"
                            : validation.strength === "medium"
                              ? "66%"
                              : "33%",
                      }}
                    />
                  </div>
                </div>

                {(unmetRequirements.length > 0 || (!passwordsMatch && confirmPassword)) && (
                  <div className="flex flex-col gap-1">
                    <p className="text-smaller font-medium">Requirements:</p>
                    {unmetRequirements.map((req) => (
                      <p key={req.name} className="text-smaller text-error">
                        ✗ {req.name}
                      </p>
                    ))}
                    {!passwordsMatch && confirmPassword && (
                      <p className="text-smaller text-error">✗ Passwords do not match</p>
                    )}
                  </div>
                )}
              </div>
            )}

            <Button variant="form" cssClasses="w-full justify-center" disabled={!isFormValid}>
              Reset Password
            </Button>

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
