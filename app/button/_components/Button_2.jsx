import React from "react";

function Button2({
  text,
  color = "bg-blue-500",
  textColor = "text-white",
  size = "text-lg",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 rounded-lg ${color} ${textColor} ${size} font-semibold shadow-lg focus:outline-none hover:bg-opacity-80 transition-all`}
    >
      {text}
      <span className="absolute inset-0 w-full h-full bg-white opacity-0 rounded-lg pointer-events-none ripple-animation"></span>
      <style>
        {`
          button:active .ripple-animation {
            opacity: 0.3;
            animation: ripple 0.6s ease-out;
          }
          @keyframes ripple {
            0% { transform: scale(0); opacity: 0.5; }
            100% { transform: scale(4); opacity: 0; }
          }
        `}
      </style>
    </button>
  );
}

export default Button2;