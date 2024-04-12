import React, { useEffect, useRef, useState } from "react";
import { AiFillProject } from "react-icons/ai";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { IoIosNotificationsOutline, IoMdAdd } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import { ParseProjectsToSelectBoxOptions } from "../../helper/SelectBoxParseOption";
import { useTheme } from "../../hooks/ThemeContext";
import DefaultAvatar from "../../images/default_avatar.png";
import Logo from "../../images/logo.png";
import notificationDatas from "../../mock/notification";
import Projects from "../../mock/projects";
import userLogin from "../../mock/user";
import NotificationModel from "../../models/Notification/NoticationModel";
import ProjectListModel from "../../models/ProjectModel/ProjectListModel";
import NotificationBox from "../NotificationBox/NotificationBox";
import SearchBox from "../SearchBox/SearchBox";
import SelectBox from "../SelectBox/SelectBox";
import "./header.css";

function Header() {
    const [projects, setProjects] = useState<ProjectListModel[]>([]);

    const [user, setUser] = useState<UserGetByTokenModel>();

    const [notifications, setNotifications] = useState<NotificationModel[]>([]);
    const [unreadNotifications, setUnreadNotifications] = useState<
        NotificationModel[]
    >([]);
    const [isShowNotification, setShowNotification] = useState(false);
    const [isShowMenuUser, setShowMenuUser] = useState(false);

    const { theme } = useTheme();
    const notificationRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        //get data
        getProjects();
        getUser();
        getNotifications();
        getUnreadNotifications();

        // Mouse event
        const handleClickOutside = (e: MouseEvent) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(e.target as Node)
            ) {
                setShowNotification(false);
            }

            if (
                userRef.current &&
                !userRef.current.contains(e.target as Node)
            ) {
                setShowMenuUser(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getProjects = () => {
        //fetch API
        setProjects(Projects);
    };

    const getUser = () => {
        setUser(userLogin);
    };

    const getNotifications = () => {
        setNotifications(notificationDatas);
    };

    const getUnreadNotifications = () => {
        setUnreadNotifications(notificationDatas);
    };

    const onChangeProject = (projectId: string) => {};

    const onSearch = (searchText: string) => {
        console.log(searchText);
    };

    return (
        <div className={`header ${theme}`}>
            <div className='header-container'>
                <div className='header-left'>
                    <div className='header-menu'>
                        <IoMenu />
                    </div>
                    <div className='header-logo'>
                        <img src={Logo} alt='...' />
                    </div>
                    {projects.length > 0 && (
                        <div className='header-projects'>
                            <SelectBox
                                options={ParseProjectsToSelectBoxOptions(
                                    projects
                                )}
                                onSelect={onChangeProject}
                            />
                        </div>
                    )}
                </div>
                <div className='header-right'>
                    <div className='header-search'>
                        <SearchBox
                            onSearch={onSearch}
                            placeHolder='Search tasks'
                        />
                    </div>
                    {user && (
                        <>
                            <div className='header-add' title='Add new stage'>
                                <IoMdAdd />
                            </div>
                            <div
                                className='header-notification'
                                ref={notificationRef}
                            >
                                <IoIosNotificationsOutline
                                    onClick={() => {
                                        setShowNotification((prev) => !prev);
                                    }}
                                />
                                {isShowNotification && (
                                    <div className='header-notification-box'>
                                        <NotificationBox
                                            notifications={notifications}
                                            unreadNotifications={
                                                unreadNotifications
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='header-share' title='Share'>
                                <PiShareFat />
                            </div>

                            <div className='header-avatar' ref={userRef}>
                                <img
                                    src={user.avatar ?? DefaultAvatar}
                                    alt={user.username}
                                    onClick={() => {
                                        setShowMenuUser((prev) => !prev);
                                    }}
                                />
                                {isShowMenuUser && (
                                    <div className='header-avatar-menu'>
                                        <div className='header-avatar-item'>
                                            <span className='header-avatar-item-icon'>
                                                <FaUserEdit />
                                            </span>
                                            Profile
                                        </div>
                                        <div className='header-avatar-item'>
                                            <span className='header-avatar-item-icon'>
                                                <AiFillProject />
                                            </span>
                                            Projects
                                        </div>
                                        <div className='header-avatar-item signout'>
                                            <span className='header-avatar-item-icon'>
                                                <FaSignOutAlt />
                                            </span>
                                            Sign out
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.memo(Header);
