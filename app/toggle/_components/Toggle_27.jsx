"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Toggle = ({ defaultChecked = false, onChange }) => {
  const [mounted, setMounted] = useState(false);
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  if (!mounted) return null;

  return (
    <StyledWrapper isChecked={isChecked}>
      <input
        type="checkbox"
        id="vinyl-toggle"
        checked={isChecked}
        onChange={handleToggle}
        className="toggle-input"
      />
      <label htmlFor="vinyl-toggle" className="toggle-label">
        <div className="record-player">
          <div className="turntable">
            <div className="record">
              <div className="label"></div>
              <div className="grooves"></div>
            </div>
            <div className="spindle"></div>
          </div>
          <div className="tonearm">
            <div className="arm"></div>
            <div className="head"></div>
            <div className="counterweight"></div>
          </div>
          <div className="status-light"></div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .toggle-input {
    display: none;
  }

  .toggle-label {
    position: relative;
    display: block;
    width: 120px;
    height: 120px;
    cursor: pointer;
  }

  .record-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #2c3e50, #34495e);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 
      0 4px 8px rgba(0, 0, 0, 0.3),
      inset 0 2px 4px rgba(255, 255, 255, 0.1);
    padding: 10px;
  }

  .turntable {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 10px auto;
  }

  .record {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    border-radius: 50%;
    transform: rotate(${props => (props.isChecked ? '360deg' : '0deg')});
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .label {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    background: ${props => (props.isChecked ? '#4ade80' : '#f87171')};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.3s ease;
  }

  .status-light {
    position: absolute;
    bottom: 10px;
    left: 50%;
    width: 8px;
    height: 8px;
    background: ${props => (props.isChecked ? '#4ade80' : '#f87171')};
    border-radius: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 8px ${props => (props.isChecked ? 'rgba(74, 222, 128, 0.5)' : 'rgba(248, 113, 113, 0.5)')};
    transition: all 0.3s ease;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .toggle-input:checked + .toggle-label .record {
    animation: spin 2s linear infinite;
  }
`;

export default Toggle;