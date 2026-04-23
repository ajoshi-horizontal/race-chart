"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { PopulationYearEntry } from "@/types/population";
import CountryList from "../lib/helper/CountryList";
import PageHeader from "./PageHeader";

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
      {/* <PageHeader title="Population by Country" /> */}
      <header className="flex items-center border-b border-neutral-100 justify-between mb-6 pb-4">
        <div>
        <h1 className="text-3xl font-bold">Population by Country</h1>
        <p className="text-sm text-gray-600">Top countries by headcount for each year.</p>
        </div>
        <div className="flex items-center gap-2 sm:justify-end">
        <button
          className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 bg-neutral-50 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={goToPreviousYear}
          disabled={yearIndex === INITIAL_YEAR_INDEX}
        >
          ←
        </button>
        <span className=" text-gray-600">Year: {currentYearData.Year}</span>
        <button
          className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 bg-neutral-50 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={goToNextYear}
          disabled={yearIndex === data.length - 1}
        >
          →
        </button>
        </div>
      </header>
      
      <div className="mb-6 flex gap-2 justify-between">
        <div className="flex items-center gap-2">
        <button
          className={`rounded-md border border-neutral-200 px-2.5 py-1 text-sm text-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 ${
            isPlaying ? "bg-neutral-900 text-white border-none" : "border-gray-300 bg-white hover:bg-neutral-50"
          }`}
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          className="rounded-md border border-neutral-200 px-2.5 py-1 text-sm text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={resetTimeline}
          disabled={isAtInitialState}
        >
          Reset
        </button>
        </div>
        <div className="flex items-center gap-2">
        <button
  className={`rounded-md border border-neutral-200 px-2.5 py-1 text-sm text-neutral-700  ${
    topCount === 10 ? "bg-neutral-900 text-white border-none" : "border-gray-300 bg-white hover:bg-neutral-50"
  }`}
  onClick={() => setTopCount(10)}
>
  Top 10
        </button>
        <button
          className={`rounded-md border border-neutral-200 px-2.5 py-1 text-sm text-neutral-700  ${
            topCount === 15 ? "bg-neutral-900 text-white border-none" : "border-gray-300 bg-white hover:bg-neutral-50"
          }`}
          onClick={() => setTopCount(15)}
        >
          Top 15
        </button>
        </div>
        
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
