"use client";
import React from "react";
import { motion } from "framer-motion";

const EnhancedAvatar = ({
  src,
  alt,
  size = "md",
  borderColor = "border-gray-300",
  borderWidth = 2,
  className = "",
  glow = false,
}) => {
  // Tailwind classes for different sizes
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  return (
    <motion.div
      className={`relative inline-block ${sizeClasses[size]} rounded-full overflow-hidden border ${borderWidth} ${borderColor} ${
        glow ? "shadow-[0_0_10px_rgb(0,0,255)]" : ""
      } ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ rotate: 10, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      <img
        src={src}
        alt={alt}
        className="object-cover w-full h-full"
      />
    </motion.div>
  );
};

export default EnhancedAvatar;
