import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/ThemeContext";
import "./autoComplete.css";
import Loading from "../Loading/Loading";

interface AutoCompleteProps {
    onSearch: (data: string) => void;
    dataSource: AutoCompleteItem[];
    onSelect: (data: AutoCompleteItem) => void;
}

export interface AutoCompleteItem {
    label: string;
    value: any;
}

function AutoComplete({ dataSource, onSearch, onSelect }: AutoCompleteProps) {
    const { theme } = useTheme();
    const [searchText, setSearchText] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [isShowOptions, setShowOptions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const componentRef = useRef<HTMLDivElement>(null);

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        if (searchText) {
            const timeOut = setTimeout(async () => {
                setShowOptions(true);
                setLoading(true);
                await onSearch(searchText);
                setLoading(false);
            }, 500);
            return () => clearTimeout(timeOut);
        }
    }, [searchText]);

    useEffect(() => {
        const handleClickOutsite = (e: MouseEvent) => {
            if (
                componentRef.current &&
                !componentRef.current.contains(e.target as Node)
            ) {
                setShowOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsite);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsite);
        };
    }, []);

    return (
        <div className={`autoComplete ${theme}`} ref={componentRef}>
            <input
                type='text'
                className='autoComplete-search'
                onChange={handleChangeSearch}
                ref={inputRef}
            />
            {isShowOptions && (
                <div className='autoComplete-list'>
                    {dataSource.length != 0 && (
                        <>
                            {!loading &&
                                dataSource.map((data, index) => (
                                    <div
                                        key={index}
                                        className='autoComplete-item'
                                        onClick={() => {
                                            onSelect(data);
                                            if (inputRef.current)
                                                inputRef.current.value =
                                                    data.label;
                                            setShowOptions(false);
                                        }}
                                    >
                                        {data.label}
                                    </div>
                                ))}
                        </>
                    )}

                    {loading && (
                        <div className='autoComplete-loading'>
                            <Loading />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AutoComplete;
