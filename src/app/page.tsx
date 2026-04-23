import populationByYear from "@/lib/data/population-by-year.json";
import { tv } from "tailwind-variants";
import { PopulationYearEntry } from "@/types/population";
import PopulationViewer from "@/components/populaiton/PopulationViewer";

export default function Home() {
  const { main, contentCard } = HOME_PAGE_VARIANTS();

  // Convert the population data to the PopulationYearEntry type
  const populationData = populationByYear as PopulationYearEntry[];

  return (
    <main className={main()}>
      <div className={contentCard()}>
        <PopulationViewer data={populationData} />
      </div>
    </main>
  );
}

const HOME_PAGE_VARIANTS = tv({
  slots: {
    main: ["min-h-screen", "bg-neutral-100", "px-4", "py-10", "sm:px-6"],
    contentCard: [
      "mx-auto",
      "max-w-3xl",
      "rounded-lg",
      "border",
      "border-neutral-200",
      "bg-white",
      "p-5",
      "shadow-sm",
      "sm:p-7",
    ],
  },
});
