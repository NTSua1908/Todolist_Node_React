import React, { useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { MdSave } from "react-icons/md";
import { FaRegCheckSquare } from "react-icons/fa";
import { ImCheckboxUnchecked } from "react-icons/im";
import { toggleDoneTask } from "../../services/TaskService";
import "./taskBlock.css";
import Modal from "../Modal/Modal";

const TaskBlock = (props) => {
  const { onUpdate, onDelete, task } = props;
  const [currentTask, setCurrentTask] = useState(task);
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [isDone, setDone] = useState(task.isDone);

  const [loading, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);

  const handleShowModal = (id) => {
    setShowModal(true);
  };

  const handleEdit = () => {
    setEdit(false);
    if (!loading) {
      setLoading(true);
      console.log(task);
      onUpdate(task._id, { name, description })
        .then(() => {
          setCurrentTask({
            name,
            description,
          });
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleDelete = async () => {
    if (!loading) {
      setShowModal(false);
      setLoading(true);
      await onDelete(task._id);
      setLoading(false);
    }
  };

  const handleDoneTask = async () => {
    if (!loading) {
      setLoading(true);
      await toggleDoneTask(task._id)
        .then((res) => {
          setDone(res.data.isDone);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }
  };

  return (
    <div className='taskBlock'>
      <div className='taskBlock-content'>
        {!isEdit && (
          <>
            <div className='taskBlock-content-name'>
              <h3>{currentTask.name}</h3>
            </div>
            <div className='taskBlock-content-description'>
              <span>{currentTask.description}</span>
            </div>
          </>
        )}
        {isEdit && (
          <>
            <input
              className='taskBlock-content-edit-name'
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <textarea
              className='taskBlock-content-edit-description'
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
          </>
        )}
      </div>
      <div className='taskBlock-function'>
        {!loading && (
          <>
            {!isEdit && (
              <>
                <div
                  className='taskBlock-function-container edit'
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <MdModeEdit />
                </div>
                <div
                  className='taskBlock-function-container delete'
                  onClick={() => {
                    handleShowModal();
                  }}
                >
                  <MdDelete />
                </div>
                <div
                  className='taskBlock-function-container check'
                  onClick={() => {
                    handleDoneTask();
                  }}
                >
                  {isDone ? <FaRegCheckSquare /> : <ImCheckboxUnchecked />}
                </div>
              </>
            )}
            {isEdit && (
              <div
                className='taskBlock-function-container edit'
                onClick={() => {
                  handleEdit();
                }}
              >
                <MdSave />
              </div>
            )}
          </>
        )}
        {loading && <FiLoader />}
      </div>

      {isShowModal && (
        <Modal
          title={"Do you want to delete this task?"}
          isShow={isShowModal}
          setShow={setShowModal}
          onAccept={handleDelete}
          id={task._id}
        />
      )}
    </div>
  );
};

export default TaskBlock;
