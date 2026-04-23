import { motion } from "framer-motion";
import type { Country } from "@/types/population";

type CountryBarRowProps = {
  country: Country;
  widthPercent: number;
};
export default function CountryBarRow({
  country,
  widthPercent,
}: CountryBarRowProps) {
  return (
    <motion.div layout transition={{ duration: 1 }} key={country.Country} className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{country.Country}</span>
        <span className="text-gray-500">
          {country.Population.toLocaleString()}
        </span>
      </div>
      <div className="h-6 w-full rounded bg-gray-100">
        <motion.div
          className="h-full rounded bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${widthPercent}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </motion.div>
  );
}
