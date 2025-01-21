"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

// Context for Accordion state
const AccordionContext = createContext(undefined);

export function Accordion({
  children,
  multiple = false,
  className = "",
  persistState = false,
  storageKey = "accordionState",
}) {
  const [openItems, setOpenItems] = useState([]);

  // Load state from localStorage on mount
  useEffect(() => {
    if (persistState) {
      const savedState = localStorage.getItem(storageKey);
      if (savedState) setOpenItems(JSON.parse(savedState));
    }
  }, [persistState, storageKey]);

  // Save state to localStorage on change
  useEffect(() => {
    if (persistState) {
      localStorage.setItem(storageKey, JSON.stringify(openItems));
    }
  }, [openItems, persistState, storageKey]);

  const toggleItem = (id) => {
    setOpenItems((prev) =>
      multiple
        ? prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id]
        : prev[0] === id
        ? []
        : [id]
    );
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  children,
  id,
  className = "",
  isCollapsible = true,
}) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionItem must be used within an Accordion");
  }

  const { openItems } = context;
  const isOpen = openItems.includes(id);

  return (
    <div
      className={`${className} ${isOpen ? "open" : ""} ${isCollapsible && ""}`}
      aria-expanded={isOpen}
    >
      {children}
    </div>
  );
}

export function AccordionTrigger({
  children,
  id,
  className = "",
  onClick,
  openIcon,
  closeIcon,
}) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionTrigger must be used within an Accordion");
  }

  const { toggleItem, openItems } = context;
  const isOpen = openItems.includes(id);

  return (
    <button
      className={`${className} flex justify-between items-center`}
      onClick={() => {
        toggleItem(id);
        if (onClick) onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          toggleItem(id);
        }
      }}
    >
      <span>{children}</span>
      <span>{isOpen ? closeIcon : openIcon}</span>
    </button>
  );
}

export function AccordionContent({
  children,
  id,
  className = "",
  animation = "fadeIn",
  duration = 0.3,
  loadOnOpen,
}) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionContent must be used within an Accordion");
  }

  const { openItems } = context;
  const isOpen = openItems.includes(id);

  const [loadedContent, setLoadedContent] = useState(null);

  useEffect(() => {
    if (isOpen && loadOnOpen) {
      loadOnOpen().then(setLoadedContent);
    }
  }, [isOpen, loadOnOpen]);

  const getAnimation = (animation) => {
    const animations = {
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      slideIn: {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
      },
      zoomIn: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
      },
      fadeInUp: {
        initial: { opacity: 0, translateY: "20px" },
        animate: { opacity: 1, translateY: "0px" },
        exit: { opacity: 0, translateY: "20px" },
      },
      fadeInDown: {
        initial: { opacity: 0, translateY: "-20px" },
        animate: { opacity: 1, translateY: "0px" },
        exit: { opacity: 0, translateY: "-20px" },
      },
      slideFromLeft: {
        initial: { translateX: "-100%", opacity: 0 },
        animate: { translateX: "0%", opacity: 1 },
        exit: { translateX: "-100%", opacity: 0 },
      },
      slideFromRight: {
        initial: { translateX: "100%", opacity: 0 },
        animate: { translateX: "0%", opacity: 1 },
        exit: { translateX: "100%", opacity: 0 },
      },
      scaleUp: {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.5, opacity: 0 },
      },
      rotateIn: {
        initial: { rotate: -90, opacity: 0 },
        animate: { rotate: 0, opacity: 1 },
        exit: { rotate: -90, opacity: 0 },
      },
    };

    return animations[animation] || animations.fadeIn;
  };

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          {...getAnimation(animation)}
          transition={{ duration }}
          className={`${className} overflow-hidden block`}
        >
          <motion.div layout className="p-4">
            {loadedContent || children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Expand/Collapse All Controls
export function AccordionControls({ items }) {
  const context = useContext(AccordionContext);
  if (!context) return null;

  const { toggleItem, openItems } = context;
  const allOpen = items.every((id) => openItems.includes(id));

  return (
    <div className="accordion-controls flex gap-4">
      <button onClick={() => items.forEach((id) => !allOpen && toggleItem(id))}>
        Expand All
      </button>
      <button onClick={() => items.forEach((id) => allOpen && toggleItem(id))}>
        Collapse All
      </button>
    </div>
  );
}
