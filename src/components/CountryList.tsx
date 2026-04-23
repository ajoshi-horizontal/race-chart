import { motion } from "framer-motion";
import { Country } from "@/types/population";
import CountryBarRow from "./CountryBarRow";
import { useMemo } from "react";

type CountryListProps = {
  countries: Country[];
  topCount: number;
};

export default function CountryList({ countries, topCount }: CountryListProps) {

  // Memoize the top 10 countries by population
  const topCountries = useMemo(() => {
    const sortedCountries = [...countries].sort(
      (a, b) => b.Population - a.Population
    );
    return sortedCountries.slice(0, topCount);
  }, [countries, topCount]);

  const maxPopulation = useMemo(() => {
    return topCountries[0]?.Population ?? 1;
  }, [topCountries]);

  return (
    <motion.div
      layout="position"
      transition={{
        layout: {
          type: "spring",
          damping: 28,
          stiffness: 125,
          mass: 0.85,
        },
      }}
      className="space-y-3"
    >
      {topCountries.map((country, index) => {
        const widthPercent = (country.Population / maxPopulation) * 100;
        return (
          <CountryBarRow
            key={country.Country}
            country={country}
            widthPercent={widthPercent}
            rank={index + 1}
          />
        );
      })}
    </motion.div>
  );
}
