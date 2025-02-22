"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: linear-gradient(180deg, #2b1055 0%, #7597de 100%);
  border-radius: 1rem;
  box-shadow: 
    0 8px 32px rgba(255, 0, 255, 0.3),
    0 0 0 1px rgba(255, 0, 255, 0.2);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(90deg, rgba(255, 0, 255, 0.2) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 0, 255, 0.2) 1px, transparent 1px);
  background-size: 20px 20px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: top;
  animation: gridMove 20s linear infinite;

  @keyframes gridMove {
    from { background-position: 0 0; }
    to { background-position: 0 20px; }
  }
`;

const SunEffect = styled.div`
  position: absolute;
  top: -50%;
  left: 50%;
  width: 200px;
  height: 200px;
  transform: translateX(-50%);
  background: radial-gradient(circle, #ff00ff 0%, transparent 70%);
  opacity: 0.3;
  filter: blur(20px);
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
  color: #00ffff;
  font-size: 1.25rem;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 0.5rem;
  text-shadow: 0 0 10px #00ffff;
  
  &:hover {
    background: rgba(0, 255, 255, 0.2);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  }
`;

const MonthYearButton = styled(motion.button)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ff00ff;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 0, 255, 0.1);
  border: 1px solid rgba(255, 0, 255, 0.3);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-shadow: 0 0 10px #ff00ff;
  
  &:hover {
    background: rgba(255, 0, 255, 0.2);
    box-shadow: 0 0 20px rgba(255, 0, 255, 0.4);
  }
`;

const Calendar_39 = ({ initialDate, onSelectDate }) => {
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
      <GridPattern />
      <SunEffect />
      <Header>
        <HeaderControls>
          <MonthButton onClick={handlePrevMonth}>←</MonthButton>
          <MonthYearButton onClick={() => setIsYearSelectorOpen(!isYearSelectorOpen)}>
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </MonthYearButton>
          <MonthButton onClick={handleNextMonth}>→</MonthButton>
        </HeaderControls>
      </Header>
    </CalendarContainer>
  );
};

export default Calendar_39;
