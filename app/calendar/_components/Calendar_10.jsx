"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RadialCircularCalendar = ({ initialDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = endOfMonth.getDate();
    const radius = 150;

    const generatedDays = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
      const angle = (360 / daysInMonth) * i;
      const x = radius * Math.cos((angle * Math.PI) / 180);
      const y = radius * Math.sin((angle * Math.PI) / 180);
      return { date, currentMonth: true, x, y };
    });

    setDays(generatedDays);
  }, [currentDate]);

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onSelectDate?.(date);
    const dayIndex = date.getDate() - 1;
    const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const angle = (360 / totalDays) * dayIndex;
    setRotationAngle(angle);
  };
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearSelector(false);
  };

  return (
    <div className="relative w-96 h-96 mx-auto rounded-full bg-gradient-to-tl from-blue-800 via-teal-600 to-indigo-500 flex items-center justify-center overflow-hidden">
      <div className="absolute flex flex-col items-center text-white z-10">
        <h2 onClick={() => setShowYearSelector(true)} className="text-xl font-bold cursor-pointer">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        {showYearSelector && (
          <div className="absolute w-[250px] top-[-100px] left-[-100%] transform translate-x-[10%] p-4 bg-gray-800 rounded-lg z-[100] shadow-lg">
            <h3 className="text-white text-lg">Select Year</h3>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i).map((year) => (
                <button key={year} onClick={() => handleYearSelect(year)} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2 mt-3">
          <button onClick={handlePrevMonth} className="px-2 py-1 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 shadow-md">&lt;</button>
          <button onClick={handleNextMonth} className="px-2 py-1 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 shadow-md">&gt;</button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={currentDate.toString()} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.3 }} className="relative top-[-5%] left-[-6%] w-full h-full" style={{ transform: `rotate(${rotationAngle}deg)`, transition: "transform 0.3s ease-in-out" }}>
          {days.map(({ date, x, y }, index) => (
            <motion.button key={index} onClick={() => handleDateSelect(date)} style={{ position: "absolute", left: `calc(50% + ${x}px)`, top: `calc(50% - ${y}px)`, transform: "translate(-50%, -50%)" }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.03, duration: 0.4 }} className={`w-12 h-12 flex items-center justify-center text-base font-medium rounded-full transition-transform duration-300 bg-gray-300 text-gray-800 hover:scale-110 ${selectedDate?.toDateString() === date.toDateString() ? "bg-gradient-to-br from-blue-400 to-purple-500 text-white ring-4 ring-gray-800" : "hover:bg-gray-400"}`}>
              {date.getDate()}
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RadialCircularCalendar;
