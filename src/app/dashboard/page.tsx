import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import data from "@/data/data.json";

export default function Page() {
  return (
    <>
      <h1 className="font-bold text-white text-2xl">Dashboard</h1>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="w-full">
          <ChartAreaInteractive />
        </div>
        <DataTable data={data} />
      </div>
    </>
  );
}
