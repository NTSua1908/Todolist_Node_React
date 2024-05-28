import React from "react";
import { SubTaskModel } from "../../models/TaskModel/TaskDetailModel";
import TaskChildDetail from "./TaskChildDetail";
import "./taskChild.css";

interface TaskChildProps {
  tasks: SubTaskModel[];
}

function TaskChild({ tasks }: TaskChildProps) {
  return (
    <div className="taskChild">
      <h3 className="taskChild-title">Tasks need to be completed</h3>
      {tasks.map((task, index) => (
        <TaskChildDetail task={task} key={index} />
      ))}
    </div>
  );
}

export default TaskChild;
