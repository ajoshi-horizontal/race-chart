import { motion } from "framer-motion";
import { Country } from "@/types/population";
import CountryBarRow from "./CountryBarRow";
import { useMemo } from "react";

type CountryListProps = {
  countries: Country[];
};

export default function CountryList({ countries }: CountryListProps) {

  // Memoize the top 10 countries by population
  const topCountries = useMemo(() => {
    const sortedCountries = [...countries].sort(
      (a, b) => b.Population - a.Population
    );
    return sortedCountries.slice(0, 10);
  }, [countries]);

  const maxPopulation = useMemo(() => {
    return topCountries[0]?.Population ?? 1;
  }, [topCountries]);

  return (
    <motion.div layout className="space-y-3">
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
