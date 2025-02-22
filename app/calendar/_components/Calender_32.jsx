"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.2);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const PalmPattern = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  opacity: 0.6;
  pointer-events: none;
`;

const SunGlow = styled.div`
  position: absolute;
  top: -100px;
  right: -100px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(250, 204, 21, 0.2) 0%, transparent 70%);
  filter: blur(40px);
  animation: pulse 4s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.5; }
  }
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const Calendar_32 = ({ initialDate, onSelectDate }) => {
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

  return (
    <CalendarContainer>
      <PalmPattern />
      <SunGlow />
      <Header>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
      </Header>
    </CalendarContainer>
  );
};

export default Calendar_32;
