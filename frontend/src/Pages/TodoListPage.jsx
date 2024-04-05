import React, { useEffect, useState } from "react";
import AddTask from "../components/AddTask/AddTask";
import TaskBlock from "../components/TaskBlock/TaskBlock";
import { Delete, GetAllTask, Update, Create } from "../services/TaskService";
import "./todoListPage.css";
import Modal from "../components/Modal/Modal";
import Pagination from "../components/Pagination/Pagination";
import Loader from "../components/Loading/Loader";

function TodoListPage(props) {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTask();
  }, [page]);

  const handleUpdate = (id, task) => {
    return Update(id, { name: task.name, description: task.description });
  };

  const handleDelete = async (id) => {
    await Delete(id)
      .then(() => {
        setTasks((prev) => prev.filter((task) => task._id != id));
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const handleCreate = (task) => {
    return Create(task)
      .then((res) => {
        setTasks([
          {
            _id: res.data.newTask._id,
            name: res.data.newTask.name,
            description: "",
          },
          ...tasks,
        ]);
      })
      .catch((error) => {});
  };

  const getTask = () => {
    if (!loading) {
      setLoading(true);
      GetAllTask(searchText, page, 10)
        .then((res) => {
          setTasks(res.data.data);
          setTotalPages(res.data.totalPages);
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className='todolist'>
      <div className='todolist-addTask'>
        <AddTask onCreate={handleCreate} />
      </div>
      <div className='todolist-tasks-container'>
        <div className='todolist-tasks'>
          {tasks.map((task) => (
            <TaskBlock
              key={task._id}
              task={task}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      <div className='todolist-tasks-pagination'>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default TodoListPage;
