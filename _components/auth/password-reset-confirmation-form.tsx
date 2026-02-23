"use client";

import { useActionState, useState } from "react";
import { resetPasswordWithFormData } from "@/_actions/auth-actions";
import { validatePassword } from "@/_lib/validation/password-schema";

interface PasswordResetConfirmationFormProps {
  oobCode: string;
}

export function PasswordResetConfirmationForm({
  oobCode,
}: PasswordResetConfirmationFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(validatePassword(""));
  const [state, formAction] = useActionState(resetPasswordWithFormData, {
    success: false,
    error: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setValidation(validatePassword(pwd));
  };

  return (
    <form action={formAction}>
      <input type="hidden" name="oobCode" value={oobCode} />

      {state.error && <div className="text-red-600">{state.error}</div>}
      {state.success && (
        <div className="text-green-600">
          Password reset successfully. You can now log in with your new password.
        </div>
      )}

      <div>
        <label htmlFor="password">New Password</label>
        <div style={{ position: "relative" }}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "8px", top: "8px" }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div style={{ position: "relative" }}>
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            style={{ position: "absolute", right: "8px", top: "8px" }}
          >
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div>
        <h4>Password Requirements:</h4>
        <ul>
          {validation.requirements.map((req) => (
            <li key={req.name}>
              <span>{req.met ? "✓" : "✗"}</span>
              {req.name}
            </li>
          ))}
        </ul>
      </div>

      <div>Strength: {validation.strength}</div>

      <button type="submit" disabled={!validation.isValid}>
        Reset Password
      </button>
    </form>
  );
}
