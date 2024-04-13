import React, { useEffect, useState } from "react";
import "./toggleButton.css";
import { useTheme } from "../../hooks/ThemeContext";

interface ToggleButtonProps {
    isChecked?: boolean;
    labelOn: string;
    lableOff: string;
    onChange: (isChecked: boolean) => void;
}

function ToggleButton({
    isChecked,
    labelOn,
    lableOff,
    onChange,
}: ToggleButtonProps) {
    const { theme } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
        console.log(e.target.checked);
    };

    return (
        <div className={`toggleButton ${theme}`}>
            <input
                type='checkbox'
                readOnly
                checked={isChecked}
                onChange={handleChange}
            />
            <div className='toggleButton-slider'>
                <div className='toggleButton-slider-label off'>{lableOff}</div>
                <div className='toggleButton-slider-thumb'></div>
                <div className='toggleButton-slider-label on'>{labelOn}</div>
            </div>
        </div>
    );
}

export default ToggleButton;
