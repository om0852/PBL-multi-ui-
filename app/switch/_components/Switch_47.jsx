"use client";

import React from "react";
import { motion } from "framer-motion";

const SwitchFifteen = ({ value, onChange, disabled = false }) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!value);
    }
  };

  return (
    <div
      className={`relative w-20 h-10 rounded-sm ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} bg-gradient-to-r from-indigo-500 to-pink-500`}
      onClick={handleToggle}
    >
      {/* Knob */}
      <motion.div
        className="absolute top-1 left-1 w-8 h-8 bg-white flex items-center justify-center shadow-md"
        initial={false}
        animate={{
          x: value ? 40 : 0,
          rotate: value ? 10 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 25,
        }}
      >
        {value ? "🔥" : "💨"}
      </motion.div>
    </div>
  );
};

export default SwitchFifteen; 