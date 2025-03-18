'use client'; // Enable client-side rendering

import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export const StepsRoot = ({ steps, initialStep = 0 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="relative w-full h-2 bg-gray-300 rounded-full">
        <motion.div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
          style={{ width: `${progressPercentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <StepsList steps={steps} currentStep={currentStep} />
      <div className="flex space-x-6">
        <StepsPrevTrigger disabled={currentStep === 0} onClick={goToPrevStep} />
        <StepsNextTrigger disabled={currentStep === steps.length - 1} onClick={goToNextStep} />
      </div>
    </div>
  );
};

export const StepsList = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="relative flex items-center justify-center ">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <StepsItem
            isActive={index === currentStep}
            isCompleted={index < currentStep}
          >
            {step}
          </StepsItem>
          {index < steps.length - 1 && (
            <motion.div
              className="w-16 h-1 bg-gray-300"
              initial={{ width: 0 }}
              animate={{ width: currentStep >= index ? "4rem" : "0%" }}
              transition={{ duration: 0.6 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export const StepsItem = ({
  isActive,
  isCompleted,
  children,
}) => {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ scale: 0.8 }}
      animate={{
        scale: isActive ? 1.4 : isCompleted ? 1 : 0.8,
        opacity: isActive || isCompleted ? 1 : 0.6,
      }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className={clsx(
          "flex items-center justify-center w-12 h-12 rounded-full text-white font-semibold shadow-lg",
          isCompleted
            ? "bg-green-600"
            : isActive
            ? "bg-blue-600"
            : "bg-gray-400"
        )}
        animate={isActive ? { rotate: 360 } : undefined}
        transition={{ duration: 0.6 }}
      >
        {isCompleted ? (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        ) : (
          children
        )}
      </motion.div>
    </motion.div>
  );
};

export const StepsNextTrigger = ({
  disabled,
  onClick,
}) => {
  return (
    <motion.button
      className={clsx(
        "px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all",
        disabled
          ? "opacity-50 cursor-not-allowed bg-gray-400"
          : "bg-blue-600 hover:bg-blue-700"
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      Next
    </motion.button>
  );
};

export const StepsPrevTrigger = ({
  disabled,
  onClick,
}) => {
  return (
    <motion.button
      className={clsx(
        "px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all",
        disabled
          ? "opacity-50 cursor-not-allowed bg-gray-400"
          : "bg-gray-600 hover:bg-gray-700"
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      Previous
    </motion.button>
  );
};

// Example Usage
export const Example = () => {
  return (
    <StepsRoot
      steps={["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]}
      initialStep={0}
    />
  );
};

const SteppedProgressBar_27 = StepsRoot;
export default SteppedProgressBar_27; 