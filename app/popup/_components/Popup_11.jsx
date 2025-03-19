"use client";
import React, { useState } from "react";

const Popup_11 = ({
  menuItems,
  distance = 150, // Default distance for menu items
  label = "Menu", // Default central button content
  centerColor = "bg-indigo-500",
  menuColor = "bg-pink-400",
  centerRadius = "w-16 h-16", // Default radius for center button
  menuItemRadius = "w-12 h-12", // Default radius for menu items
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const angles = Array.from({ length: menuItems.length }, (_, index) =>
    (360 / menuItems.length) * index
  );

  const menuStyles = (index) => {
    const angle = (angles[index] * Math.PI) / 180; // Convert to radians
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    if (!isChecked) {
      return {
        transform: `translate(0px, 0px) scale(0)`,
        opacity: 0,
        visibility: "hidden",
        transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
      };
    }

    return {
      transform: `translate(${x}px, ${y}px) scale(1)`,
      opacity: 1,
      visibility: "visible",
      transition: `transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${0.1 * index}s, opacity 0.5s ease-out ${0.1 * index}s`,
    };
  };

  const handleMenuItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsChecked(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-800">
      <div className="relative flex items-center justify-center">
        {/* Center Toggle Button */}
        <button
          onClick={handleToggle}
          className={`${centerColor} ${centerRadius} rounded-full flex items-center justify-center text-white text-lg cursor-pointer relative z-10 transition-transform duration-300 hover:scale-110`}
          style={{
            animation: isChecked ? "ripple 1.5s infinite" : "none",
          }}
        >
          {label}
        </button>
        {/* Ripple Menu Items */}
        {menuItems.map((item, index) => (
          <div
            key={typeof item.label === 'string' ? item.label : index}
            onClick={() => handleMenuItemClick(item)}
            style={menuStyles(index)}
            className={`absolute ${menuColor} ${menuItemRadius} text-white rounded-full flex items-center justify-center text-sm no-underline transition-all duration-300 ease-in-out cursor-pointer hover:scale-125`}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popup_11; 