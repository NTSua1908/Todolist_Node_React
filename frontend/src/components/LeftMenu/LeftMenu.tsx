import React, { useEffect, useRef, useState } from "react";
import "./leftMenu.css";
import { MdClose } from "react-icons/md";
import Logo from "../../images/Logo";
import { userLogin } from "../../mock/user";
import { FaAngleLeft, FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "../../hooks/ThemeContext";
import { FaUser } from "react-icons/fa";
import { TfiLayoutColumn3Alt } from "react-icons/tfi";
import { MdLabelImportant } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoMoon, IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import ToggleButton from "../ToggleButton/ToggleButton";
import ProjectListModel from "../../models/ProjectModel/ProjectListModel";
import { IoMdSunny } from "react-icons/io";
import { useFetcher } from "react-router-dom";

interface LeftMenuProps {
    project: ProjectListModel;
    show?: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function LeftMenu({ project, show, setShow }: LeftMenuProps) {
    const { theme, toggleTheme } = useTheme();
    const menuRef = useRef<HTMLDivElement>(null);

    const handleChangeTheme = (isCheck: boolean) => {
        toggleTheme();
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className={`leftMenu ${theme} ${show ? "show" : ""}`}
            ref={menuRef}
        >
            <div className='leftMenu-header'>
                <div className='leftMenu-logo'>
                    <Logo />
                </div>
                <div
                    className='leftMenu-button'
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    <FaAngleLeft />
                </div>
            </div>
            <div className='leftMenu-content'>
                <div className='leftMenu-top'>
                    <div className='leftMenu-item'>
                        <span className='leftMenu-item-icon'>
                            <FaUsers />
                        </span>
                        Members
                    </div>
                    <div className='leftMenu-item'>
                        <span className='leftMenu-item-icon'>
                            <TfiLayoutColumn3Alt />
                        </span>
                        Stages
                    </div>
                    <div className='leftMenu-item'>
                        <span className='leftMenu-item-icon'>
                            <MdLabelImportant />
                        </span>
                        Labels
                    </div>
                </div>
                <div className='leftMenu-bottom'>
                    <div className='leftMenu-item'>
                        <span className='leftMenu-item-icon'>
                            <FaUser />
                        </span>
                        Profile
                    </div>
                    <div className='leftMenu-item'>
                        <span className='leftMenu-item-icon'>
                            <FaSignOutAlt />
                        </span>
                        Sign out
                    </div>
                    <div className='leftMenu-theme'>
                        <div className='leftMenu-theme-label'>
                            <span className='leftMenu-item-icon'>
                                {theme === "dark" ? <IoMoon /> : <IoMdSunny />}
                            </span>
                            Theme
                        </div>
                        <ToggleButton
                            labelOn='Light'
                            lableOff='Dark'
                            onChange={handleChangeTheme}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftMenu;
