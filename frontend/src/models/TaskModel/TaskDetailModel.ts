import LabelModel from "../LabelModel/LableModel";
import UserShortModel from "../User/UserShortModel";

export interface SubTaskModel {
  id: string;
  name: string;
  description: string;
  deadline: Date;
  index: number;
  isDone: boolean;
}

interface TaskDetailModel {
  id: string;
  name: string;
  stage: string;
  description: string;
  labels: LabelModel[];
  user: UserShortModel;
  deadline: Date;
  isMyTask: boolean;
  tasks: SubTaskModel[];
  isFollowing: boolean;
  createdDate: Date;
  createdById: string;
  createdBy: string; //display name
  //actities
  //comments
}

export default TaskDetailModel;
