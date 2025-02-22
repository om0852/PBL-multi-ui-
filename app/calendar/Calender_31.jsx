"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: #f8fafc;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px rgba(148, 163, 184, 0.1);
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const ZenPattern = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 0% 0%, #f1f5f9 2px, transparent 2px),
    radial-gradient(circle at 100% 100%, #f1f5f9 2px, transparent 2px);
  background-size: 24px 24px;
  opacity: 0.5;
  pointer-events: none;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const HeaderControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MonthButton = styled(motion.button)`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 1.25rem;
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const Calendar_31 = ({ initialDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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
      <ZenPattern />
      <Header>
        <HeaderControls>
          <MonthButton onClick={handlePrevMonth}>←</MonthButton>
          <div>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</div>
          <MonthButton onClick={handleNextMonth}>→</MonthButton>
        </HeaderControls>
      </Header>

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

export default Calendar_31;
