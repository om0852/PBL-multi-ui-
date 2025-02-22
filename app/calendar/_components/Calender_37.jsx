"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #020617, #1e1b4b);
  border-radius: 1.5rem;
  box-shadow: 
    0 8px 32px rgba(30, 27, 75, 0.4),
    0 0 0 1px rgba(99, 102, 241, 0.2);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const StarField = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(1px 1px at 25% 25%, white 1px, transparent 1px),
    radial-gradient(1px 1px at 75% 75%, white 1px, transparent 1px),
    radial-gradient(2px 2px at 50% 50%, white 1px, transparent 1px);
  background-size: 100px 100px;
  opacity: 0.3;
  animation: twinkle 4s ease-in-out infinite alternate;

  @keyframes twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.4; }
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
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 0.75rem;
  &:hover {
    background: rgba(99, 102, 241, 0.2);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }
`;

const WeekdayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 1rem;
`;

const WeekdayLabel = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6366f1;
`;

const DaysGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

const DayButton = styled(motion.button)`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  position: relative;
  border: 1px solid rgba(99, 102, 241, 0.2);
  background: rgba(30, 27, 75, 0.6);
  &:hover {
    background: rgba(99, 102, 241, 0.1);
  }
`;

const Calendar = ({ initialDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    const days = [];
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDay = start.getDay() || 7;
    for (let i = 1; i < firstDay; i++) {
      days.unshift(new Date(date.getFullYear(), date.getMonth(), 1 - i));
    }
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
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
      <StarField />
      <Header>
        <HeaderControls>
          <MonthButton onClick={handlePrevMonth}>←</MonthButton>
          <h2>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</h2>
          <MonthButton onClick={handleNextMonth}>→</MonthButton>
        </HeaderControls>
      </Header>
      <WeekdayGrid>
        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
          <WeekdayLabel key={index}>{day}</WeekdayLabel>
        ))}
      </WeekdayGrid>
      <DaysGrid>
        {days.map((date, index) => (
          <DayButton key={index} onClick={() => handleDateSelect(date)}>
            {date.getDate()}
          </DayButton>
        ))}
      </DaysGrid>
    </CalendarContainer>
  );
};

export default Calendar;
