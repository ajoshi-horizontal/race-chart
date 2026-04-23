"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { PopulationYearEntry } from "@/types/population";
import CountryList from "./CountryList";

type PopulationViewerProps = {
  data: PopulationYearEntry[];
};

export default function PopulationViewer({ data }: PopulationViewerProps) {
  
  // State for the current year index and the play/pause state
  const [yearIndex, setYearIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get the current year data
  const currentYearData = data[yearIndex];

  const isAtInitialState = yearIndex === 0;

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
    },1200)
    // Clean up the timer when the component unmounts or the isPlaying state changes
    return ()=> clearInterval(timerId);

  },[isPlaying, data.length])

  // Go to the previous year
  const goToPreviousYear = () => {
    if (yearIndex > 0) {
      setYearIndex(yearIndex - 1);
    }
  };
  // Go to the next year
  const goToNextYear = () => {
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
        setYearIndex(0);
      }
      setIsPlaying(true);
  };

  // Reset the year index to the first year
  const resetTimeline = () => {
    setYearIndex(0);
    setIsPlaying(false);
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
        <button
          className="rounded border border-gray-300 bg-white px-3 py-2"
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          className="rounded border border-gray-300 bg-white px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={resetTimeline}
          disabled={isAtInitialState}
        >
          Reset
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
