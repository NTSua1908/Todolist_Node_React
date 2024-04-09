import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTheme } from "../../hooks/ThemeContext";
import TaskListModel from "../../models/TaskModel/TaskListModel";
import { FaBarsProgress } from "react-icons/fa6";
import "./taskBlock.css";

interface TaskBlockProps {
  task: TaskListModel;
  index: number;
}

const TaskBlock: React.FC<TaskBlockProps> = ({ task, index }) => {
  const { theme, toggleTheme } = useTheme();
  console.log("Theme: ", theme);
  return (
    <Draggable key={task.id} index={index} draggableId={task.id}>
      {(itemProvided, itemsSnapshot) => (
        <div
          className={`taskBlock ${theme}`}
          ref={itemProvided.innerRef}
          {...itemProvided.draggableProps}
          {...itemProvided.dragHandleProps}
        >
          <div className='taskBlock-content'>
            <div className='taskBlock-content-name'>
              <h4>{task.name}</h4>
            </div>
            <div className='taskBlock-labels'>
              {task.labels.map((label, index) => (
                <span
                  style={{ backgroundColor: label.color }}
                  key={index}
                  className='taskBlock-labels-item'
                >
                  {label.name}
                </span>
              ))}
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
}

const TaskProgress: React.FC<TaskProgressProps> = ({
  taskDoneCount,
  taskTotalCount,
}) => {
  return (
    <div className='taskProgress'>
      <div className='taskProgress-header'>
        <div className='taskProgress-header-label'>
          <span>
            <FaBarsProgress />
          </span>
          Progress
        </div>
        <div className='taskProgress-header-status'>
          {taskDoneCount}/{taskTotalCount}
        </div>
      </div>
      <div className='taskProgress-percent'></div>
    </div>
  );
};
