import React from "react";
import "./percentage.css";
import { useTheme } from "../../contexts/ThemeContext";

interface PercentageProps {
  percent: number;
  color: string;
}

function Percentage({ percent, color }: PercentageProps) {
  const { theme } = useTheme();

  return (
    <div className={`percentage ${theme}`}>
      <div className="percentage-circle">
        <svg viewBox="0 0 36 36">
          <path
            style={{ stroke: color }}
            strokeDasharray={`${percent * 100}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>
      <div className="percentage-number">{(percent * 100).toFixed()}%</div>
    </div>
  );
}

export default Percentage;
