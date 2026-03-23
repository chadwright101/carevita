import Link from "next/link";
import { getHomePageContent } from "@/_actions/facilities-actions";
import HomeEditForm from "../../../../_components/user/dashboard/home-content/home-edit-form";

export default async function EditHomePage() {
  const homeContent = await getHomePageContent();

  return (
    <main className="flex mt-15 flex-col gap-6">
      <Link href="/dashboard">← Back to Dashboard</Link>
      <h1>Home Page</h1>
      <HomeEditForm homeContent={homeContent} />
    </main>
  );
}
