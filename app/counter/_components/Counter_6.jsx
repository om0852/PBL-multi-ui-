"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Counter_6 = ({
  from = 0,
  to,
  duration = 5,
  interval = 0.5,
  className = "",
  formatter = (value) => value.toFixed(0),
  onComplete,
}) => {
  const [visibleValue, setVisibleValue] = useState(from);

  useEffect(() => {
    let counterValue = from;
    const totalIncrements = duration / interval;
    const incrementValue = (to - from) / totalIncrements;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      counterValue += incrementValue;

      const roundedValue = Math.round(counterValue);
      setVisibleValue(roundedValue);

      if (stepCount >= totalIncrements) {
        setVisibleValue(to);
        clearInterval(timer);

        if (onComplete) {
          onComplete(to);
        }
      }
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [from, to, duration, interval, onComplete]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
      style={{
        fontFamily: "sans-serif",
        color: "#fff",
        borderRadius: "10px",
        backgroundColor: "#1E3A8A",
        padding: "10px 20px",
        width: "100px",
        height: "150px",
        perspective: 1000,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={visibleValue}
          initial={{ translateX: "100%", opacity: 0 }}
          animate={{ translateX: "0%", opacity: 1 }}
          exit={{ translateX: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-400 text-4xl font-bold shadow-md rounded-lg"
        >
          {formatter(visibleValue)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Counter_6;
