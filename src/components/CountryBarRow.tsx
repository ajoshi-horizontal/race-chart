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
    <motion.div
      layout="position"
      transition={{
        layout: {
          type: "spring",
          damping: 26,
          stiffness: 130,
          mass: 0.8,
        },
      }}
      key={country.Country}
      className="space-y-1"
    >
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
