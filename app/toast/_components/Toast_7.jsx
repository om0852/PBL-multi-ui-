import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { animationVariants, ThemeClassesBorder, positionClasses, useToastTimer } from "./utils";

const Toast_7 = ({
  message,
  close,
  icon,
  position,
  theme,
  duration,
  animationType,
  autoDismiss,
  onHoverPause,
  actionButton,
  stack,
}) => {
  const { handleMouseEnter, handleMouseLeave } = useToastTimer(
    autoDismiss ?? true,
    duration ?? 4000,
    close,
    onHoverPause ?? true
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={animationVariants[animationType ?? "slide"]}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        "flex items-center justify-between p-4 rounded-lg shadow-lg z-50",
        "w-[300px] h-[80px]", // Fixed dimensions
        ThemeClassesBorder[theme ?? "dark"],
        positionClasses[position ?? "top-right"],
        stack ? "static" : "fixed"
      )}
    >
      {/* Icon */}
      <div className="text-xl mr-4">{icon || "🔔"}</div>

      {/* Message */}
      <div className="flex-1 text-black text-center text-base font-medium">{message}</div>

      {/* Action Button */}
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          {actionButton.label}
        </button>
      )}

      {/* Close Button */}
      <button
        onClick={close}
        className="ml-4 text-lg font-bold focus:outline-none hover:opacity-80"
        aria-label="Close Toast"
      >
        <img
          src="https://img.icons8.com/?size=100&id=6483&format=png&color=000000"
          alt="Close Icon"
          className="w-6 h-6 object-contain"
        />
      </button>
    </motion.div>
  );
};

// Wrap with React.memo for optimization
export default React.memo(Toast_7);
