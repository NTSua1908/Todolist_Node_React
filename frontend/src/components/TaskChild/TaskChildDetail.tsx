import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { formatDateTimeToString } from "../../helper/DateHelper";
import { SubTaskModel } from "../../models/TaskModel/TaskDetailModel";
import CheckBox from "../CheckBox/CheckBox";
import ContentDisplayer from "../ContentDisplayer/ContentDisplayer";
import "./taskChildDetail.css";

interface TaskChildDetailProps {
  task: SubTaskModel;
}

function TaskChildDetail({ task }: TaskChildDetailProps) {
  const [isShowDetail, setIsShowDetail] = useState(false);

  return (
    <div className="taskChildDetail">
      <div
        className="taskChildDetail-header"
        id={"task_" + task.index}
        onClick={() => {
          setIsShowDetail((prev) => !prev);
        }}
      >
        <div className={`taskChildDetail-more ${!isShowDetail ? "hide" : ""}`}>
          <FaChevronUp />
        </div>
        <div className="taskChildDetail-container">
          <div className="taskChildDetail-index">#{task.index}</div>
          <div className="taskChildDetail-name">{task.name}</div>
          <div className="taskChildDetail-toggle">
            <CheckBox title="Mark as completed" />
          </div>
        </div>
      </div>
      <div className={`taskChildDetail-body ${!isShowDetail ? "hide" : ""}`}>
        <div className="taskChildDetail-body-container">
          <p className="taskChildDetail-body-deadline">
            Deadline: {formatDateTimeToString(task.deadline)}
          </p>
          <ContentDisplayer content={task.description} />
        </div>
      </div>
    </div>
  );
}

export default TaskChildDetail;
