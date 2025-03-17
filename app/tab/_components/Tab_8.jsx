"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Tabs = ({ defaultValue, className, children }) => {
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

const TabsList = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center gap-4 py-3 border-b-2 border-transparent">
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
}) => {
  const isActive = activeTab === value;

  return (
    <button
      className={`relative w-full flex-1 text-lg font-semibold py-2 px-6 transition-all ease-out duration-300 rounded-t-lg ${
        isActive
          ? "text-white bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
      }`}
      onClick={() => setActiveTab?.(value)}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600"
          layoutId="tabs-indicator"
        />
      )}
    </button>
  );
};

const TabsContent = ({ value, children, activeTab, className = "" }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Wrap child elements with motion.div
  const wrappedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return (
        <motion.div variants={item} className="content-item">
          {child}
        </motion.div>
      );
    }
    return child;
  });

  return (
    <AnimatePresence mode="wait">
      {activeTab === value && (
        <motion.div
          key={value}
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
          className={`mt-6 rounded-xl p-4 focus:outline-none space-y-4 ${className}`}
        >
          {wrappedChildren}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent }; 