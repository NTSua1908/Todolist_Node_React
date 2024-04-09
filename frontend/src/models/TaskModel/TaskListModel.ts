import LabelModel from "../LabelModel/LableModel";
import UserShortModel from "../User/UserShortModel";

interface TaskListModel {
  id: string;
  name: string;
  labels: LabelModel[];
  user: UserShortModel;
  taskTotalCount: number;
  taskDoneCount: number;
}

export default TaskListModel;
