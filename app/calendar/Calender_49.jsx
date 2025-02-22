"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #0f172a, #1e1b4b);
  border-radius: 0.5rem;
  box-shadow: 
    0 8px 32px rgba(99, 102, 241, 0.3),
    0 0 0 1px rgba(99, 102, 241, 0.2),
    inset 0 0 20px rgba(99, 102, 241, 0.2);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  font-family: "Orbitron", sans-serif;
`;

const Calendar_49 = ({ initialDate, onSelectDate }) => {
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
  const handleDateSelect = (date) => { setSelectedDate(date); onSelectDate?.(date); };
  const handleYearSelect = (year) => { setCurrentDate(new Date(year, currentDate.getMonth(), 1)); setIsYearSelectorOpen(false); };

  return (
    <CalendarContainer>
      <button onClick={handlePrevMonth}>←</button>
      <button onClick={() => setIsYearSelectorOpen(!isYearSelectorOpen)}>
        {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
      </button>
      <button onClick={handleNextMonth}>→</button>
      <div>
        {isYearSelectorOpen && (
          <div>
            {Array.from({ length: 20 }, (_, i) => currentDate.getFullYear() - 10 + i).map((year) => (
              <button key={year} onClick={() => handleYearSelect(year)}>{year}</button>
            ))}
          </div>
        )}
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

export default Calendar_49;


