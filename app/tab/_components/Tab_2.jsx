"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Tabs = ({ defaultValue, className = "", children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={`flex flex-col ${className}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              activeTab,
              setActiveTab,
            })
          : child
      )}
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab, className = "" }) => {
  return (
    <div className={`inline-flex backdrop-blur-xl bg-white/10 shadow-lg rounded-2xl p-2 ${className}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              activeTab,
              setActiveTab,
            })
          : child
      )}
    </div>
  );
};

const TabsTrigger = ({
  value,
  children,
  activeTab,
  setActiveTab,
  className = "",
}) => {
  const isActive = activeTab === value;

  return (
    <button
      className={`relative px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl ${
        isActive
          ? "text-white"
          : "text-gray-400 hover:text-white"
      } ${className}`}
      onClick={() => setActiveTab?.(value)}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl"
          layoutId="background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {isActive && (
          <motion.svg
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </span>
    </button>
  );
};

const TabsContent = ({ value, children, activeTab, className = "" }) => {
  return (
    <AnimatePresence mode="wait">
      {activeTab === value && (
        <motion.div
          key={value}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25
          }}
          className={`mt-6 p-6 rounded-2xl bg-white/5 backdrop-blur-lg shadow-xl ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent }; 