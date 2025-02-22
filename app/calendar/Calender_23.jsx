"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: #0a0a0a;
  border-radius: 1.5rem;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.1);
  padding: 1.5rem;
  border: 1px solid rgba(0, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
`;

const NeonGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.15), transparent 70%);
  opacity: 0.5;
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

const MonthButton = styled(motion.button)`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ffff;
  font-size: 1.25rem;
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 50%;
  background: rgba(0, 255, 255, 0.05);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }
`;

const MonthYearButton = styled(motion.button)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 1rem;
  background: rgba(0, 255, 255, 0.05);
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }
`;

const Calendar_23 = ({ initialDate, onSelectDate }) => {
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
    onSelectDate?.(date);
  };

  return (
    <CalendarContainer>
      <NeonGlow />
      <Header>
        <HeaderControls>
          <MonthButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handlePrevMonth}>←</MonthButton>
          <MonthYearButton whileHover={{ scale: 1.05 }}>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</MonthYearButton>
          <MonthButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleNextMonth}>→</MonthButton>
        </HeaderControls>
      </Header>
    </CalendarContainer>
  );
};

export default Calendar_23;
