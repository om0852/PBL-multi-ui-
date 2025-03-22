"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FlipDigitalClock = ({
  size = 200,
  borderColor = "border-gray-400",
  backgroundColor = "bg-gray-900",
  containerClass = "", // Default to an empty string
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (num) => num.toString().padStart(2, "0");

  const hours = formatTime(time.getHours());
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());

  return (
    <div className={`flex items-center justify-center h-screen ${backgroundColor} ${containerClass}`}>
      <div className="text-center">
        {/* Flip Digital Clock Display */}
        <motion.div
          className={`font-bold text-green-400 drop-shadow-lg ${borderColor} ${size ? `text-${size}px` : 'text-6xl'}`}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          {hours}:{minutes}:{seconds}
        </motion.div>
      </div>
    </div>
  );
};

export default FlipDigitalClock; 