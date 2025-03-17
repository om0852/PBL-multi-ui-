"use client";
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const inkSpread = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const paperRustle = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0.5deg);
  }
  75% {
    transform: rotate(-0.5deg);
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 1rem 0;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  background: #f4e4bc;
  border: none;
  border-radius: 4px;
  padding: 2px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${paperRustle} 5s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
    opacity: 0.1;
    mix-blend-mode: multiply;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(0, 0, 0, 0.02) 50%,
      transparent 100%
    );
    pointer-events: none;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 16px;
  font-size: 18px;
  color: #2c1810;
  background: transparent;
  border: none;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
  position: relative;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(44, 24, 16, 0.4);
    font-style: italic;
  }

  &:disabled {
    color: rgba(44, 24, 16, 0.3);
    cursor: not-allowed;
  }

  &::selection {
    background: rgba(44, 24, 16, 0.1);
  }
`;

const Label = styled.label`
  position: absolute;
  left: 16px;
  top: -28px;
  font-size: 16px;
  color: #2c1810;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  opacity: 0.8;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 1px;
    background: rgba(44, 24, 16, 0.3);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(44, 24, 16, 0.5);
  transition: all 0.3s ease;
  z-index: 1;
`;

const InkBlot = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, rgba(44, 24, 16, 0.1) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: ${inkSpread} 2s ease-out;
  opacity: 0;
`;

const ErrorMessage = styled.div`
  color: #8b0000;
  font-size: 14px;
  margin-top: 8px;
  font-family: 'Playfair Display', serif;
  padding-left: 16px;
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '✗';
    font-size: 16px;
    color: #8b0000;
  }
`;

const VintagePaperInput = ({ label, placeholder, type = 'text', value = '', onChange, error, disabled, required, icon, className }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [showInkBlot, setShowInkBlot] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
    setShowInkBlot(true);
    setTimeout(() => setShowInkBlot(false), 2000);
  };

  return (
    <Container className={className}>
      {label && <Label>{label}{required && ' *'}</Label>}
      <InputWrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {showInkBlot && <InkBlot />}
        <StyledInput type={type} value={localValue} onChange={e => onChange(e.target.value)} onFocus={handleFocus} onBlur={() => setIsFocused(false)} placeholder={placeholder} disabled={disabled} required={required} />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default VintagePaperInput;
