import { BuildingListDashboard } from "@/components/dashboard/building-list";
import { getAllBuildings } from "@/servers/actions/buildings/actions";

export default async function DashboardBangunan() {
  const buildings = await getAllBuildings();
  return (
    <>
      <BuildingListDashboard buildings={buildings} />
    </>
  );
}
