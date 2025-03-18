"use client";

import React from "react";
import { motion } from "framer-motion";

const SwitchEight = ({ value, onChange, disabled = false }) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!value);
    }
  };

  return (
    <div
      className={`relative w-20 h-10 rounded-sm ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } bg-gradient-to-r from-gray-300 to-gray-500`}
      onClick={handleToggle}
    >
      {/* Knob */}
      <motion.div
        className="absolute top-1 left-1 w-8 h-8 bg-blue-200 flex items-center justify-center rounded-md shadow-md"
        initial={false}
        animate={{
          x: value ? 40 : 0,
          scale: value ? 1.2 : 1,
        }}
        transition={{
          type: "tween",
          duration: 0.6,
        }}
      >
        {value ? "🌊" : "🌟"}
      </motion.div>
    </div>
  );
};

export default SwitchEight; 