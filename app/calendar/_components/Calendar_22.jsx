"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
`;

const GlassBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border-radius: 1.5rem;
  z-index: -1;
`;

const Calendar_22 = ({ initialDate, onSelectDate }) => {
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
      <GlassBackground />
      <button onClick={handlePrevMonth}>←</button>
      <span>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</span>
      <button onClick={handleNextMonth}>→</button>

      <div>
        {days.map(({ date, currentMonth }, index) => (
          <button
            key={index}
            onClick={() => handleDateSelect(date)}
            style={{ opacity: currentMonth ? 1 : 0.5 }}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </CalendarContainer>
  );
};

export default Calendar_22;
