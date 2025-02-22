"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: #2e1065;
  border: 4px solid #7e22ce;
  border-radius: 0.5rem;
  box-shadow: 
    0 0 0 4px #2e1065,
    0 0 0 8px #7e22ce,
    inset 0 0 20px rgba(126, 34, 206, 0.5);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  image-rendering: pixelated;
`;

const PixelPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(45deg, #2e1065 25%, transparent 25%),
    linear-gradient(-45deg, #2e1065 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #2e1065 75%),
    linear-gradient(-45deg, transparent 75%, #2e1065 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
  opacity: 0.1;
  animation: pixelate 2s steps(2) infinite;

  @keyframes pixelate {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.15; }
  }
`;

const ScanLines = styled.div`
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  animation: scan 10s linear infinite;

  @keyframes scan {
    0% { transform: translateY(0); }
    100% { transform: translateY(20px); }
  }
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
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
  color: #e9d5ff;
  font-size: 1.25rem;
  background: #581c87;
  border: 2px solid #7e22ce;
  border-radius: 0.25rem;
  text-shadow: 2px 2px #2e1065;
  image-rendering: pixelated;
  
  &:hover {
    background: #7e22ce;
    box-shadow: 
      0 0 10px rgba(126, 34, 206, 0.5),
      inset 0 0 5px rgba(126, 34, 206, 0.5);
  }

  &:active {
    transform: translate(2px, 2px);
  }
`;

const Calendar_47 = ({ initialDate, onSelectDate }) => {
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
      days.push({
        date: new Date(date.getFullYear(), date.getMonth(), i),
        currentMonth: true,
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
      <PixelPattern />
      <ScanLines />
      <Header>
        <HeaderControls>
          <MonthButton onClick={handlePrevMonth}>←</MonthButton>
          <span>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</span>
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

export default Calendar_47;
