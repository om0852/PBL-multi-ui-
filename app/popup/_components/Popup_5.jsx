"use client";
import React, { useState } from "react";

const Popup_5 = ({
  menuItems,
  distance = 120, // Default distance for menu items
  centralContent = "Open Menu", // Default content for the central button
  centerColor = "bg-green-500",
  menuColor = "bg-purple-500",
  centerRadius = "w-24 h-24", // Default radius for center button
  menuItemRadius = "w-12 h-12", // Default radius for menu items
  onCenterClick, // Optional: onClick handler for center button
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
        transform: `translate(0px, 0px)`,
        opacity: 0,
        visibility: "hidden",
        transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
      };
    }

    return {
      transform: `translate(${x}px, ${y}px)`,
      opacity: 1,
      visibility: "visible",
      transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
    };
  };

  const handleMenuItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsChecked(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-900">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="hidden"
        />
        {/* Center Toggle Button */}
        <label
          htmlFor="checkbox"
          onClick={onCenterClick} // Execute onCenterClick if passed
          className={`${centerColor} ${centerRadius} rounded-full flex items-center justify-center text-white text-lg cursor-pointer relative z-10 transition-all duration-300 ease-in-out`}
          style={{
            transform: isChecked ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          {centralContent}
        </label>
        {/* Circular Menu Items */}
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleMenuItemClick(item)}
            style={menuStyles(index)}
            className={`absolute ${menuColor} ${menuItemRadius} text-white rounded-full flex items-center justify-center text-sm no-underline transition-all duration-300 ease-in-out cursor-pointer`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popup_5; 