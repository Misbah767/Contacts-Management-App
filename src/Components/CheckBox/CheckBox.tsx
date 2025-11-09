"use client";

import React from "react";
import styled from "styled-components";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, className }) => {
  const id = `cbx-${Math.random().toString(36).substr(2, 9)}`; // unique id

  return (
    <StyledWrapper className={className}>
      <div className="checkbox-wrapper">
        <div className="cbx">
          <input type="checkbox" id={id} checked={checked} onChange={onChange} />
          <label htmlFor={id} />
          <svg fill="none" viewBox="0 0 15 14" height={14} width={15}>
            <path d="M2 8.36364L6.23077 12L13 2" />
          </svg>
        </div>

        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur result="blur" stdDeviation={4} in="SourceGraphic" />
              <feColorMatrix
                result="goo"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                mode="matrix"
                in="blur"
              />
              <feBlend in2="goo" in="SourceGraphic" />
            </filter>
          </defs>
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .checkbox-wrapper {
    position: relative;
  }

  .checkbox-wrapper > svg {
    position: absolute;
    top: -130%;
    left: -170%;
    width: 110px;
    pointer-events: none;
  }

  .checkbox-wrapper * {
    box-sizing: border-box;
  }

  .checkbox-wrapper input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    margin: 0;
  }

  .checkbox-wrapper input[type="checkbox"]:focus {
    outline: 0;
  }

  .cbx {
    width: 24px;
    height: 24px;
    position: relative;
  }

  .cbx input {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border: 2px solid #bfbfc0;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .cbx label {
    width: 24px;
    height: 24px;
    background: none;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .cbx svg {
    position: absolute;
    top: 5px;
    left: 4px;
    z-index: 1;
    pointer-events: none;
  }

  .cbx svg path {
    stroke: #fff;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 19;
    stroke-dashoffset: 19;
    transition: stroke-dashoffset 0.3s ease;
    transition-delay: 0.2s;
  }

  .cbx input:checked {
    border-color: #0084d1;
    background-color: #0084d1;
  }

  .cbx input:checked + label + svg path {
    stroke-dashoffset: 0;
  }

  /* Splash animation */
  .cbx input:checked + label {
    animation: splash 0.6s ease forwards;
  }

  @keyframes splash {
    40% {
      background: #0084d1;
      box-shadow:
        0 -18px 0 -8px #0084d1,
        16px -8px 0 -8px #0084d1,
        16px 8px 0 -8px #0084d1,
        0 18px 0 -8px #0084d1,
        -16px 8px 0 -8px #0084d1,
        -16px -8px 0 -8px #0084d1;
    }
    100% {
      background: #0084d1;
      box-shadow:
        0 -36px 0 -10px transparent,
        32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent,
        0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent,
        -32px -16px 0 -10px transparent;
    }
  }
`;

export default Checkbox;
