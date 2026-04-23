"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { tv } from "tailwind-variants";
import type { PopulationYearEntry } from "@/types/population";
import CountryList from "./CountryList";

type PopulationViewerProps = {
  data: PopulationYearEntry[];
};

export default function PopulationViewer({ data }: PopulationViewerProps) {
  const {
    section,
    emptyState,
    header,
    title,
    subtitle,
    yearNav,
    navButton,
    yearText,
    controlsRow,
    controlsGroup,
    playButton,
    resetButton,
    topCountButton,
  } = POPULATION_VIEWER_VARIANTS();

  // State for the top count
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
      <section className={section()}>
        <p className={emptyState()}>No population data available.</p>
      </section>
    );
  }
  return (
    <section className={section()}>
      <header className={header()}>
        <div>
          <h1 className={title()}>Population by Country</h1>
          <p className={subtitle()}>Top countries by headcount for each year.</p>
        </div>
        <div className={yearNav()}>
          <button
            className={navButton()}
            onClick={goToPreviousYear}
            disabled={yearIndex === INITIAL_YEAR_INDEX}
          >
            ←
          </button>
          <span className={yearText()}>{currentYearData.Year}</span>
          <button
            className={navButton()}
            onClick={goToNextYear}
            disabled={yearIndex === data.length - 1}
          >
            →
          </button>
        </div>
      </header>

      <div className={controlsRow()}>
        <div className={controlsGroup()}>
          <button className={playButton({ active: isPlaying })} onClick={togglePlayPause}>
            {isPlaying ? "Pause" : "Autoplay"}
          </button>
          <button className={resetButton()} onClick={resetTimeline} disabled={isAtInitialState}>
            Reset
          </button>
        </div>
        <div className={controlsGroup()}>
          <button
            className={topCountButton({ active: topCount === 10 })}
            onClick={() => setTopCount(10)}
          >
            Top 10
          </button>
          <button
            className={topCountButton({ active: topCount === 15 })}
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

const POPULATION_VIEWER_VARIANTS = tv({
  slots: {
    section: ["select-none"],
    emptyState: ["text-sm", "text-gray-600"],
    header: [
      "mb-6",
      "flex",
      "flex-col",
      "justify-between",
      "gap-4",
      "border-b",
      "border-neutral-100",
      "pb-4",
      "sm:flex-row",
    ],
    title: ["text-2xl", "font-bold", "sm:text-3xl"],
    subtitle: ["mt-1", "text-sm", "text-gray-600"],
    yearNav: ["flex", "items-center", "gap-2", "sm:justify-end"],
    navButton: [
      "rounded-md",
      "border",
      "border-neutral-200",
      "bg-neutral-50",
      "px-3",
      "py-1.5",
      "text-sm",
      "text-neutral-700",
      "hover:bg-neutral-100",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
    ],
    yearText: ["text-gray-600"],
    controlsRow: ["mb-6", "flex", "justify-between", "gap-2"],
    controlsGroup: ["flex", "items-center", "gap-2"],
    playButton: [
      "rounded-md",
      "border",
      "px-2.5",
      "py-1",
      "text-sm",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
    ],
    resetButton: [
      "rounded-md",
      "border",
      "border-neutral-200",
      "px-2.5",
      "py-1",
      "text-sm",
      "text-neutral-700",
      "hover:bg-neutral-50",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
    ],
    topCountButton: ["rounded-md", "border", "px-2.5", "py-1", "text-sm"],
  },
  variants: {
    active: {
      true: {
        playButton: ["border-transparent", "bg-neutral-900", "text-white"],
        topCountButton: ["border-transparent", "bg-neutral-900", "text-white"],
      },
      false: {
        playButton: ["border-gray-300", "bg-white", "text-neutral-700", "hover:bg-neutral-50"],
        topCountButton: ["border-gray-300", "bg-white", "text-neutral-700", "hover:bg-neutral-50"],
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
