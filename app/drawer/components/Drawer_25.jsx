"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export function Drawer({ children, className }) {
  return <div className={clsx("relative z-50", className)}>{children}</div>;
}

export function DrawerTrigger({ children, onClick, className }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "relative py-2.5 px-5 rounded-lg",
        "bg-white",
        "text-gray-800 font-medium text-sm",
        "border border-gray-200",
        "shadow-sm",
        "hover:bg-gray-50",
        "transition-all duration-200",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export function DrawerContent({
  children,
  isOpen,
  onClose,
  position = "right",
  className,
}) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/5"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: position === "right" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position === "right" ? 20 : -20 }}
            className={clsx(
              "fixed p-6",
              "bg-white",
              "shadow-lg",
              {
                "left-0 top-0 bottom-0 w-96": position === "left",
                "right-0 top-0 bottom-0 w-96": position === "right",
                "top-0 left-0 right-0 h-96": position === "top",
                "bottom-0 left-0 right-0 h-auto": position === "bottom",
              },
              className
            )}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative h-full text-gray-800">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
