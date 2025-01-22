'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="relative mb-4 w-full">
      <button
        className="relative w-full py-6 px-8 rounded-lg bg-white border border-gray-300 shadow-md overflow-hidden focus:outline-none group"
        onClick={onClick}
      >
        {/* Bounce effect for the header */}
        <motion.div
          className="flex justify-between items-center relative z-10"
          animate={{
            y: isOpen ? 0 : -10,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 15,
            repeat: isOpen ? 0 : 1,
            repeatType: 'reverse',
          }}
        >
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </motion.div>

        {/* Slide-down animation for the content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="overflow-hidden mt-4"
            >
              <p className="text-base text-gray-700">{content}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
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
    <div className="space-y-6">
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
