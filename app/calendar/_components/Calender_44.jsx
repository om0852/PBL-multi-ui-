"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #fdf2f8, #fbcfe8);
  border-radius: 2rem;
  box-shadow: 
    0 8px 32px rgba(236, 72, 153, 0.2),
    0 0 0 1px rgba(236, 72, 153, 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.5);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const MagicSparkles = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(2px 2px at 10% 10%, #f9a8d4 100%, transparent 100%),
    radial-gradient(2px 2px at 30% 40%, #f472b6 100%, transparent 100%),
    radial-gradient(2px 2px at 60% 30%, #ec4899 100%, transparent 100%),
    radial-gradient(2px 2px at 80% 70%, #db2777 100%, transparent 100%);
  background-size: 300px 300px;
  animation: twinkle 4s ease-in-out infinite alternate;
  opacity: 0.6;

  @keyframes twinkle {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
`;

const Calendar_44 = ({ initialDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(false);

  const getDaysInMonth = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const days = [];
    
    const firstDay = start.getDay() || 7;
    for (let i = 1; i < firstDay; i++) {
      const prevDate = new Date(date.getFullYear(), date.getMonth(), 1 - i);
      days.unshift({ date: prevDate, currentMonth: false });
    }
    
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth(), i),
        currentMonth: true,
      });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth() + 1, i),
        currentMonth: false,
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (onSelectDate) onSelectDate(date);
  };

  return (
    <CalendarContainer>
      <MagicSparkles />
      <button onClick={handlePrevMonth}>←</button>
      <button onClick={handleNextMonth}>→</button>
      <div>
        {days.map(({ date, currentMonth }, index) => (
          <button key={index} onClick={() => handleDateSelect(date)}>
            {date.getDate()}
          </button>
        ))}
      </div>
    </CalendarContainer>
  );
};

export default Calendar_44;
