"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #18181b, #450a0a);
  border-radius: 0.5rem;
  box-shadow: 
    0 8px 32px rgba(239, 68, 68, 0.3),
    0 0 0 1px rgba(239, 68, 68, 0.2),
    inset 0 0 20px rgba(239, 68, 68, 0.2);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const LavaEffect = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(185, 28, 28, 0.4) 0%, transparent 50%);
  filter: blur(20px);
  animation: lavaFlow 8s ease-in-out infinite;

  @keyframes lavaFlow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }
`;

const Calendar_45 = ({ initialDate, onSelectDate }) => {
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
      days.push({ date: new Date(date.getFullYear(), date.getMonth(), i), currentMonth: true });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(date.getFullYear(), date.getMonth() + 1, i), currentMonth: false });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (onSelectDate) onSelectDate(date);
  };
  
  return (
    <CalendarContainer>
      <LavaEffect />
      {/* Calendar UI Components */}
      <div>
        <button onClick={handlePrevMonth}>←</button>
        <span>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</span>
        <button onClick={handleNextMonth}>→</button>
      </div>
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

export default Calendar_45;
