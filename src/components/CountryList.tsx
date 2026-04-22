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
  const maxPopulation = sortedCountries[0]?.Population ?? 1;

  return (
    <motion.div layout className="space-y-3">
      {sortedCountries.map((country) => {
        const widthPercent = (country.Population / maxPopulation) * 100;
        return (
          <CountryBarRow
            key={country.Country}
            country={country}
            widthPercent={widthPercent}
          />
        );
      })}
    </motion.div>
  );
}
