import populationByYear from "@/lib/data/population-by-year.json";
import { PopulationYearEntry } from "@/types/population";
import PopulationViewer from "@/components/populaiton/PopulationViewer";

export default function Home() {
  // Convert the population data to the PopulationYearEntry type
  const populationData = populationByYear as PopulationYearEntry[];

  return (
    <>
    <main className="min-h-screen bg-neutral-100 px-4 py-10 sm:px-6">
    <div className="mx-auto max-w-3xl rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-7">  
      <PopulationViewer data={populationData} />
    </div>
    </main>
    </>
  );
}
