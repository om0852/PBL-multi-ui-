"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="mb-3 rounded-lg shadow">
      <button
        className="flex w-full items-center justify-between bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-4 px-6 text-white font-medium rounded-lg hover:brightness-90 transition-all"
        onClick={onClick}
      >
        <span className="text-left">{title}</span>
        <motion.img
          src="https://img.icons8.com/ios-glyphs/30/FFFFFF/chevron-down.png"
          alt="Chevron Down"
          className="h-5 w-5"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden bg-white"
          >
            <div className="px-6 py-4 text-gray-800">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items, allowMultiple = false }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleClick = (index) => {
    if (allowMultiple) {
      setOpenIndexes(
        openIndexes.includes(index)
          ? openIndexes.filter((i) => i !== index)
          : [...openIndexes, index]
      );
    } else {
      setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className="p-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndexes.includes(index)}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}
