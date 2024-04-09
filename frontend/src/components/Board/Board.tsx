import React, { useEffect, useState } from "react";
import "./board.css";
import ColumnDashboardModel from "../../models/ColumnsModel/ColumnsDashboardModel";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Result } from "antd";
import Columns from "../Columns/Columns";

interface BoardProps {
  columns: ColumnDashboardModel[];
}

const BOARD_DROPABLE_ID = "Board";

function Board({ columns }: BoardProps) {
  const [data, setData] = useState<ColumnDashboardModel[]>([]);

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    // if (result.combine) {
    //   console.log("Combine");
    // }
    // dropped nowhere
    if (!result.destination) {
      return;
    }
    const source = result.source;
    const destination = result.destination;
    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    //Move columns in table
    if (
      source.droppableId === BOARD_DROPABLE_ID &&
      destination.droppableId === BOARD_DROPABLE_ID
    ) {
      const shallow = [...data];
      const [removedElement] = shallow.splice(source.index, 1);
      shallow.splice(destination.index, 0, removedElement);
      setData(shallow);
    }
    //Move tasks
    else {
      //Move tasks in one column
      if (source.droppableId === destination.droppableId) {
        let column = data.find(
          (column) => column.id === destination.droppableId
        );
        if (column) {
          let shallow = [...column.tasks];
          const [removedElement] = shallow.splice(source.index, 1);
          shallow.splice(destination.index, 0, removedElement);
          column.tasks = shallow;
        }
      }
      //Move task between two columns
      else {
        let columnDestination = data.find(
          (column) => column.id === destination.droppableId
        );
        let columnSource = data.find(
          (column) => column.id === source.droppableId
        );
        if (columnDestination && columnSource) {
          //Remove task in source tasks
          let shallowSourceTask = [...columnSource.tasks];
          const [removedElement] = shallowSourceTask.splice(source.index, 1);
          columnSource.tasks = shallowSourceTask;

          //Add moved task to destination tasks
          let shallowDestinationTask = [...columnDestination.tasks];
          shallowDestinationTask.splice(destination.index, 0, removedElement);
          columnDestination.tasks = shallowDestinationTask;
        }
      }
    }
  };

  return (
    <div className='board'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={BOARD_DROPABLE_ID}
          direction='horizontal'
          type='COLUMN'
          ignoreContainerClipping={false}
          isCombineEnabled={false}
        >
          {(provided) => (
            <div
              className='board-container'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.map((column, index) => (
                <Columns key={column.id} column={column} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Board;
