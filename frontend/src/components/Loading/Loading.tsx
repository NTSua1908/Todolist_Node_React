import React from "react";
import "./loading.css";
import { useTheme } from "../../contexts/ThemeContext";

interface LoadingProps {
  fullScreen?: boolean;
}

function Loading({ fullScreen }: LoadingProps) {
  const { theme } = useTheme();
  return (
    <div className={`loading ${fullScreen ? "fullScreen" : ""} ${theme}`}>
      <div className="loading-container">
        <div className="loading-wave"></div>
        <div className="loading-wave"></div>
        <div className="loading-wave"></div>
        <div className="loading-wave"></div>
        <div className="loading-wave"></div>
        <div className="loading-wave"></div>
        <div className="loading-wave"></div>
        <div className="loading-wave"></div>
        <div className="loading-wave"></div>
        <div className="loading-wave"></div>
      </div>
    </div>
  );
}

export default Loading;
