import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTheme } from "../../contexts/ThemeContext";
import TaskListModel from "../../models/TaskModel/TaskListModel";
import { FaBarsProgress } from "react-icons/fa6";
import "./taskBlock.css";
import { getProgressColor } from "../../helper/Common";
import { useNavigate } from "react-router-dom";

interface TaskBlockProps {
  task: TaskListModel;
  index: number;
}

const TaskBlock: React.FC<TaskBlockProps> = ({ task, index }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Draggable key={task.id} index={index} draggableId={task.id}>
      {(itemProvided, itemsSnapshot) => (
        <div
          className={`taskBlock ${theme}`}
          ref={itemProvided.innerRef}
          {...itemProvided.draggableProps}
          {...itemProvided.dragHandleProps}
          onClick={() => navigate("task/" + task.index)}
        >
          <div className="taskBlock-content">
            <div className="taskBlock-content-name">
              <h4>{task.name}</h4>
              <span className="taskBlock-content-name-index">
                #{task.index}
              </span>
            </div>
            <TaskProgress
              taskDoneCount={task.taskDoneCount}
              taskTotalCount={task.taskTotalCount}
              theme={theme}
            />
            <div className="taskBlock-info">
              <div className="taskBlock-info-labels">
                {task.labels.map((label, index) => (
                  <span
                    style={{ backgroundColor: label.color }}
                    key={index}
                    className="taskBlock-info-labels-item"
                  >
                    {label.name}
                  </span>
                ))}
              </div>
              <div className="taskBlock-info-user">
                <img src={task.user.avatar} alt={task.user.username} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(TaskBlock);

interface TaskProgressProps {
  taskDoneCount: number;
  taskTotalCount: number;
  theme: string;
}

const TaskProgress: React.FC<TaskProgressProps> = ({
  taskDoneCount,
  taskTotalCount,
  theme,
}) => {
  return (
    <div className={`taskProgress ${theme}`}>
      <div className="taskProgress-header">
        <div className="taskProgress-header-label">
          <span className="taskProgress-header-label-icon">
            <FaBarsProgress />
          </span>
          Progress
        </div>
        <div className="taskProgress-header-status">
          {taskDoneCount}/{taskTotalCount}
        </div>
      </div>
      <div className="taskProgress-percent">
        <div
          style={{
            backgroundColor: getProgressColor(taskDoneCount / taskTotalCount),
            width: `${(taskDoneCount / taskTotalCount) * 100}%`,
          }}
          className="taskProgress-percent-completed"
        ></div>
      </div>
    </div>
  );
};
