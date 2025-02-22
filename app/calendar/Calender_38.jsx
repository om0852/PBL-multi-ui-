"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: #1c1917;
  border-radius: 0;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 0 0 1px #ca8a04;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const ArtDecoPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(45deg, #ca8a04 25%, transparent 25%),
    linear-gradient(-45deg, #ca8a04 25%, transparent 25%);
  background-size: 8px 8px;
  opacity: 0.1;
  mask-image: radial-gradient(circle at 50% 50%, black, transparent 70%);
`;

const GoldAccent = styled.div`
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(45deg, transparent 48%, #ca8a04 49%, #eab308 50%, transparent 51%),
    linear-gradient(-45deg, transparent 48%, #ca8a04 49%, #eab308 50%, transparent 51%);
  background-size: 40px 40px;
  opacity: 0.2;
  pointer-events: none;
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

const Calendar_38 = ({ initialDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(false);

  const getDaysInMonth = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const days = [];
    const firstDay = start.getDay() || 7;
    for (let i = 1; i < firstDay; i++) {
      days.unshift({ date: new Date(date.getFullYear(), date.getMonth(), 1 - i), currentMonth: false });
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
    onSelectDate?.(date);
  };

  return (
    <CalendarContainer>
      <ArtDecoPattern />
      <GoldAccent />
      <Header>
        <HeaderControls>
          <button onClick={handlePrevMonth}>←</button>
          <button onClick={() => setIsYearSelectorOpen(!isYearSelectorOpen)}>
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </button>
          <button onClick={handleNextMonth}>→</button>
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

export default Calendar_38;