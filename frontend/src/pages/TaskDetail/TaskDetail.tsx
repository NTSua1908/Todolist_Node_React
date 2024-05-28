import React, { useEffect, useState } from "react";
import "./taskDetail.css";
import TaskDetailModel from "../../models/TaskModel/TaskDetailModel";
import Loading from "../../components/Loading/Loading";
import { taskActivities, taskDetail } from "../../mock/task.mock";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  formatDateTimeToString,
  formatDateToStringDay,
  formatDayAgo,
} from "../../helper/DateHelper";
import { labels } from "../../mock/labels.mock";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useTheme } from "../../contexts/ThemeContext";
import ContentDisplayer from "../../components/ContentDisplayer/ContentDisplayer";
import TaskChild from "../../components/TaskChild/TaskChild";
import { Activity } from "../../models/TaskModel/ActivityModel";
import ActivityBox from "../../components/ActivityBox/ActivityBox";
import CommentTree from "../../components/CommentTree/CommentTree";
import { CommentDetailModel } from "../../models/Comment/CommentModel";
import { taskComments } from "../../mock/comment.mock";

function TaskDetail() {
  const [task, setTask] = useState<TaskDetailModel>();
  const [loading, setLoading] = useState(true);
  const [isNotFound, setNotFound] = useState(false);
  const { theme } = useTheme();

  // Activities
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);

  // CommentS
  const [comments, setComments] = useState<CommentDetailModel[]>(taskComments);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(2);

  useEffect(() => {
    setLoading(true);
    new Promise((r) => setTimeout(r, 1000))
      .then(() => {
        setTask(taskDetail);
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });

    setActivitiesLoading(true);
    new Promise((r) => setTimeout(r, 2000))
      .then(() => {
        setActivities(taskActivities);
      })
      .catch()
      .finally(() => {
        setActivitiesLoading(false);
      });
  }, []);

  return (
    <div className={`taskDetail ${theme}`}>
      <Header />
      {loading && <Loading fullScreen />}
      {!loading && isNotFound && <>Task not found</>}
      {!loading && !isNotFound && task && (
        <div className="taskDetail-container">
          <div className="taskDetail-header">
            <div className="taskDetail-header-title">
              <h1>{task.name}</h1>
              <div className="taskDetail-header-options">
                <div className="taskDetail-header-options-icon">
                  <BsThreeDotsVertical />
                </div>
                <div className="taskDetail-header-options-container">
                  {task.isMyTask && (
                    <div className="taskDetail-header-options-item">Edit</div>
                  )}
                  {task.isMyTask && (
                    <div className="taskDetail-header-options-item">Close</div>
                  )}
                  {!task.isMyTask && (
                    <div className="taskDetail-header-options-item">Report</div>
                  )}
                  {!task.isFollowing && (
                    <div className="taskDetail-header-options-item">Follow</div>
                  )}
                  {task.isFollowing && (
                    <div className="taskDetail-header-options-item">
                      Unfollow
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="taskDetail-header-deadline">
              <div className="taskDetail-header-deadline-left">
                <div className="taskDetail-header-stage">{task.stage}</div>
                <div className="taskDetail-header-date">
                  Created at {formatDayAgo(task.createdDate)} by
                  <Link to={"/user/" + task.createdBy.id}>
                    {" "}
                    {task.createdBy.displayName}
                  </Link>
                </div>
              </div>
              <div className="taskDetail-header-deadline-right">
                Deadline: {formatDateTimeToString(task.deadline)}
              </div>
            </div>
            <div className="taskDetail-header-user">
              <div className="taskDetail-header-labels">
                {task.labels.map((label, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: label.color }}
                    className="taskDetail-header-labels-item"
                  >
                    {label.name}
                  </div>
                ))}
              </div>
              <div className="taskDetail-header-userinfo">
                Assignee
                <Link
                  to={"/user/" + task.user.id}
                  className="taskDetail-header-userinfo-group"
                >
                  <span className="taskDetail-header-userinfo-name">
                    {task.user.displayName}
                  </span>
                  <img
                    src={task.user.avatar}
                    alt={task.user.username}
                    className="taskDetail-header-userinfo-avatar"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="taskDetail-body">
            <h2 className="taskDetail-body-title">Description</h2>
            <ContentDisplayer content={task.description} />
            {task.tasks.length != 0 && <TaskChild tasks={task.tasks} />}
            {activities.length != 0 && <ActivityBox activities={activities} />}
          </div>
          <CommentTree
            taskId={task.id}
            userName={task.user.username}
            data={comments}
            amount={10}
            page={currentPage}
            totalCount={totalCount}
          />
        </div>
      )}
    </div>
  );
}

export default TaskDetail;
