"use client";
import PageHeader from "@/components/PageHeader";
import populationByYear from "@/data/population-by-year.json";
import { PopulationYearEntry } from "@/types/population";
import PopulationViewer from "@/components/PopulationViewer";

export default function Home() {

  const populationData = populationByYear as PopulationYearEntry[];

  return (
    <>
    <main className="mx-auto max-w-2xl p-6 font-sans">
    <div className="flex flex-col items-center justify-center h-screen">
      <PageHeader title="Population by Country" />
      <PopulationViewer data={populationData} />
    </div>
    </main>
    
    </>
  );
}
