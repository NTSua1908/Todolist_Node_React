import { Spin, notification } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FetchingErrorHandler } from "../../helper/FetchingErrorHandler";
import ColumnDashboardModel from "../../models/ColumnsModel/ColumnsDashboardModel";
import { GetAllTask } from "../../services/TaskService";
import "./dashboard.css";
import { dashboard } from "../../mock/dashboard";
import Columns from "../../components/Columns/Columns";
import Board from "../../components/Board/Board";

function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const [tasks, setTasks] = useState<ColumnDashboardModel[]>([]);
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationSuccess = () => {
    api.info({
      message: `Notification`,
      description: "Created successfully",
      placement: "topRight",
    });
  };

  const openNotificationFailure = (message: string) => {
    api.error({
      message: `Notification`,
      description: message,
      placement: "topRight",
      type: "error",
    });
  };

  useEffect(() => {
    // getTask();
    setTasks(dashboard);
  }, []);

  const getTask = () => {
    if (!loading) {
      setLoading(true);
      GetAllTask(searchText, 0, 10)
        .then((res) => {
          setTasks(res.data.data);
        })
        .catch((error: AxiosError) => {
          FetchingErrorHandler(error, openNotificationFailure);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // console.log(tasks);
  return (
    <div className='todolist'>
      {contextHolder}
      <div className='todolist-tasks-container'>
        <div className='todolist-tasks'>
          <Board columns={tasks} />
        </div>
      </div>
      {loading && <Spin fullscreen size='large' />}
    </div>
  );
}

export default Dashboard;
