import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import "./selectBox.css";
import { useTheme } from "../../hooks/ThemeContext";

export interface SelectBoxOption {
  name: string;
  value: string;
}

interface SelectBoxProps {
  options: SelectBoxOption[];
  onSelect: (value: string) => void;
}

function SelectBox({ options, onSelect }: SelectBoxProps) {
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectBoxOption>(
    options[0]
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
    <div className={`selectBox ${theme}`} ref={selectBoxRef}>
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
                option.value === selectedOption.value ? "selected" : ""
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
