import TaskListModel from "../TaskModel/TaskListModel";

interface StageDashboardModel {
    id: string;
    name: string;
    tasks: TaskListModel[];
}

export default StageDashboardModel;
