import React from "react";

const ScaleBadge = ({ text, color = "bg-green-500" }) => {
  return (
    <div
      className={`inline-block px-4 py-2 text-white font-semibold rounded-xl ${color} 
      transform hover:scale-110 active:scale-90 transition-transform duration-200 cursor-pointer`}
    >
      {text}
    </div>
  );
};

export default ScaleBadge;
