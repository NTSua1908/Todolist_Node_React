import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import "./addTask.css";
import CreateTaskModel from "../../models/TaskModel/TaskCreateModel";
import { Spin } from "antd";
import { useTheme } from "../../hooks/ThemeContext";

interface AddTaskProps {
  onCreate: (task: CreateTaskModel) => Promise<void>;
  onCancel: () => void;
  columnId: string;
  theme: string;
}

const AddTask: React.FC<AddTaskProps> = ({
  onCreate,
  onCancel,
  theme,
  columnId,
}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = () => {
    if (!loading && name.length != 0) {
      setLoading(true);
      onCreate({ name, columnId })
        .then(() => {
          setName("");
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={`addTask ${theme}`}>
      <div className='addTask-title'>Title</div>
      <input
        type='text'
        name='title'
        className='addTask-input'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className='addTask-function'>
        <button
          className='addTask-function-button'
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button className='addTask-function-button' onClick={handleAddTask}>
          Create{" "}
          {loading && <Spin style={{ marginLeft: "3px" }} size='small' />}
        </button>
      </div>
    </div>
  );
};

export default AddTask;
