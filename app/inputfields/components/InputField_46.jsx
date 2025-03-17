"use client";
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const neonPulse = keyframes`
  0%, 100% {
    text-shadow: 0 0 4px #fff,
                0 0 11px #fff,
                0 0 19px #fff,
                0 0 40px #f09,
                0 0 80px #f09;
  }
  50% {
    text-shadow: 0 0 4px #fff,
                0 0 8px #fff,
                0 0 15px #fff,
                0 0 30px #f09,
                0 0 60px #f09;
  }
`;

const borderGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 4px #fff,
                0 0 11px #fff,
                0 0 19px #fff,
                0 0 40px #f09,
                0 0 80px #f09;
  }
  50% {
    box-shadow: 0 0 4px #fff,
                0 0 8px #fff,
                0 0 15px #fff,
                0 0 30px #f09,
                0 0 60px #f09;
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
  background: #1a1a1a;
  border: 2px solid ${({ $hasError, $isSuccess, $isFocused }) =>
    $hasError ? '#ff2b2b' : $isSuccess ? '#00ff95' : $isFocused ? '#ff00ff' : '#666'};
  border-radius: 8px;
  padding: 2px;
  transition: all 0.3s ease;
  animation: ${({ $isFocused }) => ($isFocused ? css`${borderGlow} 1.5s ease-in-out infinite` : 'none')};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 16px;
  padding-left: ${({ $hasIcon }) => ($hasIcon ? '44px' : '16px')};
  font-size: 16px;
  color: #fff;
  background: transparent;
  border: none;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  position: absolute;
  left: ${({ $hasIcon }) => ($hasIcon ? '44px' : '16px')};
  top: -24px;
  font-size: 14px;
  color: ${({ $isFocused }) => ($isFocused ? '#ff00ff' : '#fff')};
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: ${({ $isFocused }) => ($isFocused ? css`${neonPulse} 1.5s ease-in-out infinite` : 'none')};
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ $isFocused }) => ($isFocused ? '#ff00ff' : 'rgba(255, 255, 255, 0.5)')};
  transition: all 0.3s ease;
  animation: ${({ $isFocused }) => ($isFocused ? css`${neonPulse} 1.5s ease-in-out infinite` : 'none')};
`;

const ErrorMessage = styled.div`
  color: #ff2b2b;
  font-size: 12px;
  margin-top: 8px;
  font-family: 'Orbitron', sans-serif;
  padding-left: 16px;
  letter-spacing: 1px;
  text-shadow: 0 0 8px rgba(255, 43, 43, 0.8);
  display: flex;
  align-items: center;
  gap: 8px;
  &::before {
    content: '⚠';
    font-size: 14px;
  }
`;

const NeonGlowInput = ({
  label,
  placeholder,
  type = 'text',
  value = '',
  onChange,
  error,
  success,
  disabled,
  required,
  icon,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Container className={className}>
      {label && (
        <Label $isFocused={isFocused} $hasValue={!!localValue} $hasIcon={!!icon}>
          {label}{required && ' *'}
        </Label>
      )}
      <InputWrapper $isFocused={isFocused} $hasError={!!error} $isSuccess={!!success}>
        {icon && <IconWrapper $isFocused={isFocused}>{icon}</IconWrapper>}
        <StyledInput
          type={type}
          value={localValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          $hasIcon={!!icon}
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default NeonGlowInput;
