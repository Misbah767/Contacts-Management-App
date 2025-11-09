"use client";

import React from "react";
import styled from "styled-components";

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <StyledWrapper>
      <div className="loader-container">
        {text && <div className="loader-text">{text}</div>}
        <section className="dots-container">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </section>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .loader-text {
    font-size: 20px;
    font-weight: 600;
    color: #6790eb;
    text-align: center;
  }

  .dots-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #b3d4fc;
    animation: pulse 1.5s infinite ease-in-out;
  }

  .dot:nth-child(1) {
    animation-delay: -0.3s;
  }
  .dot:nth-child(2) {
    animation-delay: -0.1s;
  }
  .dot:nth-child(3) {
    animation-delay: 0.1s;
  }
  .dot:nth-child(4) {
    animation-delay: 0.3s;
  }
  .dot:nth-child(5) {
    animation-delay: 0.5s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      background-color: #b3d4fc;
      box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }
    50% {
      transform: scale(1.2);
      background-color: #6793fb;
      box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
    }
    100% {
      transform: scale(0.8);
      background-color: #b3d4fc;
      box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }
  }
`;

export default Loader;
