"use client";
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const starTwinkle = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.7);
  }
`;

const nebulaPulse = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 0.8;
  }
`;

const meteorShower = keyframes`
  0% {
    transform: translate(0, 0) rotate(315deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(-200px, 200px) rotate(315deg);
    opacity: 0;
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
  background: linear-gradient(135deg, #1a1b4b 0%, #4c0c69 100%);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 2px;
  transition: all 0.3s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff);
    background-size: 200% 100%;
    animation: ${props => (props.$isFocused ? css`${nebulaPulse} 10s linear infinite` : 'none')};
    opacity: ${props => (props.$isFocused ? 0.5 : 0.2)};
    z-index: -1;
    border-radius: 12px;
  }
`;

const StarField = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at center, white 0.5px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  pointer-events: none;
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: white;
  border-radius: 50%;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  animation: ${starTwinkle} ${props => 1 + props.$delay}s ease-in-out infinite;
  box-shadow: 0 0 ${props => props.$size * 2}px white;
`;

const Meteor = styled.div`
  position: absolute;
  width: 2px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, white);
  right: -50px;
  top: ${props => props.$delay * 10}%;
  animation: ${meteorShower} ${props => 2 + props.$delay}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 16px;
  padding-left: ${props => (props.$hasIcon ? '44px' : '16px')};
  font-size: 16px;
  color: #fff;
  background: transparent;
  border: none;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    transition: color 0.3s ease;
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.3);
    cursor: not-allowed;
  }

  &::selection {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Label = styled.label`
  position: absolute;
  left: ${props => (props.$hasIcon ? '44px' : '16px')};
  top: -24px;
  font-size: 14px;
  color: ${props => (props.$isFocused ? '#00ffff' : 'rgba(255, 255, 255, 0.7)')};
  font-weight: 500;
  transition: all 0.3s ease;
  text-shadow: ${props => (props.$isFocused ? '0 0 10px rgba(0, 255, 255, 0.5)' : 'none')};
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => (props.$isFocused ? '#00ffff' : 'rgba(255, 255, 255, 0.5)')};
  transition: all 0.3s ease;
  z-index: 1;
`;

const ErrorMessage = styled.div`
  color: #ff69b4;
  font-size: 12px;
  margin-top: 8px;
  padding-left: 16px;
  text-shadow: 0 0 10px rgba(255, 105, 180, 0.5);

  &::before {
    content: '★';
    color: #ff69b4;
  }
`;

const CosmicInput = ({ label, placeholder, type = 'text', value = '', onChange, error, success, disabled, required, icon, className }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = e => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Container className={className}>
      {label && <Label $isFocused={isFocused} $hasValue={!!localValue} $hasIcon={!!icon}>{label}{required && ' ★'}</Label>}
      <InputWrapper $isFocused={isFocused}>
        <StarField />
        {icon && <IconWrapper $isFocused={isFocused}>{icon}</IconWrapper>}
        <StyledInput type={type} value={localValue} onChange={handleChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={placeholder} disabled={disabled} required={required} $hasIcon={!!icon} />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default CosmicInput;