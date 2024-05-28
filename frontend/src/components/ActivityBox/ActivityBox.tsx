import React from "react";
import "./activityBox.css";
import { Activity } from "../../models/TaskModel/ActivityModel";
import { ActivityType } from "../../enums/ActivityType";
import { Link } from "react-router-dom";
import { formatDayAgo } from "../../helper/DateHelper";
import { GrWaypoint } from "react-icons/gr";

interface ActivityBoxProps {
  activities: Activity[];
}

function ActivityBox({ activities }: ActivityBoxProps) {
  const handleScrollToElement = (index?: number) => {
    if (index) {
      const element = document.getElementById("task_" + index);
      if (element) {
        const offset = -80;
        const targetOffsetTop = element.offsetTop + offset;
        window.scrollTo({
          top: targetOffsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  const getActivityText = (activity: Activity, key: number) => {
    switch (activity.type) {
      case ActivityType.MarkCompleted:
        return (
          <div className="activityBox-item" key={key}>
            <span className="activityBox-item-icon">
              <GrWaypoint />
            </span>
            <span className="activityBox-item-container">
              <Link
                to={"/user/" + activity.Doer.id}
                title={activity.Doer.username}
                className="activityBox-item-highlight click"
              >
                {activity.Doer.displayName}
              </Link>
              marked task
              <span
                className="activityBox-item-highlight click"
                onClick={() => handleScrollToElement(activity.SubTaskIndex)}
              >
                #{activity.SubTaskIndex}
              </span>
              as completed at
              <span className="activityBox-item-date">
                {formatDayAgo(activity.Date)}.
              </span>
            </span>
          </div>
        );
      case ActivityType.MarkNotCompleted:
        return (
          <div className="activityBox-item" key={key}>
            <span className="activityBox-item-icon">
              <GrWaypoint />
            </span>
            <span className="activityBox-item-container">
              <Link
                to={"/user/" + activity.Doer.id}
                title={activity.Doer.username}
                className="activityBox-item-highlight click"
              >
                {activity.Doer.displayName}
              </Link>
              marked task
              <span
                className="activityBox-item-highlight  click"
                onClick={() => handleScrollToElement(activity.SubTaskIndex)}
              >
                #{activity.SubTaskIndex}
              </span>
              as not completed at
              <span className="activityBox-item-date">
                {formatDayAgo(activity.Date)}.
              </span>
            </span>
          </div>
        );
      case ActivityType.Move:
        return (
          <div className="activityBox-item" key={key}>
            <span className="activityBox-item-icon">
              <GrWaypoint />
            </span>
            <span className="activityBox-item-container">
              <Link
                to={"/user/" + activity.Doer.id}
                title={activity.Doer.username}
                className="activityBox-item-highlight"
              >
                {activity.Doer.displayName}
              </Link>
              moved task from
              <span className="activityBox-item-highlight">
                {activity.StageFrom?.name}
              </span>
              to
              <span className="activityBox-item-highlight">
                {activity.StageTo?.name}
              </span>
              at
              <span className="activityBox-item-date">
                {formatDayAgo(activity.Date)}.
              </span>
            </span>
          </div>
        );
      case ActivityType.Close:
        return (
          <div className="activityBox-item" key={key}>
            <span className="activityBox-item-icon">
              <GrWaypoint />
            </span>
            <span className="activityBox-item-container">
              <Link
                to={"/user/" + activity.Doer.id}
                title={activity.Doer.username}
                className="activityBox-item-highlight"
              >
                {activity.Doer.displayName}
              </Link>
              closed task at
              <span className="activityBox-item-date">
                {formatDayAgo(activity.Date)}.
              </span>
            </span>
          </div>
        );

      case ActivityType.Update:
        return (
          <div className="activityBox-item" key={key}>
            <span className="activityBox-item-icon">
              <GrWaypoint />
            </span>
            <span className="activityBox-item-container">
              <Link
                to={"/user/" + activity.Doer.id}
                title={activity.Doer.username}
                className="activityBox-item-highlight"
              >
                {activity.Doer.displayName}
              </Link>
              updated task at
              <span className="activityBox-item-date">
                {formatDayAgo(activity.Date)}.
              </span>
            </span>
          </div>
        );
    }
  };

  return (
    <div className="activityBox">
      <h2 className="activityBox-title">Activities</h2>
      {activities.map((activity, index) => (
        <>{getActivityText(activity, index)}</>
      ))}
    </div>
  );
}

export default ActivityBox;
