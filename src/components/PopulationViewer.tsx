"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import type { PopulationYearEntry } from "@/types/population";
import CountryList from "./CountryList";

type PopulationViewerProps = {
    data: PopulationYearEntry[];
}

export default function PopulationViewer({data}: PopulationViewerProps) {
    const [yearIndex, setYearIndex] = useState(0);
  const currentYearData = data[yearIndex];
  const goToPreviousYear = () => {
    if (yearIndex > 0) {
      setYearIndex(yearIndex - 1);
    }
  };
  const goToNextYear = () => {
    if (yearIndex < data.length - 1) {
      setYearIndex(yearIndex + 1);
    }
  };

    return (
        <section>
      <p className="mt-2 mb-4 text-gray-600">Year: {currentYearData.Year}</p>
      <div className="mb-4 flex gap-2">
        <button
          className="rounded border border-gray-300 bg-white px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={goToPreviousYear}
          disabled={yearIndex === 0}
        >
          Previous
        </button>
        <button
          className="rounded border border-gray-300 bg-white px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={goToNextYear}
          disabled={yearIndex === data.length - 1}
        >
          Next
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CountryList countries={currentYearData.Countries} />
      </motion.div>
    </section>
    );
}