import React, { useEffect, useState } from "react";
import "./taskDetail.css";
import TaskDetailModel from "../../models/TaskModel/TaskDetailModel";
import Loading from "../../components/Loading/Loading";
import taskDetail from "../../mock/task";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDateToStringDay, formatDayAgo } from "../../helper/DateHelper";
import { labels } from "../../mock/labels";
import { Link } from "react-router-dom";

function TaskDetail() {
  const [task, setTask] = useState<TaskDetailModel>();
  const [loading, setLoading] = useState(true);
  const [isNotFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);

    new Promise((r) => setTimeout(r, 2000))
      .then(() => {
        setTask(taskDetail);
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className='taskDetail'>
      {loading && <Loading fullScreen />}
      {!loading && isNotFound && <>Task not found</>}
      {!loading && !isNotFound && task && (
        <div className='taskDetail-container'>
          <div className='taskDetail-header'>
            <div className='taskDetail-header-title'>
              <h3>{task.name}</h3>
              <div className='taskDetail-header-options'>
                <div className='taskDetail-header-options-icon'>
                  <BsThreeDotsVertical />
                </div>
                <div className='taskDetail-header-options-container'>
                  {task.isMyTask && (
                    <div className='taskDetail-header-options-item'>Edit</div>
                  )}
                  {task.isMyTask && (
                    <div className='taskDetail-header-options-item'>Close</div>
                  )}
                  {!task.isMyTask && (
                    <div className='taskDetail-header-options-item'>Report</div>
                  )}
                  {!task.isFollowing && (
                    <div className='taskDetail-header-options-item'>Follow</div>
                  )}
                  {task.isFollowing && (
                    <div className='taskDetail-header-options-item'>
                      Unfollow
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='taskDetail-header-deadline'>
              <div className='taskDetail-header-deadline-left'>
                <div className='taskDetail-header-stage'>{task.stage}</div>
                <div className='taskDetail-header-date'>
                  {formatDayAgo(task.createdDate)}
                </div>
              </div>
              <div className='taskDetail-header-deadline-right'>
                {formatDateToStringDay(task.deadline)}
              </div>
            </div>
            <div className='taskDetail-header-user'>
              <div className='taskDetail-header-labels'>
                {task.labels.map((label, index) => (
                  <div
                    style={{ backgroundColor: label.color }}
                    className='taskDetail-header-labels-item'
                  >
                    {label.name}
                  </div>
                ))}
              </div>
              <Link
                to={"/user/" + task.user.id}
                className='taskDetail-header-user'
              >
                <img
                  src={task.user.username}
                  alt=''
                  className='taskDetail-header-user-avatar'
                />
                <span className='taskDetail-header-user-name'>
                  {task.user.displayName}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskDetail;
