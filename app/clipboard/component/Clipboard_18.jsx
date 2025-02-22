"use client"

import React from 'react';
import styled from 'styled-components';

const Clipboard = ({ text, onCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    onCopy?.();
  };

  return (
    <StyledWrapper>
      <button className="pill-clipboard" onClick={handleCopy}>
        <div className="pill-container">
          <div className="pill-text">{text}</div>
          <div className="pill-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" />
              <path d="M17.1 2H12.9C9.45001 2 8.05001 3.37 8.01001 6.75H11.1C15.3 6.75 17.25 8.7 17.25 12.9V15.99C20.63 15.95 22 14.55 22 11.1V6.9C22 3.4 20.6 2 17.1 2Z" />
            </svg>
          </div>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .pill-clipboard {
    --pill-bg: #4a4a4a;
    --pill-hover: #5a5a5a;
    --pill-text: #ffffff;
    
    position: relative;
    padding: 0.5em;
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
  }

  .pill-container {
    position: relative;
    padding: 0.6em 1.2em;
    background: var(--pill-bg);
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8em;
    transition: all 0.2s ease;
  }

  .pill-text {
    color: var(--pill-text);
    font-size: 0.9em;
  }

  .pill-icon {
    width: 1.1em;
    height: 1.1em;

    svg {
      width: 100%;
      height: 100%;
      fill: var(--pill-text);
    }
  }

  /* Hover Effects */
  .pill-clipboard:hover .pill-container {
    background: var(--pill-hover);
  }

  /* Active State */
  .pill-clipboard:active .pill-container {
    transform: scale(0.98);
  }
`;

export default Clipboard;
