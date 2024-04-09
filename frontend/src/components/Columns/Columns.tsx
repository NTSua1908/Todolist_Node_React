import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import "./columns.css";
import ColumnDashboardModel from "../../models/ColumnsModel/ColumnsDashboardModel";
import TaskBlock from "../TaskBlock/TaskBlock";

interface ColumnsProps {
  column: ColumnDashboardModel;
  index: number;
}

const Columns: React.FC<ColumnsProps> = ({ column, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          className='column'
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className='column-header' {...provided.dragHandleProps}>
            {column.name}
          </div>
          <Droppable droppableId={column.id}>
            {(dropProvided) => (
              <div
                className='column-content'
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
              >
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
