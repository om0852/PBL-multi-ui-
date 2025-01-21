'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="relative mb-4">
      <button
        className={`flex items-center justify-between w-full px-6 py-4 rounded-lg transition-all ${
          isOpen
            ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
        }`}
        onClick={onClick}
      >
        <span className="text-lg font-medium">{title}</span>
        <motion.div
          className="h-6 w-6 flex items-center justify-center bg-white rounded-full shadow-md"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <span className="block h-3 w-3 bg-gray-800" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="overflow-hidden rounded-b-lg p-6 bg-gray-50 text-gray-700"
          >
            {content}
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
    <div className="space-y-4">
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
