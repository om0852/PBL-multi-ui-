"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #854d0e, #92400e);
  border-radius: 1rem;
  box-shadow: 
    0 8px 32px rgba(133, 77, 14, 0.3),
    0 0 0 4px #b45309,
    inset 0 0 32px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const Calendar = ({ initialDate, onSelectDate }) => {
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
      <button onClick={handlePrevMonth}>←</button>
      <span>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</span>
      <button onClick={handleNextMonth}>→</button>
      <div>
        {days.map(({ date, currentMonth }, index) => (
          <button
            key={index}
            onClick={() => handleDateSelect(date)}
            style={{ background: selectedDate?.toDateString() === date.toDateString() ? "#b45309" : "#92400e" }}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </CalendarContainer>
  );
};

export default Calendar;
