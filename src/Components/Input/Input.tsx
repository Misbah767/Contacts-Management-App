"use client";

import React from "react";
import styled from "styled-components";

interface InputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  width?: string;
  inputClassName?: string;
  containerClassName?: string;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  icon,
  width = "600px",
  inputClassName = "",
  containerClassName = "",
  errorMessage,
}) => {
  // Prevent flicker by rendering only after first mount
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!mounted) {
    // render invisible container to keep layout stable
    return (
      <div
        style={{
          height: "70px",
          width: width,
          margin: "0 auto",
          borderRadius: "1000px",
          background: "linear-gradient(135deg, rgb(179, 208, 253) 0%, rgb(164, 202, 248) 100%)",
          opacity: 0,
        }}
      />
    );
  }

  return (
    <StyledWrapper width={width} className={containerClassName} $hasError={!!errorMessage}>
      <div className="div">
        <div className="container">
          <div className={`search-container ${errorMessage ? "error" : ""}`}>
            <input
              type="text"
              className={`input ${inputClassName}`}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              aria-label={placeholder}
            />
            {icon && <div className="icon-container">{icon}</div>}
          </div>
        </div>
        {errorMessage && <div className="error-text">{errorMessage}</div>}
      </div>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div<{ width: string; $hasError: boolean }>`
  .container {
    position: relative;
    max-width: ${(props) => props.width};
    width: 600px;
    margin: 0 auto;
    padding: 10px;
    display: grid;
    place-content: center;
    background: linear-gradient(135deg, rgb(179, 208, 253) 0%, rgb(164, 202, 248) 100%);
    border-radius: 1000px;
    z-index: 0;
  }

  .search-container {
    position: relative;
    width: 580px;
    border-radius: 50px;
    background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
    padding: 5px 15px;
    display: flex;
    align-items: center;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  /* Error state border */
  .search-container.error {
    border: 0.5px solid #fc6b72;
  }

  .input {
    flex: 1;
    padding: 12px 15px;
    border: none;
    font-size: 18px;
    border-radius: 50px;
    background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
    color: #0f172a;
  }

  .input::placeholder {
    color: #9ebcd9;
  }

  .input:focus {
    outline: none;
  }

  .icon-container {
    width: 45px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
    flex-shrink: 0;
    border-left: 1px solid #ffffff;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .icon-container svg {
    width: 70%;
    height: 70%;
    fill: white;
  }

  .error-text {
    margin-top: 5px;
    font-size: 13px;
    color: #fc6a71;
    text-align: left;
    padding-left: 35px;
  }

  @media (max-width: 1024px) {
    .container {
      width: 400px;
    }
    .search-container {
      width: 380px;
    }
  }

  @media (max-width: 768px) {
    .container {
      width: 100%;
    }
    .search-container {
      width: 380p;
    }
  }
`;

export default Input;
