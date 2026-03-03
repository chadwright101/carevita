import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import { verifySession } from "@/_lib/auth-utils";
import { AuthProvider } from "@/_contexts/auth-context";
import { ToastContainer } from "react-toastify";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await verifySession();
  } catch {
    redirect("/login");
  }

  return (
    <AuthProvider>
      {children}
      <ToastContainer position="bottom-right" />
    </AuthProvider>
  );
}
