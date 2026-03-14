import { getAllFacilitiesAdmin } from "@/_actions/admin-facilities-actions";
import { getHomePageContent } from "@/_actions/facilities-actions";
import FacilitiesSection from "@/_components/user/dashboard/facilities/facilities-section";
import FacilityAddForm from "@/_components/user/dashboard/facilities/facility-add-form";
import HomeContentSection from "@/_components/user/dashboard/home-content/home-content-section";
import HomeSliderSection from "@/_components/user/dashboard/home-slider/home-slider-section";

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
        <FacilityAddForm />
      </div>

      <HomeContentSection homeContent={homeContent} />

      <HomeSliderSection images={homeContent.ourHomesSliderHomePage} />
    </main>
  );
}
