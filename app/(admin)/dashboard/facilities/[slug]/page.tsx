import { notFound } from "next/navigation";
import Link from "next/link";
import { getFacilityBySlugAdmin } from "@/_actions/admin-facilities-actions";
import FacilityEditForm from "@/_components/user/dashboard/facilities/facility-edit-form";

export default async function EditFacilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const facility = await getFacilityBySlugAdmin(slug);
  if (!facility) notFound();

  return (
    <main className="flex mt-15 flex-col gap-6">
      <Link href="/dashboard">← Back to Dashboard</Link>
      <h1>Edit {facility.general.facilityName}</h1>
      <FacilityEditForm facility={facility} />
    </main>
  );
}
