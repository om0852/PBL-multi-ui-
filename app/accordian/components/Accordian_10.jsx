'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="relative mb-4">
      <button
        className={`flex items-center justify-between w-full px-6 py-4 text-lg font-medium transition-all ${
          isOpen
            ? 'text-blue-600 border-b-2 border-blue-500'
            : 'text-gray-800 border-b-2 border-transparent hover:text-blue-500'
        }`}
        onClick={onClick}
      >
        {title}
        <motion.span
          className="block h-1 w-4 bg-blue-500"
          animate={{ scaleX: isOpen ? 1 : 0 }}
          initial={false}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="overflow-hidden px-6 py-4 bg-gray-50 rounded-lg text-gray-700"
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
