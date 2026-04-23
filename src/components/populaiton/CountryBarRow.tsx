import { motion } from "framer-motion";
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
      className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] items-center gap-3"
    >
      <span className=" shrink-0 truncate font-medium text-neutral-900">
        <span className="mr-2 inline-block w-5 text-right text-sm text-neutral-400">
          {rank}.
        </span>
        {country.Country}
      </span>
      <div className="h-6 flex-1 overflow-hidden rounded bg-gray-100">
        <motion.div
          style={{ backgroundColor: barColor }}
          className="h-full rounded bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${widthPercent}%` }}
          transition={{ duration: 2, ease: "easeInOut" }}
        ></motion.div>
      </div>
      <span className=" shrink-0 text-right text-sm text-gray-500">
        {country.Population.toLocaleString()}
      </span>
    </motion.li>
  );
}
