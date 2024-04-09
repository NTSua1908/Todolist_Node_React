import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import "./addTask.css";
import CreateTaskModel from "../../models/TaskModel/TaskCreateModel";

interface AddTaskProps {
  onCreate: (task: CreateTaskModel) => Promise<void>;
}

const AddTask: React.FC<AddTaskProps> = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddTask = () => {
    if (!loading && name.length != 0) {
      setLoading(true);
      // onCreate({ name, labels })
      //   .then(() => {
      //     setName("");
      //   })
      //   .catch((error) => {})
      //   .finally(() => {
      //     setLoading(false);
      //   });
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
};

export default AddTask;
