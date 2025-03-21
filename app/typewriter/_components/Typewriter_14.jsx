"use client"
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Typewriter_14 = ({
  text,
  typingSpeed = 50,
  cursorColor = "#00ff00",
  textColor = "#00ff00",
  fontSize = "2rem",
  fontFamily = "'Matrix Code NFI', monospace",
  glowColor = "rgba(0, 255, 0, 0.5)",
  className = "",
  delay = 1000,
  scrambleEffect = true
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    let timeout;
    
    if (isTyping) {
      if (displayText.length < texts[currentTextIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(texts[currentTextIndex].slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delay);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, typingSpeed / 2);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, texts, typingSpeed, delay, isTyping, scrambleEffect]);

  return (
    <div
      className={className}
      style={{
        display: "inline-block",
        position: "relative",
        fontFamily,
        fontSize,
        color: textColor,
      }}
    >
      <AnimatePresence mode="popLayout">
        {displayText.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ 
              opacity: 0,
              y: -50,
              color: "#ffffff"
            }}
            animate={scrambleEffect ? {
              opacity: [0, 1, 1],
              y: [0],
              color: [textColor],
              transition: {
                duration: 0.5,
                times: [0, 0.8, 1],
              }
            } : {
              opacity: 1,
              y: 0,
              color: textColor
            }}
            exit={{ 
              opacity: 0,
              y: 50,
              transition: { duration: 0.2 }
            }}
            style={{
              display: "inline-block",
              textShadow: `0 0 8px ${glowColor}`,
            }}
          >
            {scrambleEffect ? (
              <motion.span
                animate={{
                  display: "inline-block",
                  transition: {
                    duration: 0.1,
                    repeat: 3,
                    repeatType: "reverse"
                  }
                }}
              >
                {char}
              </motion.span>
            ) : char}
          </motion.span>
        ))}
      </AnimatePresence>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scaleY: [1, 1.2, 1.2, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          times: [0, 0.2, 0.8, 1]
        }}
        style={{
          display: "inline-block",
          width: "0.5em",
          height: "1.2em",
          background: cursorColor,
          marginLeft: "2px",
          boxShadow: `0 0 10px ${cursorColor}`,
          verticalAlign: "middle"
        }}
      />
    </div>
  );
};

export default Typewriter_14;
