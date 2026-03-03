"use client";

import { useAuth } from "@/_contexts/auth-context";
import { signOut } from "@/_actions/auth-actions";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1>Dashboard</h1>
          {user?.email && <p>{user.email}</p>}
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="desktop:hover:cursor-pointer"
          >
            Sign Out
          </button>
        </form>
      </div>
    </main>
  );
}
