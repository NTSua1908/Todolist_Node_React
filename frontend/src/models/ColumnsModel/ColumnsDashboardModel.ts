import TaskDashboardModel from "../TaskModel/TaskDetailModel";
import TaskListModel from "../TaskModel/TaskListModel";

interface ColumnDashboardModel {
  id: string;
  name: string;
  tasks: TaskListModel[];
}

export default ColumnDashboardModel;
