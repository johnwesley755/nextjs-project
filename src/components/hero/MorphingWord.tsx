"use client";

import React, { useState, useEffect } from "react";

const WORDS = ["ORDINARY", "EXPECTED", "CONVENTIONAL", "COMMONPLACE"];

export function MorphingWord() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % WORDS.length);
        setAnimating(false);
      }, 350);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden align-baseline select-none px-1">
      <span
        className={`inline-block transition-all duration-300 ease-out transform ${
          animating
            ? "-translate-y-full opacity-0 skew-y-6"
            : "translate-y-0 opacity-100 skew-y-0"
        } text-transparent [-webkit-text-stroke:1.5px_#F2F0E9] sm:[-webkit-text-stroke:2px_#F2F0E9] hover:[-webkit-text-stroke:2px_#D7FF3F] hover:text-[#D7FF3F] transition-colors cursor-pointer`}
      >
        {WORDS[index]}
      </span>
      <span className="text-[#D7FF3F] ml-0.5">.</span>
    </span>
  );
}
