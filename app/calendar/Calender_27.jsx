"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #0ea5e9, #0369a1);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.2);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const WavePattern = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 0% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  opacity: 0.6;
  pointer-events: none;
`;

const Calendar_27 = ({ initialDate, onSelectDate }) => {
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
    onSelectDate?.(date);
  };

  return (
    <CalendarContainer>
      <WavePattern />
      <button onClick={handlePrevMonth}>←</button>
      <button onClick={handleNextMonth}>→</button>
      <div>
        {days.map(({ date, currentMonth }, index) => (
          <button 
            key={index} 
            onClick={() => handleDateSelect(date)}
            style={{ background: selectedDate?.toDateString() === date.toDateString() ? '#0369a1' : 'white' }}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </CalendarContainer>
  );
};

export default Calendar_27;
