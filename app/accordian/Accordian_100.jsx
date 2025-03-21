'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

function AccordionItem({ title, content, isOpen, onClick }) {
  const buttonRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    function handleMouseMove(event) {
      const rect = button?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      const maxDistance = 50;

      const moveX = Math.abs(distanceX) < maxDistance ? distanceX : 0;
      const moveY = Math.abs(distanceY) < maxDistance ? distanceY : 0;

      x.set(moveX * 0.1);
      y.set(moveY * 0.1);
    }

    function handleMouseLeave() {
      x.set(0);
      y.set(0);
    }

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  return (
    <div className="mb-4">
      <motion.button
        ref={buttonRef}
        style={{
          x: springX,
          y: springY,
        }}
        className={`w-full text-left relative overflow-hidden rounded-lg transition-colors duration-300 ${
          isOpen ? 'bg-purple-600' : 'bg-purple-500/30 hover:bg-purple-500/50'
        }`}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative z-10 p-4">
          <div className="flex items-center justify-between">
            <motion.span
              className="text-lg font-medium text-white"
              animate={{
                scale: isOpen ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.span>
            <motion.div
              animate={{
                rotate: isOpen ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                isOpen ? 'bg-white/30' : 'bg-white/10'
              }`}
            >
              <svg
                className="w-4 h-4 text-white transform transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="relative mt-2">
              <div className="relative rounded-lg bg-purple-500/10 p-4">
                <motion.div
                  className="relative text-white/90"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {content}
                </motion.div>
              </div>
            </div>
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
