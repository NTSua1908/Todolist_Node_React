import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTheme } from "../../hooks/ThemeContext";
import TaskListModel from "../../models/TaskModel/TaskListModel";
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
                <div key={index} className='taskBlock-labels-item'>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(TaskBlock);
