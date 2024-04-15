import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import "./selectBox.css";
import { useTheme } from "../../hooks/ThemeContext";

export interface SelectBoxOption {
    name: string;
    value: any;
}

interface SelectBoxProps {
    selectedValue?: any;
    options: SelectBoxOption[];
    onSelect: (value: any) => void;
    width?: number;
    small?: boolean;
}

function SelectBox({
    selectedValue,
    options,
    onSelect,
    width,
    small,
}: SelectBoxProps) {
    const [isOpen, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectBoxOption>(
        () => {
            if (selectedValue) {
                let selected = options.find(
                    (option) => option.value === selectedValue
                );
                if (selected) return selected;
                else return options[0];
            }
            return options[0];
        }
    );
    const selectBoxRef = useRef<HTMLDivElement>(null);

    const { theme } = useTheme();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                selectBoxRef.current &&
                !selectBoxRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleSelect = (option: SelectBoxOption) => {
        setSelectedOption(option);
        onSelect(option.value);
        setOpen(false);
    };

    return (
        <div
            style={{ width: `${width}px` }}
            className={`selectBox ${theme} ${small ? "small" : ""}`}
            ref={selectBoxRef}
        >
            <div
                className={`selectBox-icon ${isOpen ? "open" : ""}`}
                onClick={() => {
                    setOpen((prev) => !prev);
                }}
            >
                <FaAngleDown />
            </div>
            <div
                className='selectBox-header'
                onClick={() => {
                    setOpen((prev) => !prev);
                }}
            >
                {selectedOption.name}
            </div>
            {isOpen && (
                <div className='selectBox-options'>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`selectBox-options-item ${
                                option.value === selectedOption.value
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() => {
                                handleSelect(option);
                            }}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SelectBox;
