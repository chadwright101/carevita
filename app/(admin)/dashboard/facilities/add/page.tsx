import Link from "next/link";
import FacilityAddForm from "@/_components/user/dashboard/facilities/facility-add-form";

export default function AddFacilityPage() {
  return (
    <main className="flex mt-15 flex-col gap-6">
      <Link href="/dashboard">← Back to Dashboard</Link>
      <h1>Add Facility</h1>
      <FacilityAddForm />
    </main>
  );
}
