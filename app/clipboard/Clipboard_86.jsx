"use client";

import React from 'react';
import styled from 'styled-components';

const Clipboard = ({ text, onCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    if (onCopy) onCopy();
  };

  return (
    <StyledWrapper>
      <button className="ripple-neon-clipboard" onClick={handleCopy}>
        <div className="ripple-neon-container">
          <div className="electric-ripples">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="electric-ripple" style={{ '--i': i }}></div>
            ))}
          </div>
          <div className="content">
            <span>{text}</span>
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
  .ripple-neon-clipboard {
    --neon-primary: #ff00ff;
    --neon-secondary: #00ffff;
    --neon-glow: rgba(255, 0, 255, 0.5);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;
    width: 100%;
  }

  .ripple-neon-container {
    position: relative;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 8px;
    overflow: hidden;
  }

  .electric-ripples {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .electric-ripple {
    position: absolute;
    inset: -50%;
    border: 2px solid var(--neon-primary);
    border-radius: 45%;
    animation: electricRipple 6s linear infinite;
    animation-delay: calc(var(--i) * -2s);
  }

  @keyframes electricRipple {
    0% {
      transform: rotate(0deg);
      border-color: var(--neon-primary);
      box-shadow: 0 0 20px var(--neon-primary);
    }
    50% {
      border-color: var(--neon-secondary);
      box-shadow: 0 0 20px var(--neon-secondary);
    }
    100% {
      transform: rotate(360deg);
      border-color: var(--neon-primary);
      box-shadow: 0 0 20px var(--neon-primary);
    }
  }

  .content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
    padding: 0.8em 1.2em;
    background: transparent;
    border: 2px solid var(--neon-primary);
    border-radius: 8px;
    color: var(--neon-primary);
    font-size: 0.9em;
    z-index: 1;
    transition: all 0.3s ease;
    text-shadow: 0 0 8px var(--neon-glow);

    svg {
      width: 1.2em;
      height: 1.2em;
      fill: var(--neon-primary);
      filter: drop-shadow(0 0 8px var(--neon-glow));
      transition: all 0.3s ease;
    }
  }

  /* Hover Effects */
  .ripple-neon-clipboard:hover .electric-ripples {
    opacity: 1;
  }

  .ripple-neon-clipboard:hover .content {
    border-color: var(--neon-secondary);
    color: var(--neon-secondary);
    text-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
  }

  .ripple-neon-clipboard:hover svg {
    fill: var(--neon-secondary);
    filter: drop-shadow(0 0 12px rgba(0, 255, 255, 0.5));
    transform: rotate(360deg);
  }

  /* Active State */
  .ripple-neon-clipboard:active .content {
    transform: scale(0.98);
  }
`;

export default Clipboard;
