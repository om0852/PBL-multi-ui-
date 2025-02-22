"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #0c4a6e, #0369a1);
  border-radius: 0.5rem;
  box-shadow: 
    0 8px 32px rgba(14, 165, 233, 0.3),
    0 0 0 1px rgba(14, 165, 233, 0.2),
    inset 0 0 20px rgba(14, 165, 233, 0.2);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
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
  color: #bae6fd;
  font-size: 1.25rem;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 0.5rem;
  &:hover {
    background: rgba(14, 165, 233, 0.2);
  }
`;

const MonthYearButton = styled(motion.button)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #bae6fd;
  padding: 0.75rem 1.25rem;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 0.5rem;
`;

const Calendar_46 = ({ initialDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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
      <Header>
        <HeaderControls>
          <MonthButton onClick={handlePrevMonth}>←</MonthButton>
          <MonthYearButton>
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </MonthYearButton>
          <MonthButton onClick={handleNextMonth}>→</MonthButton>
        </HeaderControls>
      </Header>
      <div>
        {days.map(({ date, currentMonth }, index) => (
          <motion.button
            key={index}
            onClick={() => handleDateSelect(date)}
            style={{ color: currentMonth ? "#bae6fd" : "#0c4a6e" }}
          >
            {date.getDate()}
          </motion.button>
        ))}
      </div>
    </CalendarContainer>
  );
};

export default Calendar_46;
