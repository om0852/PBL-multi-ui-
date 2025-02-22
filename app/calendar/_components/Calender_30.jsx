"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 24rem;
  margin: 0 auto;
  background: #2d3436;
  border-radius: 0.5rem;
  box-shadow: 
    0 0 0 4px #636e72,
    0 0 0 8px #2d3436;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  image-rendering: pixelated;
`;

const PixelPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(45deg, #636e72 25%, transparent 25%),
    linear-gradient(-45deg, #636e72 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #636e72 75%),
    linear-gradient(-45deg, transparent 75%, #636e72 75%);
  background-size: 4px 4px;
  opacity: 0.1;
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
  color: #dfe6e9;
  font-size: 1.25rem;
  background: #636e72;
  border: none;
  box-shadow: 
    0 4px 0 #2d3436,
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  &:hover {
    background: #74b9ff;
    transform: translateY(2px);
    box-shadow: 
      0 2px 0 #2d3436,
      inset 0 2px 0 rgba(255, 255, 255, 0.2);
  }
  &:active {
    transform: translateY(4px);
    box-shadow: none;
  }
`;

const MonthYearButton = styled(motion.button)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #dfe6e9;
  padding: 0.75rem 1.25rem;
  background: #636e72;
  border: none;
  box-shadow: 
    0 4px 0 #2d3436,
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.875rem;
  &:hover {
    background: #74b9ff;
    transform: translateY(2px);
    box-shadow: 
      0 2px 0 #2d3436,
      inset 0 2px 0 rgba(255, 255, 255, 0.2);
  }
  &:active {
    transform: translateY(4px);
    box-shadow: none;
  }
`;

const Calendar = ({ initialDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
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
      <PixelPattern />
      <Header>
        <HeaderControls>
          <MonthButton whileTap={{ scale: 0.95 }} onClick={handlePrevMonth}>
            ←
          </MonthButton>
          <MonthYearButton>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</MonthYearButton>
          <MonthButton whileTap={{ scale: 0.95 }} onClick={handleNextMonth}>
            →
          </MonthButton>
        </HeaderControls>
      </Header>
    </CalendarContainer>
  );
};

export default Calendar;
