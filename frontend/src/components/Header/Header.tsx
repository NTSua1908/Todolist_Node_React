import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosNotificationsOutline, IoMdAdd } from "react-icons/io";
import { IoCheckmarkDoneOutline, IoMenu } from "react-icons/io5";
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
import SearchBox from "../SearchBox/SearchBox";
import SelectBox from "../SelectBox/SelectBox";
import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  const [projects, setProjects] = useState<ProjectListModel[]>([]);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [user, setUser] = useState<UserGetByTokenModel>();

  const { theme } = useTheme();

  useEffect(() => {
    getProjects();
    getUser();
    getNotifications();
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
                options={ParseProjectsToSelectBoxOptions(projects)}
                onSelect={onChangeProject}
              />
            </div>
          )}
        </div>
        <div className='header-right'>
          <div className='header-search'>
            <SearchBox onSearch={onSearch} placeHolder='Search tasks' />
          </div>
          {user && (
            <>
              <div className='header-add' title='Add new column'>
                <IoMdAdd />
              </div>
              <div className='header-notification'>
                <IoIosNotificationsOutline />
                <div className='header-notification-box'>
                  <NotificationBox
                    theme={theme}
                    notifications={notifications}
                  />
                </div>
              </div>
              <div className='header-share' title='Share'>
                <PiShareFat />
              </div>

              <div className='header-avatar'>
                <img src={user.avatar ?? DefaultAvatar} alt={user.username} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

interface NotificationBoxProps {
  theme: string;
  notifications: NotificationModel[];
}

//https://dribbble.com/shots/23664071-Notifications-window
const NotificationBox: React.FC<NotificationBoxProps> = ({
  notifications,
  theme,
}) => {
  const [selectedOption, setSelectedOption] = useState("all");

  return (
    <div className={`notificationBox ${theme}`}>
      <div className='notificationBox-header'>
        <h5 className='notificationBox-title'>Notifications</h5>
        <div className='notificationBox-mark'>
          <span className='notificationBox-mark-icon'>
            <IoCheckmarkDoneOutline />
          </span>
          Mark all as read
        </div>
      </div>
      <div className='notificationBox-options'>
        <div
          className={`notificationBox-options-button all ${
            selectedOption === "all" && "selected"
          }`}
          onClick={() => {
            setSelectedOption("all");
          }}
        >
          All notificaions
        </div>
        <div
          className={`notificationBox-options-button unread ${
            selectedOption === "unread" && "selected"
          }`}
          onClick={() => {
            setSelectedOption("unread");
          }}
        >
          Unread
        </div>
        <div className='notificationBox-options-button last'></div>
      </div>
      <div className='notificationBox-list'>
        {notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
};

interface NotificationItemProps {
  notification: NotificationModel;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const { theme } = useTheme();
  const [isShow, setShow] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef && !menuRef.current?.contains(e.target as Node))
        setShow(false);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='notificationBox-item'>
      <div className='notificationBox-item-left'>
        <img
          src={notification.sender.avatar ?? DefaultAvatar}
          alt={notification.sender.username}
        />
      </div>
      <div className='notificationBox-item-center'>
        <Link to={"/user/" + notification.sender.id}>
          @{notification.sender.username}
        </Link>{" "}
        {notification.content}{" "}
        <Link to={"/project-name/" + notification.taskIndex}>
          #{notification.taskIndex}
        </Link>
      </div>
      <div className='notificationBox-item-right' ref={menuRef}>
        <div
          className='notificationBox-item-right-icon'
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          <BsThreeDots />
        </div>
        {isShow && (
          <div className='notificationBox-item-menu'>
            <div className='notificationBox-item-menu-item'>Mark read</div>
            <div className='notificationBox-item-menu-item'>Delete</div>
          </div>
        )}
      </div>
    </div>
  );
};
