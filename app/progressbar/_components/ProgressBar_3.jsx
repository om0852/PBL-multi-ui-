import React, { useState } from "react";
import { motion } from "framer-motion";

const ProgressBar_3 = ({
  steps,
  activeColor = "bg-blue-500",
  completedColor = "bg-green-500",
  inactiveColor = "bg-gray-300",
  onStart,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0); // Track the current progress step

  const totalSteps = steps.length;

  const handleStepChange = (index) => {
    if (index !== currentStep) {
      onStart?.(index); // Trigger onStart callback
      setCurrentStep(index);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Outer progress bar container */}
      <div className="relative w-full h-4 bg-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Animated progress bar */}
        <motion.div
          className="h-full bg-blue-500"
          animate={{
            width: `${(currentStep / (totalSteps - 1)) * 100}%`, // Dynamic width calculation
          }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => onComplete?.(currentStep)} // Trigger onComplete callback
        />
      </div>

      {/* Steps rendering */}
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              handleStepChange(index);
              step.onClick?.(); // Call custom click handler if defined
            }}
          >
            {/* Step dot */}
            <motion.div
              className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                index < currentStep
                  ? completedColor
                  : index === currentStep
                  ? activeColor
                  : inactiveColor
              }`}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
            {/* Step label */}
            <span className="mt-1 text-sm text-gray-700">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar_3; 