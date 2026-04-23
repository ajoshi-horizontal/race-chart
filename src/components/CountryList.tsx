import { motion } from "framer-motion";
import { Country } from "@/types/population";
import CountryBarRow from "./CountryBarRow";

type CountryListProps = {
  countries: Country[];
};

export default function CountryList({ countries }: CountryListProps) {
  const sortedCountries = [...countries].sort(
    (a, b) => b.Population - a.Population,
  );

  // Get the top 10 countries by population
  const topCountries = sortedCountries.slice(0, 10);

  // Get the max population of the top 10 countries
  const maxPopulation = topCountries[0]?.Population ?? 1;

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
