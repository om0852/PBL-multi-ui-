"use client";
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
  padding: 2px;
  border-radius: 8px;
  background: linear-gradient(45deg, #845ef7, #5c7cfa, #339af0, #5c7cfa, #845ef7);
  background-size: 200% 200%;
  animation: ${gradientMove} 3s ease infinite;
  
  ${({ $isFocused, $hasError, $isSuccess }) => css`
    background: ${$hasError
      ? 'linear-gradient(45deg, #ff6b6b, #ff8787, #ff6b6b)'
      : $isSuccess
      ? 'linear-gradient(45deg, #69db7c, #8ce99a, #69db7c)'
      : 'linear-gradient(45deg, #845ef7, #5c7cfa, #339af0, #5c7cfa, #845ef7)'};
  `}

  &::before {
    content: '';
    position: absolute;
    inset: 1px;
    background: #ffffff;
    border-radius: 7px;
    transition: all 0.3s ease;
  }

  ${({ $isFocused }) =>
    $isFocused &&
    css`
      &::before {
        background: #fafafa;
      }
    `}
`;

const StyledInput = styled.input`
  position: relative;
  width: 100%;
  padding: 12px;
  padding-left: ${({ $hasIcon }) => ($hasIcon ? '40px' : '12px')};
  font-size: 16px;
  color: #495057;
  background: transparent;
  border: none;
  border-radius: 7px;
  font-family: 'Roboto', sans-serif;
  z-index: 1;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #adb5bd;
  }

  &:disabled {
    color: #ced4da;
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  position: absolute;
  left: ${({ $hasIcon }) => ($hasIcon ? '40px' : '12px')};
  top: -24px;
  font-size: 14px;
  color: #495057;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;

  ${({ $isFocused }) =>
    $isFocused &&
    css`
      color: #845ef7;
    `}
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ $isFocused }) => ($isFocused ? '#845ef7' : '#adb5bd')};
  transition: all 0.3s ease;
  z-index: 1;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 4px;
  font-family: 'Roboto', sans-serif;
  padding-left: 12px;
`;

const GradientBorderInput = ({
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

export default GradientBorderInput;
