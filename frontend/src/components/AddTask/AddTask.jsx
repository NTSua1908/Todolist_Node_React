import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import "./addTask.css";

function AddTask(props) {
  const { onCreate } = props;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = () => {
    if (!loading && name.length != 0) {
      setLoading(true);
      onCreate({ name, description: "" })
        .then(() => {
          setName("");
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className='addTask'>
      <input
        type='text'
        className='addTask-input'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div
        className='addTask-button'
        onClick={() => {
          handleAddTask();
        }}
      >
        {loading ? <FiLoader /> : <FaPlus />}
      </div>
    </div>
  );
}

export default AddTask;
