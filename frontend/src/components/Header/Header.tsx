import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { ParseProjectsToSelectBoxOptions } from "../../helper/SelectBoxParseOption";
import { useTheme } from "../../hooks/ThemeContext";
import DefaultAvatar from "../../images/default_avatar.png";
import Logo from "../../images/logo.png";
import Projects from "../../mock/projects";
import userLogin from "../../mock/user";
import ProjectListModel from "../../models/ProjectModel/ProjectListModel";
import SelectBox from "../SelectBox/SelectBox";
import { FaShare } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import "./header.css";
import SearchBox from "../SearchBox/SearchBox";
import { RiShareForwardLine } from "react-icons/ri";
import { PiShareFat } from "react-icons/pi";
import NotificationModel from "../../models/Notification/NoticationModel";
import notificationDatas from "../../mock/notification";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

function Header() {
  const [projects, setProjects] = useState<ProjectListModel[]>([]);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [user, setUser] = useState<UserGetByTokenModel>();

  const { theme } = useTheme();

  useEffect(() => {
    getProjects();
    getUser();
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
const NotificationBox: React.FC<NotificationBoxProps> = ({ notifications }) => {
  return (
    <div className='notificationBox'>
      <div className='notificationBox-header'>
        <h3 className='notificationBox-title'>Notifications</h3>
        <div className='notificationBox-mark'>
          <IoCheckmarkDoneOutline />
          Mark all as read
        </div>
      </div>
      <div className='notificationBox-list'>
        {notifications.map((notification, index) => (
          <div key={index} className='notification-item'>
            <div className='notification-item-left'>
              <img
                src={notification.sender.avatar ?? DefaultAvatar}
                alt={notification.sender.username}
              />
            </div>
            <div className='notification-item-center'>
              @{notification.sender.username} {notification.content}
            </div>
            <div className='notification-item-right'>
              <BsThreeDots />
              <div className='notification-item-menu'>
                <div className='notification-item-menu-item'>Mark read</div>
                <div className='notification-item-menu-item'>Delete</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
