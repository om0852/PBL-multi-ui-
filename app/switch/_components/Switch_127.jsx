'use client';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .crystal-switch {
    --primary: #00ffff;
    --secondary: #00cccc;
    --accent: #ffffff;
    --dark: #0a1a1a;
    --gap: 5px;
    --width: 50px;

    position: relative;
    display: inline-block;
    width: calc((var(--width) + var(--gap)) * 2);
    height: 50px;
    cursor: pointer;
  }

  .crystal-switch input {
    display: none;
  }

  .crystal-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    background-color: var(--dark);
    border: 1px solid var(--primary);
    border-radius: 9999px;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }

  .facets {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .facet {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    background: linear-gradient(
      calc(var(--index) * 60deg),
      var(--primary) 0%,
      transparent 60%
    );
    transform: translate(-50%, -50%) rotate(calc(var(--index) * 60deg));
    opacity: 0.1;
    animation: shimmer 3s ease-in-out calc(var(--delay)) infinite;
  }

  .core {
    position: relative;
    width: var(--width);
    height: 100%;
    background-image: radial-gradient(
      circle at center,
      var(--accent) 0%,
      var(--primary) 100%
    );
    border: 1px solid var(--primary);
    border-radius: 9999px;
    transition: all 0.3s ease-in-out;
    transform: ${({ $checked }) => $checked ? 'translateX(calc(100% + 10px))' : 'translateX(0)'};
  }

  .gem {
    position: relative;
    z-index: 2;
    width: 1.1rem;
    height: 1.1rem;
    fill: var(--accent);
    margin: 1rem auto;
    display: block;
    filter: drop-shadow(0 0 4px var(--primary));
    animation: pulse 2s ease-in-out infinite;
  }

  .light {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 140%;
    height: 140%;
    background: radial-gradient(
      circle at center,
      var(--accent) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    opacity: 0.3;
    mix-blend-mode: screen;
  }

  @keyframes shimmer {
    0%, 100% {
      opacity: 0.1;
      transform: translate(-50%, -50%) rotate(calc(var(--index) * 60deg));
    }
    50% {
      opacity: 0.3;
      transform: translate(-50%, -50%) rotate(calc(var(--index) * 60deg + 30deg));
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      filter: drop-shadow(0 0 4px var(--primary));
    }
    50% {
      transform: scale(1.1);
      filter: drop-shadow(0 0 8px var(--primary));
    }
  }

  input:checked ~ .crystal-container {
    border-color: var(--accent);
    box-shadow: 0 0 20px var(--primary);

    .core {
      background-image: radial-gradient(
        circle at center,
        var(--accent) 0%,
        var(--secondary) 100%
      );
      border-color: var(--accent);
    }

    .facet {
      animation-duration: 1.5s;
      opacity: 0.2;
    }

    .gem {
      fill: var(--primary);
    }

    .light {
      opacity: 0.5;
      width: 180%;
      height: 180%;
    }
  }
`;

const Switch_127 = ({ checked = false, onChange }) => {
  return (
    <StyledWrapper $checked={checked}>
      <label className="crystal-switch">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <div className="crystal-container">
          <div className="facets">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="facet"
                style={{
                  '--index': i,
                  '--delay': `${i * 0.2}s`
                }}
              />
            ))}
          </div>
          <div className="core">
            <svg className="gem" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.96233 28.61C1.36043 29.0081 1.96007 29.1255 2.47555 28.8971L10.4256 25.3552C13.2236 24.11 16.4254 24.1425 19.2107 25.4401L27.4152 29.2747C27.476 29.3044 27.5418 29.3023 27.6047 29.32C27.6563 29.3348 27.7079 29.3497 27.761 29.3574C27.843 29.3687 27.9194 29.3758 28 29.3688C28.1273 29.3617 28.2531 29.3405 28.3726 29.2945C28.4447 29.262 28.5162 29.2287 28.5749 29.1842C28.6399 29.1446 28.6993 29.0994 28.7509 29.0477L28.9008 28.8582C28.9468 28.7995 28.9793 28.7274 29.0112 28.656C29.0599 28.5322 29.0811 28.4036 29.0882 28.2734C29.0939 28.1957 29.0868 28.1207 29.0769 28.0415C29.0705 27.9955 29.0585 27.9524 29.0472 27.9072C29.0295 27.8343 29.0302 27.7601 28.9984 27.6901L25.1638 19.4855C23.8592 16.7073 23.8273 13.5048 25.0726 10.7068L28.6145 2.75679C28.8429 2.24131 28.7318 1.63531 28.3337 1.2372C27.9165 0.820011 27.271 0.721743 26.7491 0.9961L19.8357 4.59596C16.8418 6.15442 13.2879 6.18696 10.2615 4.70062L1.80308 0.520214C1.7055 0.474959 1.60722 0.441742 1.50964 0.421943C1.44459 0.409215 1.37882 0.395769 1.3074 0.402133C1.14406 0.395769 0.981436 0.428275 0.818095 0.499692C0.77284 0.519491 0.719805 0.545671 0.67455 0.578198C0.596061 0.617088 0.524653 0.675786 0.4596 0.74084C0.394546 0.805894 0.335843 0.877306 0.296245 0.956502C0.263718 1.00176 0.237561 1.05477 0.217762 1.10003C0.152708 1.24286 0.126545 1.40058 0.120181 1.54978C0.120181 1.61483 0.126527 1.6735 0.132891 1.73219C0.15269 1.85664 0.178881 1.97332 0.237571 2.08434L4.41798 10.5427C5.91139 13.5621 5.8725 17.1238 4.3204 20.1099L0.720514 27.0233C0.440499 27.5536 0.545137 28.1928 0.96233 28.61Z" />
            </svg>
            <div className="light"></div>
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
}

export default Switch_127; 