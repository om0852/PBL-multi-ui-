'use client'

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Menubar Component
const Menubar = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const menubarRef = useRef(null);

  const toggleMenu = () => setIsVisible((prev) => !prev);
  const closeMenu = () => setIsVisible(false);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menubarRef.current && !menubarRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  const menuVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div ref={menubarRef} className="relative inline-block">
      <AnimatePresence mode="wait">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            toggleMenu,
            isVisible,
            closeMenu,
            variants: menuVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
            transition: { 
              type: "spring",
              stiffness: 300,
              damping: 30
            }
          })
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menubar; 