import Link from "next/link";
import { getAllFacilitiesAdmin } from "@/_actions/admin-facilities-actions";
import { getHomePageContent } from "@/_actions/facilities-actions";
import FacilitiesSection from "@/_components/user/dashboard/facilities/facilities-section";
import HomeContentSection from "@/_components/user/dashboard/home-content/home-content-section";
import HomeSliderSection from "@/_components/user/dashboard/home-slider/home-slider-section";
import { buttonStyles } from "@/_styles/button-styles";

export default async function DashboardPage() {
  const [facilities, homeContent] = await Promise.all([
    getAllFacilitiesAdmin(),
    getHomePageContent(),
  ]);

  return (
    <main className="flex pt-15 flex-col gap-10">
      <h1>Dashboard</h1>

      <div className="flex flex-col gap-4">
        <FacilitiesSection facilities={facilities} />
        <Link href="/dashboard/facilities/add" className={buttonStyles("self-start", false, false, "green")}>
          Add Facility
        </Link>
      </div>

      <HomeContentSection homeContent={homeContent} />

      <HomeSliderSection images={homeContent.ourHomesSliderHomePage} />
    </main>
  );
}
