"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #c084fc, #8b5cf6);
  border-radius: 2rem;
  box-shadow: 
    0 8px 32px rgba(192, 132, 252, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const CrystalPattern = styled.div`
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(60deg, transparent 25%, rgba(255, 255, 255, 0.1) 50%, transparent 75%),
    linear-gradient(-60deg, transparent 25%, rgba(255, 255, 255, 0.1) 50%, transparent 75%);
  background-size: 100px 100px;
  opacity: 0.5;
  animation: shimmer 10s linear infinite;
  
  @keyframes shimmer {
    0% { background-position: 0 0; }
    100% { background-position: 100px 100px; }
  }
`;

const Calendar_35 = ({ initialDate, onSelectDate }) => {
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
      <CrystalPattern />
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

export default Calendar_35;
