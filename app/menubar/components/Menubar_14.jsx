'use client'

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuVariants = {
  hidden: {
    opacity: 0,
    x: -50,
    rotateY: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
  exit: {
    opacity: 0,
    x: 50,
    rotateY: 30,
    transition: {
      duration: 0.3,
    },
  },
};

// Menubar Component
const Menubar = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const menubarRef = useRef(null);

  const toggleMenu = () => setIsVisible((prev) => !prev);
  const closeMenu = () => setIsVisible(false);

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

  return (
    <div ref={menubarRef} className="relative inline-block">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            toggleMenu,
            isVisible,
            closeMenu,
          });
        }
        return child;
      })}
    </div>
  );
};

// MenubarItem Component
const MenubarItem = ({ children, onClick }) => {
  return (
    <motion.li
      whileHover={{ x: 5, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="px-4 py-2 text-gray-800 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
    >
      {children}
    </motion.li>
  );
};

// MenubarSub Component
const MenubarSub = ({ label, children }) => {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

  return (
    <div className="relative">
      <MenubarItem onClick={() => setIsSubmenuVisible((prev) => !prev)}>{label}</MenubarItem>

      <AnimatePresence>
        {isSubmenuVisible && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ perspective: 1000 }}
            className="absolute left-full top-0 ml-3 w-56 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg border border-green-100 z-30"
          >
            <ul className="py-3 px-4 space-y-2">{children}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Menubar, MenubarItem, MenubarSub }; 