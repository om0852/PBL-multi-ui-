import React from "react";

const Button26 = ({
  text,
  size = "w-40 h-14",
  onClick,
}) => {
  return (
    <button
      className={`relative ${size} bg-gradient-to-r from-purple-500 to-yellow-500 text-white font-bold rounded-full flex items-center justify-center overflow-hidden cursor-pointer animate-[colorShift_3s_linear_infinite]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button26;