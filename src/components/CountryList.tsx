import { motion } from "framer-motion";
import { Country } from "@/types/population";

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
          
            <motion.div layout key={country.Country} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{country.Country}</span>
                <span className="text-gray-500">{country.Population.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full rounded bg-gray-100">
                <motion.div className="h-full rounded bg-blue-500" 
                initial={{ width: 0 }}
                animate={{ width: `${widthPercent}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}>

                </motion.div>
                </div>

            </motion.div>
         
        );
      })}
    </motion.div>
  );
}
