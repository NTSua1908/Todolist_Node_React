import UserShortModel from "../User/UserShortModel";

interface NotificationModel {
  sender: UserShortModel;
  content: string;
  taskIndex: number;
  isRead: boolean;
}

export default NotificationModel;
