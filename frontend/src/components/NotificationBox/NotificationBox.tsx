import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";
import DefaultAvatar from "../../images/default_avatar.png";
import NotificationModel from "../../models/Notification/NoticationModel";
import "./notificationBox.css";

interface NotificationBoxProps {
    notifications: NotificationModel[];
    unreadNotifications: NotificationModel[];
}

const NotificationBox: React.FC<NotificationBoxProps> = ({
    notifications,
    unreadNotifications,
}) => {
    const { theme } = useTheme();
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

export default NotificationBox;

interface NotificationItemProps {
    notification: NotificationModel;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
    notification,
}) => {
    return (
        <div
            className={`notificationBox-item ${
                !notification.isRead ? "unread" : ""
            }`}
        >
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
            <div className='notificationBox-item-right'>
                <div className='notificationBox-item-right-icon'>
                    <BsThreeDots />
                    <div className='notificationBox-item-menu'>
                        <div className='notificationBox-item-menu-item'>
                            {notification.isRead ? "Mark unread" : "Mark read"}
                        </div>
                        <div className='notificationBox-item-menu-item'>
                            Delete
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
