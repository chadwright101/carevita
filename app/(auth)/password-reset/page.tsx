import { PasswordResetConfirmationForm } from "@/_components/auth/password-reset-confirmation-form";

interface ResetPasswordPageProps {
  searchParams: Promise<{ oobCode?: string }>;
}

export default async function PasswordResetPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { oobCode } = await searchParams;

  if (!oobCode) {
    return (
      <main>
        <p className="text-[#dc2626]">Invalid or missing reset link.</p>
      </main>
    );
  }

  return (
    <main>
      <PasswordResetConfirmationForm oobCode={oobCode} />
    </main>
  );
}
