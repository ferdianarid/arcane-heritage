import BuildingPage from "@/pages/building";
import { getAllBuildings } from "@/servers/actions/buildings/actions";

export default async function Bangunan() {
  const buildings = await getAllBuildings();
  console.log(buildings);
  return <BuildingPage buildings={buildings} />;
}
