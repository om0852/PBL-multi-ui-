"use client";
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 1rem 0;
  font-family: 'Courier New', Courier, monospace;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  background: #1a1b26;
  border: 1px solid ${({ $hasError, $isSuccess }) => {
    if ($hasError) return '#f7768e';
    if ($isSuccess) return '#9ece6a';
    return '#414868';
  }};
  border-radius: 4px;
  padding: 8px;

  &::before {
    content: '>';
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ $hasError, $isSuccess }) => {
      if ($hasError) return '#f7768e';
      if ($isSuccess) return '#9ece6a';
      return '#7aa2f7';
    }};
    font-weight: bold;
  }

  ${({ $isFocused }) => $isFocused && `
    border-color: #7aa2f7;
    box-shadow: 0 0 0 2px rgba(122, 162, 247, 0.2);
  `}
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  padding-left: ${({ $hasIcon }) => ($hasIcon ? '56px' : '28px')};
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  color: #a9b1d6;
  background: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #565f89;
  }

  &:disabled {
    color: #565f89;
    cursor: not-allowed;
  }
`;

const Cursor = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 16px;
  background-color: #7aa2f7;
  animation: ${blink} 1s step-end infinite;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${({ $hasError, $isFocused }) => {
    if ($hasError) return '#f7768e';
    if ($isFocused) return '#7aa2f7';
    return '#a9b1d6';
  }};
  font-size: 14px;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 28px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ $isFocused }) => ($isFocused ? '#7aa2f7' : '#565f89')};
  transition: color 0.3s ease;
`;

const ErrorMessage = styled.div`
  color: #f7768e;
  font-size: 14px;
  margin-top: 8px;
  padding-left: 4px;
`;

const TerminalInput = ({
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
        <Label $isFocused={isFocused} $hasValue={!!localValue} $hasError={!!error}>
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
        {isFocused && <Cursor />}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default TerminalInput;