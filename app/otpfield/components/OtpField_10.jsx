"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// OTP Slot Component
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
      className={`w-14 h-14 text-center text-2xl font-bold rounded-md shadow-lg ${
        invalid
          ? "bg-red-50 text-red-600 border-red-400"
          : "bg-gray-50 text-gray-800 border-gray-300"
      } border-2 focus:outline-none focus:ring-2 ${
        invalid ? "focus:ring-red-400" : "focus:ring-blue-400"
      }`}
      animate={invalid ? { y: [0, -5, 5, -3, 3, 0] } : {}}
      transition={{ duration: 0.4 }}
    />
  );
};

// OTP Group Component
const InputOTPGroup = ({ children }) => {
  return <div className="flex items-center space-x-3">{children}</div>;
};

// OTP Separator Component
export const InputOTPSeparator = () => (
  <div className="text-2xl font-semibold text-gray-500">-</div>
);

// Main OTP Input Component
export const InputOTP = ({
  maxLength,
  children,
  onComplete,
  validationRegex = /^[0-9]*$/,
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
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-md bg-white shadow-xl border border-gray-200">
        <h1 className="text-lg font-bold text-gray-700 mb-4">Enter OTP</h1>
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
    </div>
  );
}; 