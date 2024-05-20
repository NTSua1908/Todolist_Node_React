import { Input } from "antd";
import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { IoIosCloseCircle } from "react-icons/io";
import "./addStageBox.css";

interface AddStageBoxProps {
  onAdd?: (name: string) => Promise<void>;
  onEdit?: (name: string) => Promise<void>;
  setShowBox: React.Dispatch<React.SetStateAction<boolean>>;
  edit?: boolean;
  value?: string;
}

function AddStageBox({
  onAdd,
  onEdit,
  setShowBox,
  edit = false,
  value,
}: AddStageBoxProps) {
  const [name, setName] = useState(value ?? "");
  const { theme } = useTheme();

  const handleAddStage = async () => {
    if (onAdd) {
      await onAdd(name);
      setShowBox(false);
    }
  };

  const handleEditStage = async () => {
    if (onEdit) {
      await onEdit(name);
      setShowBox(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className={`addStage ${theme}`}>
      <div className="addStage-container">
        {edit ? (
          <div className="addStage-title">Edit stage</div>
        ) : (
          <div className="addStage-title">New stage</div>
        )}
        <div className="addStage-content">
          <div className="addStage-content-label">Stage name</div>
          <Input value={name} onChange={handleInputChange} />
        </div>
        <div className="addStage-function">
          <button
            className="addStage-function-button cancel"
            onClick={() => {
              setShowBox(false);
            }}
          >
            Cancel
          </button>
          <button
            className="addStage-function-button add"
            disabled={name.length === 0}
            onClick={edit ? handleEditStage : handleAddStage}
          >
            {edit ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStageBox;
