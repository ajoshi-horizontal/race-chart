import { motion } from "framer-motion";
import { tv } from "tailwind-variants";
import type { Country } from "@/types/population";

type CountryBarRowProps = {
  country: Country;
  widthPercent: number;
  rank: number;
};
const COUNTRY_COLORS: Record<string, string> = {
  China: "#de2910",            
  India: "#ff9933",            
  "United States": "#3c3b6e",  
  Indonesia:"#ef4444",        
  Pakistan: "#01411c",        
  Brazil: "#009c3b",          
  Nigeria: "#008751",         
  Bangladesh: "#006a4e",      
  Russia: "#0039a6",          
  Japan: "#bc002d",           
  Ethiopia: "#078930",        
  Philippines: "#0038a8",     
  Egypt:   "#b91c1c",         
  Vietnam: "#da251d", 
};
export default function CountryBarRow({
  country,
  widthPercent,
  rank,
}: CountryBarRowProps) {
  const { row, countryText, rankText, barTrack, barFill, populationText } = COUNTRY_BAR_ROW_VARIANTS();

  // Get the color for the country
  const barColor = COUNTRY_COLORS[country.Country] ?? "#3b82f6";
  return (
    <motion.li
      layout="position"
      transition={{
        layout: {
          type: "spring",
          damping: 34,
          stiffness: 90,
          mass: 1,
        },
      }}
      key={country.Country}
      className={row()}
    >
      <span className={countryText()}>
        <span className={rankText()}>
          {rank}.
        </span>
        {country.Country}
      </span>
      <div className={barTrack()}>
        <motion.div
          style={{ backgroundColor: barColor }}
          className={barFill()}
          initial={{ width: 0 }}
          animate={{ width: `${widthPercent}%` }}
          transition={{ duration: 2, ease: "easeInOut" }}
        ></motion.div>
      </div>
      <span className={populationText()}>
        {country.Population.toLocaleString()}
      </span>
    </motion.li>
  );
}

const COUNTRY_BAR_ROW_VARIANTS = tv({
  slots: {
    row: [
      "grid",
      "grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto]",
      "items-center",
      "gap-3",
    ],
    countryText: ["shrink-0", "truncate", "font-medium", "text-neutral-900"],
    rankText: ["mr-2", "inline-block", "w-5", "text-right", "text-sm", "text-neutral-400"],
    barTrack: ["h-6", "flex-1", "overflow-hidden", "rounded", "bg-gray-100"],
    barFill: ["h-full", "rounded", "bg-blue-500"],
    populationText: ["shrink-0", "text-right", "text-sm", "text-gray-500"],
  },
});
