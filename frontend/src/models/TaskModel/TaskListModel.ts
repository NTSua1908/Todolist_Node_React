import UserShortModel from "../User/UserShortModel";

interface TaskListModel {
  id: string;
  name: string;
  labels: string[];
  user: UserShortModel;
}

export default TaskListModel;
