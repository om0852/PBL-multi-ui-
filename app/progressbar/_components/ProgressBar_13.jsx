"use client";
import { motion } from "framer-motion";
import React from "react";

const ProgressBar_13 = ({
  progress,
  height = "h-4",
  color = "bg-blue-500",
  backgroundColor = "bg-gray-200",
  animationDuration = 0.5,
  showCounter = false,
}) => {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    let timer;
    if (showCounter && progress > 0) {
      const increment = progress / (animationDuration * 60); // Assuming 60 FPS
      timer = setInterval(() => {
        setCounter((prev) => {
          if (prev + increment >= progress) {
            clearInterval(timer);
            return progress;
          }
          return prev + increment;
        });
      }, 1000 / 60);
    } else {
      setCounter(progress);
    }
    return () => clearInterval(timer);
  }, [progress, animationDuration, showCounter]);

  return (
    <div className="space-y-2">
      <div
        className={`${backgroundColor} ${height} w-full overflow-hidden relative`}
      >
        <motion.div
          className={`${color} ${height} striped-progress`}
          initial={{ x: "-100%" }}
          animate={{ x: `calc(${progress}% - 100%)` }}
          transition={{ duration: animationDuration, ease: "easeInOut" }}
        />
      </div>
      {showCounter && <div className="text-center text-sm font-medium">{Math.round(counter)}%</div>}
    </div>
  );
};

export default ProgressBar_13; 