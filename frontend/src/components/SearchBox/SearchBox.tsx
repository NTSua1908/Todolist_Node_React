import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useTheme } from "../../hooks/ThemeContext";
import "./searchBox.css";

interface SearchBoxProps {
  placeHolder: string;
  onSearch: (text: string) => void;
}

function SearchBox({ onSearch, placeHolder }: SearchBoxProps) {
  const [text, setText] = useState("");
  const { theme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const handlePressEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSearch(text);
      }
    };

    document.addEventListener("keydown", handlePressEnter);
    return () => {
      document.removeEventListener("keydown", handlePressEnter);
    };
  }, [text]);

  return (
    <div className={`searchBox ${theme}`}>
      <input
        type='text'
        className='searchBox-input'
        onChange={handleChange}
        placeholder={placeHolder}
      />
      <div
        className='searchBox-button'
        onClick={() => {
          onSearch(text);
        }}
      >
        <CiSearch />
      </div>
    </div>
  );
}

export default SearchBox;
