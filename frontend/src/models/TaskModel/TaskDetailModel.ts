import UserShortModel from "../User/UserShortModel";
interface TaskDetailModel {
  id: string;
  name: string;
  description: string;
  labels: string[];
  user: UserShortModel;
}

export default TaskDetailModel;
