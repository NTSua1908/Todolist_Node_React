import React, { useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import "./checkBox.css";
import { useSearchParams } from "react-router-dom";

interface CheckBoxProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  label?: string;
  title?: string;
}

function CheckBox({ checked = false, onChange, label, title }: CheckBoxProps) {
  const [isCheck, setIsCheck] = useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck((prev) => !prev);
    if (onChange) onChange(e);
  };

  return (
    <label className="checkBox" title={title}>
      <input type="checkBox" onChange={handleChange} checked={isCheck} />
      <div className="checkBox-check">
        <FaRegCheckCircle />
      </div>
      <div className="checkBox-uncheck">
        <FaRegCircle />
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}

export default CheckBox;
