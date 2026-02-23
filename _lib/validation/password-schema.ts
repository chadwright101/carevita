import { z } from "zod";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REQUIREMENTS = [
  { name: "minLength", check: (pwd: string) => pwd.length >= PASSWORD_MIN_LENGTH },
  { name: "hasUppercase", check: (pwd: string) => /[A-Z]/.test(pwd) },
  { name: "hasLowercase", check: (pwd: string) => /[a-z]/.test(pwd) },
  { name: "hasNumber", check: (pwd: string) => /\d/.test(pwd) },
  { name: "hasSpecialChar", check: (pwd: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) },
  { name: "noSequence", check: (pwd: string) => !/(.)\1{2,}|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(pwd) },
  { name: "noCommonWords", check: (pwd: string) => !/password|123456|qwerty|admin|letmein|welcome/i.test(pwd) },
  { name: "minUnique", check: (pwd: string) => new Set(pwd).size >= 4 },
];

export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
  strength: "weak" | "medium" | "strong";
  requirements: Array<{ name: string; met: boolean }>;
}

export function validatePassword(password: string): PasswordValidation {
  const requirements = PASSWORD_REQUIREMENTS.map(({ name, check }) => ({
    name,
    met: check(password),
  }));

  const metCount = requirements.filter((r) => r.met).length;
  const strength: "weak" | "medium" | "strong" =
    metCount >= 7 ? "strong" : metCount >= 5 ? "medium" : "weak";

  const errors = requirements
    .filter((r) => !r.met)
    .map((r) => {
      switch (r.name) {
        case "minLength":
          return `At least ${PASSWORD_MIN_LENGTH} characters`;
        case "hasUppercase":
          return "At least one uppercase letter";
        case "hasLowercase":
          return "At least one lowercase letter";
        case "hasNumber":
          return "At least one number";
        case "hasSpecialChar":
          return "At least one special character";
        case "noSequence":
          return "No repeated characters or sequences";
        case "noCommonWords":
          return "No common words";
        case "minUnique":
          return "At least 4 unique characters";
        default:
          return "Invalid password";
      }
    });

  return {
    isValid: errors.length === 0,
    errors,
    strength,
    requirements,
  };
}

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
  .refine((pwd) => validatePassword(pwd).isValid, "Password does not meet requirements");

export const passwordResetSchema = z.object({
  oobCode: z.string().min(1),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
