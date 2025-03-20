"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// OTP Slot Component with a Pulse Animation for Entering Text and Color Change for Invalid Input
const InputOTPSlot = ({
  index,
  value,
  onChange,
  onKeyDown,
  invalid,
}) => {
  return (
    <motion.input
      type="text"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value, index)}
      onKeyDown={onKeyDown}
      className={`w-16 h-16 text-center text-2xl font-semibold rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
        invalid
          ? "border-yellow-500 bg-yellow-100 text-yellow-600 ring-yellow-500"
          : "border-teal-500 bg-teal-50 text-teal-700 ring-teal-500"
      }`}
      animate={{
        scale: value ? 1.15 : 1,
        opacity: value ? 1 : 0.7,
        rotate: value ? [0, -5, 5, 0] : 0, // Slight rotation on entering value
        boxShadow: value ? "0 4px 10px rgba(0, 128, 128, 0.3)" : "none", // Adding shadow effect on value entry
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    />
  );
};

// OTP Group Component
const InputOTPGroup = ({ children }) => {
  return <div className="flex space-x-4 items-center">{children}</div>;
};

// OTP Separator Component
export const InputOTPSeparator = () => (
  <div className="text-2xl font-medium text-gray-600">|</div>
);

// Main OTP Input Component
export const InputOTP = ({
  maxLength,
  children,
  onComplete,
  validationRegex = /^[A-Za-z0-9]*$/,
}) => {
  const [otp, setOtp] = useState(new Array(maxLength).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [invalidIndexes, setInvalidIndexes] = useState([]);

  // Handle OTP Slot Change
  const handleChange = (value, index) => {
    if (value.match(validationRegex)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setInvalidIndexes((prev) => prev.filter((i) => i !== index)); // Clear invalid state
      if (value && index < maxLength - 1) {
        focusNextSlot(index); // Automatically focus next slot after typing
      }
    } else {
      // Mark the index as invalid
      setInvalidIndexes((prev) => (prev.includes(index) ? prev : [...prev, index]));
    }
  };

  // Focus on the next OTP slot
  const focusNextSlot = (index) => {
    const nextIndex = index + 1;
    if (nextIndex < maxLength) {
      setFocusedIndex(nextIndex);
    }
  };

  // Handle KeyDown to move to the next or previous slot
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (newOtp[index] === "" && index > 0) {
        setFocusedIndex(index - 1);
      } else {
        newOtp[index] = "";
      }
      setOtp(newOtp);
    } else if (e.key === "ArrowRight" && index < maxLength - 1) {
      setFocusedIndex(index + 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      setFocusedIndex(index - 1);
    }
  };

  useEffect(() => {
    if (focusedIndex !== null) {
      document.querySelectorAll("input")[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  // Trigger the callback when OTP is complete
  useEffect(() => {
    if (otp.every((slot) => slot !== "") && onComplete) {
      onComplete(otp.join(""));
    }
  }, [otp, onComplete]);

  const isInputOTPSlot = (element) => {
    return element.type === InputOTPSlot;
  };

  const isInputOTPGroup = (element) => {
    return element.type === InputOTPGroup;
  };

  // Inject OTP values into InputOTPSlot components
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && isInputOTPGroup(child)) {
      const groupChildren = React.Children.map(child.props.children, (slot) => {
        if (React.isValidElement(slot) && isInputOTPSlot(slot)) {
          return React.cloneElement(slot, {
            value: otp[slot.props.index],
            onChange: handleChange,
            onKeyDown: (e) => handleKeyDown(e, slot.props.index),
            invalid: invalidIndexes.includes(slot.props.index),
          });
        }
        return slot;
      });
      return React.cloneElement(child, { children: groupChildren });
    }
    return child;
  });

  return <div className="flex flex-col items-center">{childrenWithProps}</div>;
};

// Example Usage
export const Example = () => {
  const handleOtpComplete = (otp) => {
    console.log("Completed OTP:", otp);
  };

  return (
    <div className="p-8">
      <InputOTP
        maxLength={6}
        onComplete={handleOtpComplete}
        validationRegex={/^[0-9]*$/} // Only numeric values allowed
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} value="" onChange={() => {}} onKeyDown={() => {}} invalid={false} />
          <InputOTPSlot index={1} value="" onChange={() => {}} onKeyDown={() => {}} invalid={false} />
          <InputOTPSlot index={2} value="" onChange={() => {}} onKeyDown={() => {}} invalid={false} />
          <InputOTPSeparator />
          <InputOTPSlot index={3} value="" onChange={() => {}} onKeyDown={() => {}} invalid={false} />
          <InputOTPSlot index={4} value="" onChange={() => {}} onKeyDown={() => {}} invalid={false} />
          <InputOTPSlot index={5} value="" onChange={() => {}} onKeyDown={() => {}} invalid={false} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}; 