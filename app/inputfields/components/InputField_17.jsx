"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 1rem 0;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  ${({ $isFocused }) => $isFocused && `
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  `}

  ${({ $hasError }) => $hasError && `
    border-color: rgba(239, 68, 68, 0.4);
    box-shadow: 0 8px 32px 0 rgba(239, 68, 68, 0.2);
  `}

  ${({ $isSuccess }) => $isSuccess && `
    border-color: rgba(34, 197, 94, 0.4);
    box-shadow: 0 8px 32px 0 rgba(34, 197, 94, 0.2);
  `}
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-left: ${({ $hasIcon }) => ($hasIcon ? '40px' : '16px')};
  font-size: 16px;
  color: #fff;
  background: transparent;
  border: none;
  border-radius: 14px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 12px;
  top: -20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, ${({ $isFocused }) => ($isFocused ? '0.9' : '0.6')});
  transition: all 0.3s ease;
`;

const ErrorMessage = styled.div`
  color: rgba(239, 68, 68, 0.9);
  font-size: 14px;
  margin-top: 4px;
  padding-left: 12px;
`;

const GlassInput = ({
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
        <Label>
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

export default GlassInput;
