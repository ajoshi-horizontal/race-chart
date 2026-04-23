import { motion } from "framer-motion";
import type { Country } from "@/types/population";

type CountryBarRowProps = {
  country: Country;
  widthPercent: number;
  rank: number;
};
const COUNTRY_COLORS: Record<string, string> = {
  China: "#2563eb",
  India: "#16a34a",
  "United States": "#dc2626",
  Indonesia: "#f59e0b",
  Pakistan: "#7c3aed",
  Brazil: "#0891b2",
  Nigeria: "#ea580c",
  Bangladesh: "#65a30d",
  Russia: "#9333ea",
  Japan: "#0d9488",
  Ethiopia: "#8b5cf6",
  Philippines: "#f472b6",
  Egypt: "#8b5cf6",
  Vietnam: "#8b5cf6",
};
export default function CountryBarRow({
  country,
  widthPercent,
  rank,
}: CountryBarRowProps) {

  // Get the color for the country
  const barColor = COUNTRY_COLORS[country.Country] ?? "#3b82f6";
  return (
    <motion.div layout transition={{ duration: 2 }} key={country.Country} className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{rank}. {country.Country}</span>
        <span className="text-gray-500">
          {country.Population.toLocaleString()}
        </span>
      </div>
      <div className="h-6 w-full rounded bg-gray-100">
        <motion.div
          style={{ backgroundColor: barColor }}
          className="h-full rounded bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${widthPercent}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </motion.div>
  );
}
