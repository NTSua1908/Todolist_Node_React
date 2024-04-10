import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import "./columns.css";
import ColumnDashboardModel from "../../models/ColumnsModel/ColumnsDashboardModel";
import TaskBlock from "../TaskBlock/TaskBlock";
import { IoIosAdd } from "react-icons/io";
import { useTheme } from "../../hooks/ThemeContext";
import AddTask from "../AddTask/AddTask";
import TaskCreateModel from "../../models/TaskModel/TaskCreateModel";

interface ColumnsProps {
  column: ColumnDashboardModel;
  index: number;
  onCreateTask: (task: TaskCreateModel) => Promise<void>;
}

const Columns: React.FC<ColumnsProps> = ({ column, index, onCreateTask }) => {
  const { theme } = useTheme();
  const [showCreateTask, setShowCreateTask] = useState(false);

  const handleShowCreateTask = () => {
    setShowCreateTask(true);
  };

  const handleCancelCreateTask = () => {
    setShowCreateTask(false);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`column ${theme}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className='column-header' {...provided.dragHandleProps}>
            <div className='column-header-name'>{column.name}</div>
            <div
              className='column-header-button'
              onClick={handleShowCreateTask}
            >
              <span className='column-header-button-icon'>
                <IoIosAdd />
              </span>
              Add new task
            </div>
          </div>
          <Droppable droppableId={column.id}>
            {(dropProvided) => (
              <div
                className='column-content'
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
              >
                {showCreateTask && (
                  <AddTask
                    onCreate={onCreateTask}
                    onCancel={handleCancelCreateTask}
                    columnId={column.id}
                    theme={theme}
                  />
                )}
                {column.tasks.map((task, index) => (
                  <TaskBlock key={index} task={task} index={index} />
                ))}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Columns;
