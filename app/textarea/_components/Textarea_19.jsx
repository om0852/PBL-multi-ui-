"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Textarea = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      containerClassName,
      labelClassName,
      errorClassName,
      helperClassName,
      showCharacterCount,
      maxLength,
      className,
      required,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const [isFloating, setIsFloating] = useState(false);
    const innerRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, innerRef);

    useEffect(() => {
      if (defaultValue || value) {
        setIsFloating(true);
      }
    }, [defaultValue, value]);

    const handleFocus = (e) => {
      if (disabled) return;
      setIsFocused(true);
      setIsFloating(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e) => {
      if (disabled) return;
      setIsFocused(false);
      if (!e.target.value) {
        setIsFloating(false);
      }
      props.onBlur?.(e);
    };

    const handleChange = (e) => {
      if (disabled) return;
      setCharacterCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className={clsx("relative", containerClassName)}>
        {/* Paper Container */}
        <div className={clsx(
          "relative",
          "bg-[#fff5e6]",
          "shadow-[2px_3px_10px_rgba(0,0,0,0.3)]",
          "before:absolute before:inset-0",
          "before:bg-[linear-gradient(transparent_31px,#dedede_31px)]",
          "before:bg-[size:100%_32px]",
          "before:pointer-events-none",
          disabled && "opacity-70"
        )}>
          {/* Red Margin Line */}
          <div className={clsx(
            "absolute top-0 bottom-0 left-8",
            "w-px bg-red-300",
            "pointer-events-none"
          )} />

          {/* Paper Holes */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 flex flex-col justify-around pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-gray-300 -ml-0.75" />
            <div className="w-2 h-2 rounded-full bg-gray-300 -ml-0.75" />
            <div className="w-2 h-2 rounded-full bg-gray-300 -ml-0.75" />
          </div>

          {/* Textarea */}
          <textarea
            ref={combinedRef}
            {...props}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={maxLength}
            disabled={disabled}
            className={clsx(
              "block w-full p-4 pl-12 text-base",
              "bg-transparent",
              "border-none",
              "text-gray-800",
              "placeholder-gray-400",
              "focus:outline-none focus:ring-0",
              "font-[Caveat]",
              "leading-8",
              disabled && "cursor-not-allowed",
              className
            )}
            style={{
              minHeight: "160px",
              lineHeight: "32px"
            }}
          />

          {/* Floating Label */}
          <motion.label
            htmlFor={props.id}
            animate={{
              y: isFloating ? -28 : 0,
              x: isFloating ? 0 : 48,
              scale: isFloating ? 0.85 : 1,
              color: isFocused 
                ? error 
                  ? "#ef4444" 
                  : "#3b82f6" 
                : error
                  ? "#ef4444"
                  : disabled
                    ? "#9ca3af"
                    : "#6b7280"
            }}
            transition={{ duration: 0.2 }}
            className={clsx(
              "absolute left-0 top-4",
              "text-gray-600",
              "pointer-events-none",
              "origin-[0]",
              "transition-all",
              "font-[Caveat]",
              labelClassName
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </motion.label>

          {/* Character Counter */}
          {showCharacterCount && !disabled && (
            <div className={clsx(
              "absolute right-3 bottom-2",
              "text-sm",
              "text-gray-500",
              "font-[Caveat]"
            )}>
              {characterCount}
              {maxLength && ` / ${maxLength}`}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={clsx(
              "mt-2 text-sm text-red-500",
              "font-[Caveat]",
              errorClassName
            )}
          >
            {error}
          </motion.p>
        )}

        {/* Helper Text */}
        {!error && helperText && (
          <p className={clsx(
            "mt-2 text-sm text-gray-500",
            "font-[Caveat]",
            disabled && "opacity-50",
            helperClassName
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea_19';

function useCombinedRefs(...refs) {
  return React.useCallback((element) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(element);
      } else {
        ref.current = element;
      }
    });
  }, [refs]);
}

export default Textarea; 