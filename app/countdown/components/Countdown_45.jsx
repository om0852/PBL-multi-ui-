"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sizeClasses = {
  sm: {
    container: "w-20 h-24",
    value: "text-3xl",
    label: "text-xs",
    separator: "text-3xl"
  },
  md: {
    container: "w-28 h-32",
    value: "text-4xl",
    label: "text-sm",
    separator: "text-4xl"
  },
  lg: {
    container: "w-36 h-40",
    value: "text-5xl",
    label: "text-base",
    separator: "text-5xl"
  }
};

const Countdown_51 = ({
  to,
  interval = 1,
  className = "",
  onComplete,
  size = "md"
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let timer;
    const tick = () => {
      const remainingTime = to.getTime() - Date.now();
      setTimeLeft(Math.max(0, remainingTime));

      if (remainingTime <= 0 && onComplete) {
        onComplete();
      }
    };

    tick();
    timer = setInterval(tick, interval * 1000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [to, interval, onComplete]);

  if (!isMounted) return null;

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor(timeLeft / 1000 / 60 / 60);

  const TimeUnit = ({ value, label }) => (
    <motion.div
      className={`${sizeClasses[size].container} bg-black/60 rounded-xl flex flex-col items-center justify-center border border-cyan-500/50`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
    >
      <motion.span
        className={`${sizeClasses[size].value} font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500`}
        animate={{
          opacity: [0, 1, 0],
          scale: [1, 1.1, 1],
          rotateZ: [0, 360, 0]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {value.toString().padStart(2, "0")}
      </motion.span>
      <span className={`${sizeClasses[size].label} text-cyan-300`}>{label}</span>
    </motion.div>
  );

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <motion.h2
          className="text-4xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Countdown Timer
        </motion.h2>

        <div className="flex items-center gap-6">
          <TimeUnit value={hours} label="HRS" />
          <motion.span
            className={`${sizeClasses[size].separator} text-cyan-300 font-medium`}
            animate={{
              opacity: [1, 0.3, 1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            :
          </motion.span>
          <TimeUnit value={minutes} label="MIN" />
          <motion.span
            className={`${sizeClasses[size].separator} text-cyan-300 font-medium`}
            animate={{
              opacity: [1, 0.3, 1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            :
          </motion.span>
          <TimeUnit value={seconds} label="SEC" />
        </div>
      </motion.div>
    </div>
  );
};

export default Countdown_51;
