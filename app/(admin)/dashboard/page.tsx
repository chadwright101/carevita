import Link from "next/link";
import { getAllFacilitiesAdmin } from "@/_actions/admin-facilities-actions";
import FacilitiesSection from "@/_components/user/dashboard/facilities/facilities-section";
import { buttonStyles } from "@/_styles/button-styles";

export default async function DashboardPage() {
  const facilities = await getAllFacilitiesAdmin();

  return (
    <main className="flex pt-15 flex-col gap-10">
      <h1>Dashboard</h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-subheading">Pages</h2>
        <div className="flex gap-5">
          <Link
            href="/dashboard/edit-home-page"
            className={buttonStyles("self-start", false, false, "blue")}
          >
            Edit Home Page
          </Link>
          <Link
            href="https://wordpress.carevita.co.za/wp-admin/edit.php"
            className={buttonStyles("self-start", false, false, "green")}
            target="_blank"
          >
            Edit Blog
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <FacilitiesSection facilities={facilities} />
        <Link
          href="/dashboard/facilities/add"
          className={buttonStyles("self-start", false, false, "green")}
        >
          Add Facility
        </Link>
      </div>
    </main>
  );
}
