import { BuildingListDashboard } from "@/components/dashboard/building-list";
import { getAllBuildings } from "@/servers/actions/buildings/actions";
import { Suspense } from "react";

export default async function DashboardBangunan() {
  const buildings = await getAllBuildings();
  return (
    <Suspense>
      <BuildingListDashboard buildings={buildings} />
    </Suspense>
  );
}
