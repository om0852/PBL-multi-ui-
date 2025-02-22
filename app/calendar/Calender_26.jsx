"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #f97316, #c2410c);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(249, 115, 22, 0.2);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const SunsetOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(251, 146, 60, 0.05)
  );
  pointer-events: none;
`;

const CirclePattern = styled.div`
  position: absolute;
  top: -50%;
  right: -20%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 237, 213, 0.2) 0%, transparent 70%);
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
  color: white;
  font-size: 1.25rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const MonthYearButton = styled(motion.button)`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
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
      <SunsetOverlay />
      <CirclePattern />
      <Header>
        <HeaderControls>
          <MonthButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handlePrevMonth}>←</MonthButton>
          <MonthYearButton whileHover={{ scale: 1.05 }}>
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </MonthYearButton>
          <MonthButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleNextMonth}>→</MonthButton>
        </HeaderControls>
      </Header>
    </CalendarContainer>
  );
};

export default Calendar;
