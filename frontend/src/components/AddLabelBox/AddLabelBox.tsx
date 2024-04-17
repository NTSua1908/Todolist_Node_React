import { ColorPicker, Input } from "antd";
import React, { useState } from "react";
import { useTheme } from "../../hooks/ThemeContext";
import "./addLabelBox.css";

interface AddLabelBoxProps {
    onAdd?: (name: string, color: string) => Promise<void>;
    onEdit?: (name: string, color: string) => Promise<void>;
    setShowBox: React.Dispatch<React.SetStateAction<boolean>>;
    edit?: boolean;
    name?: string;
    color?: string;
}

function AddLabelBox({
    onAdd,
    onEdit,
    setShowBox,
    edit = false,
    name: labelName,
    color: initColor,
}: AddLabelBoxProps) {
    const [name, setName] = useState(labelName ?? "");
    const [color, setColor] = useState(initColor ?? "#1677ff");
    const { theme } = useTheme();

    const handleAddLabel = async () => {
        if (onAdd) {
            await onAdd(name, color);
            setShowBox(false);
        }
    };

    const handleEditStage = async () => {
        if (onEdit) {
            await onEdit(name, color);
            setShowBox(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    return (
        <div className={`addLabel ${theme}`}>
            <div className='addLabel-container'>
                {edit ? (
                    <div className='addLabel-title'>Edit label</div>
                ) : (
                    <div className='addLabel-title'>New label</div>
                )}
                <div className='addLabel-content'>
                    <div className='addLabel-content-label'>Label name</div>
                    <Input value={name} onChange={handleInputChange} />
                    <div className='addLabel-content-label'>Label color</div>
                    <ColorPicker
                        value={color}
                        size='small'
                        onChange={(value) => {
                            setColor(value.toHexString());
                        }}
                        showText
                    />
                </div>
                <div className='addLabel-function'>
                    <button
                        className='addLabel-function-button cancel'
                        onClick={() => {
                            setShowBox(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className='addLabel-function-button add'
                        disabled={name.length === 0}
                        onClick={edit ? handleEditStage : handleAddLabel}
                    >
                        {edit ? "Save" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddLabelBox;
