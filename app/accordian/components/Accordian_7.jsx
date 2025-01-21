'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div
      className={`relative border rounded-lg mb-4 ${
        isOpen ? 'border-blue-500 shadow-lg' : 'border-gray-300'
      }`}
    >
      <button
        className={`w-full py-4 px-6 text-left font-medium transition-all ${
          isOpen
            ? 'bg-blue-50 text-blue-600'
            : 'bg-white text-gray-800 hover:bg-gray-100'
        }`}
        onClick={onClick}
      >
        {title}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden bg-blue-50 p-6 text-gray-700 rounded-b-lg"
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
