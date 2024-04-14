import React, { useEffect, useRef, useState } from "react";
import { AiFillProject } from "react-icons/ai";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { IoIosNotificationsOutline, IoMdAdd } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import { ParseProjectsToSelectBoxOptions } from "../../helper/SelectBoxParseOption";
import { useTheme } from "../../hooks/ThemeContext";
import Logo from "../../images/Logo";
import DefaultAvatar from "../../images/default_avatar.png";
import notificationDatas from "../../mock/notification";
import Projects from "../../mock/projects";
import { userLogin } from "../../mock/user";
import NotificationModel from "../../models/Notification/NoticationModel";
import ProjectListModel from "../../models/ProjectModel/ProjectListModel";
import LeftMenu from "../LeftMenu/LeftMenu";
import NotificationBox from "../NotificationBox/NotificationBox";
import SearchBox from "../SearchBox/SearchBox";
import SelectBox from "../SelectBox/SelectBox";
import ShareModal from "../ShareModal/ShareModal";
import "./header.css";

function Header() {
    const [projects, setProjects] = useState<ProjectListModel[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectListModel>();

    const [user, setUser] = useState<UserGetByTokenModel>();

    const [notifications, setNotifications] = useState<NotificationModel[]>([]);
    const [unreadNotifications, setUnreadNotifications] = useState<
        NotificationModel[]
    >([]);
    const [isShowNotification, setShowNotification] = useState(false);
    const [isShowMenuUser, setShowMenuUser] = useState(false);
    const [isShowLeftMenu, setShowLeftMenu] = useState(false);
    const [isShowShare, setShowShare] = useState(false);

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
        const projectSlug = localStorage.getItem("project");
        if (projectSlug) {
            const project = Projects.find(
                (project) => project.slug === projectSlug
            );
            if (project) setSelectedProject(project);
            else {
                setSelectedProject(Projects[0]);
                localStorage.setItem("project", Projects[0].slug);
            }
        } else {
            setSelectedProject(Projects[0]);
            localStorage.setItem("project", Projects[0].slug);
        }
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

    const onChangeProject = (projectId: string) => {
        const project = projects.find((project) => project.id === projectId);
        if (project) {
            setSelectedProject(project);
            localStorage.setItem("project", project.slug);
        }
    };

    const onSearch = (searchText: string) => {
        console.log(searchText);
    };

    return (
        <div className={`header ${theme}`}>
            <div className='header-container'>
                <div className='header-left'>
                    <div
                        className='header-menu'
                        onClick={() => {
                            setShowLeftMenu(true);
                        }}
                    >
                        <IoMenu />
                    </div>
                    <div className='header-logo'>
                        {/* <img src={Logo} alt='...' /> */}
                        <Logo />
                    </div>
                    {projects.length > 0 && (
                        <div className='header-projects'>
                            <SelectBox
                                options={ParseProjectsToSelectBoxOptions(
                                    projects
                                )}
                                onSelect={onChangeProject}
                                selectedValue={selectedProject?.id}
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
                            <div className='header-share'>
                                <PiShareFat
                                    onClick={() => {
                                        setShowShare(true);
                                    }}
                                    title='Share'
                                />
                                {isShowShare && (
                                    <ShareModal setShowModal={setShowShare} />
                                )}
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
            {selectedProject && (
                <div className='header-menu'>
                    <LeftMenu
                        project={selectedProject}
                        show={isShowLeftMenu}
                        setShow={setShowLeftMenu}
                    />
                </div>
            )}
        </div>
    );
}

export default React.memo(Header);
