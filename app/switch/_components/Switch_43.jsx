"use client";

import React from "react";
import { motion } from "framer-motion";

const SwitchTen = ({ value, onChange, disabled = false }) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!value);
    }
  };

  return (
    <div
      className={`relative w-20 h-10 rounded-sm ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} bg-gradient-to-r from-red-600 to-blue-400`}
      onClick={handleToggle}
    >
      {/* Knob */}
      <motion.div
        className="absolute top-1 left-1 w-8 h-8 bg-white flex items-center justify-center shadow-md"
        initial={false}
        animate={{
          x: value ? 40 : 0,
          scale: value ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 15,
        }}
      >
        {value ? "🔥" : "💧"}
      </motion.div>
    </div>
  );
};

export default SwitchTen; 