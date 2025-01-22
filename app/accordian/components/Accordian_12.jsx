'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="relative mb-4 w-full">
      <button
        className={`relative w-full py-6 px-8 rounded-lg bg-white border border-gray-300 shadow-md transition-all duration-300 hover:shadow-lg ${
          isOpen ? 'shadow-xl' : ''
        }`}
        onClick={onClick}
      >
        <motion.div
          className="flex justify-between items-center"
          animate={{ opacity: isOpen ? 0 : 1 }}
          initial={{ opacity: 1 }}
        >
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </motion.div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
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