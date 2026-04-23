"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { PopulationYearEntry } from "@/types/population";
import CountryList from "./CountryList";

type PopulationViewerProps = {
  data: PopulationYearEntry[];
};

export default function PopulationViewer({ data }: PopulationViewerProps) {

  const [topCount, setTopCount] = useState(10);


  // Constants for the initial year index and the autoplay interval
  const INITIAL_YEAR_INDEX = 0;
  const AUTOPLAY_INTERVAL_MS = 2000;
  
  // State for the current year index and the play/pause state
  const [yearIndex, setYearIndex] = useState(INITIAL_YEAR_INDEX);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get the current year data
  const currentYearData = data[yearIndex];

  // Check if the year index is at the initial state
  const isAtInitialState = yearIndex === INITIAL_YEAR_INDEX;

  

  useEffect(()=>{
    if(!isPlaying) return;
    // Set up a timer to increment the year index every 1200ms
    const timerId = setInterval(()=>{
        setYearIndex((prevIndex)=>{
            if(prevIndex >= data.length -1){
                setIsPlaying(false);
                return prevIndex;
            }
            return prevIndex + 1;
        })
    },AUTOPLAY_INTERVAL_MS)
    // Clean up the timer when the component unmounts or the isPlaying state changes
    return ()=> clearInterval(timerId);

  },[isPlaying, data.length])

  // Go to the previous year
  const goToPreviousYear = () => {
    setIsPlaying(false);
    if (yearIndex > 0) {
      setYearIndex(yearIndex - 1);
    }
  };
  // Go to the next year
  const goToNextYear = () => {
    setIsPlaying(false);
    if (yearIndex < data.length - 1) {
      setYearIndex(yearIndex + 1);
    }
  };

  // Toggle the play/pause state
  const togglePlayPause = () => {
    if (isPlaying) {
        setIsPlaying(false);
        return;
      }
      // If the current year is the last year, go to the first year
      const isAtLastYear = yearIndex === data.length - 1;
      if (isAtLastYear) {
        setYearIndex(INITIAL_YEAR_INDEX);
      }
      setIsPlaying(true);
  };

  // Reset the year index to the first year
  const resetTimeline = () => {
    setYearIndex(INITIAL_YEAR_INDEX);
    setIsPlaying(false);
  };
  if (data.length === 0) {
    return (
      <section className="select-none">
        <p className="text-sm text-gray-600">No population data available.</p>
      </section>
    );
  }
  return (
    <section className="select-none">
      <p className="mt-2 mb-4 text-gray-600">Year: {currentYearData.Year}</p>
      <div className="mb-4 flex gap-2">
        <button
          className="min-w-[90px] rounded border border-gray-300 bg-white px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={goToPreviousYear}
          disabled={yearIndex === INITIAL_YEAR_INDEX}
        >
          Previous
        </button>
        <button
          className="min-w-[90px] rounded border border-gray-300 bg-white px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={goToNextYear}
          disabled={yearIndex === data.length - 1}
        >
          Next
        </button>
        <button
          className="rmin-w-[90px] rounded border border-gray-300 bg-white px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          className="min-w-[90px] rounded border border-gray-300 bg-white px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={resetTimeline}
          disabled={isAtInitialState}
        >
          Reset
        </button>
        <button
  className={`min-w-[90px] rounded border px-3 py-2 ${
    topCount === 10 ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"
  }`}
  onClick={() => setTopCount(10)}
>
  Top 10
</button>
<button
  className={`min-w-[90px] rounded border px-3 py-2 ${
    topCount === 15 ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"
  }`}
  onClick={() => setTopCount(15)}
>
  Top 15
</button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CountryList countries={currentYearData.Countries} topCount={topCount} />
      </motion.div>
    </section>
  );
}
