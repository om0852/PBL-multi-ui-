"use client";
import React, { useState } from "react";

const CircularCalendar = ({ initialDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const daysInMonth = endOfMonth.getDate();

  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i), currentMonth: true });
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onSelectDate?.(date);
  };

  return (
    <div className="relative w-96 h-96 mx-auto rounded-full">
      <div className="relative w-full h-full rounded-full border-4 border-gray-300 flex items-center justify-center">
        <div className="absolute flex flex-col items-center text-gray-700 z-10">
          <h2 className="text-lg font-bold">
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handlePrevMonth}
              className="px-2 py-1 bg-purple-300 text-purple-800 rounded-full hover:bg-purple-400"
            >
              &lt;
            </button>
            <button
              onClick={handleNextMonth}
              className="px-2 py-1 bg-purple-300 text-purple-800 rounded-full hover:bg-purple-400"
            >
              &gt;
            </button>
          </div>
        </div>

        {days.map(({ date }, index) => {
          const angle = (360 / days.length) * index;
          return (
            <button
              key={index}
              onClick={() => handleDateSelect(date)}
              style={{
                position: "absolute",
                transform: `rotate(${angle}deg) translate(160px) rotate(-${angle}deg)`,
                transformOrigin: "center",
              }}
              className={`w-12 h-12 flex items-center justify-center text-sm font-semibold rounded-full transition-colors 
                bg-gray-100 text-gray-900 
                ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? "bg-gradient-to-br from-green-400 to-blue-500 text-white shadow-lg"
                    : "hover:bg-blue-100"
                }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CircularCalendar;
