"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Checkbox = ({ value, onChange, disabled = false }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <label
      className={`checkbox-container relative inline-flex items-center cursor-pointer transition-all duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <input
        type="checkbox"
        className="hidden"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <div className="checkbox-background relative w-10 h-10 bg-gray-200 border-2 border-gray-600 rounded-sm transition-colors duration-300">
        <motion.div
          className="checkbox-check w-6 h-6 bg-transparent absolute top-1 left-1 transform -translate-x-1/2 -translate-y-1/2 border-2 border-green-500 rounded-full"
          animate={{
            opacity: value ? 1 : 0,
            scale: value ? 1.2 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <motion.div
            className="checkmark w-4 h-4 bg-transparent border-l-4 border-b-4 border-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ rotate: -45, scale: 0 }}
            animate={{ rotate: value ? 0 : -45, scale: value ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </motion.div>
      </div>
    </label>
  );
};

export default Checkbox;
