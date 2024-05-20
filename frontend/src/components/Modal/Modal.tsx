import React, { useState } from "react";
import "./modal.css";
import { useTheme } from "../../contexts/ThemeContext";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { BsFillQuestionCircleFill } from "react-icons/bs";

interface ModalProps {
  description: string;
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onAccept: () => void;
  type?: ModalType;
}

export enum ModalType {
  Alert = 0,
  Question = 1,
}

const Modal: React.FC<ModalProps> = ({
  description,
  onAccept,
  show = true,
  setShow,
  type = ModalType.Question,
}) => {
  const { theme } = useTheme();

  const handleCancel = () => {
    setShow(false);
  };

  const handleAccept = () => {
    setShow(false);
    onAccept();
  };

  return (
    <div className={`modal ${theme} ${show ? "" : "hide"}`}>
      <div className="modal-background" onClick={() => handleCancel()}></div>
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-content-icon">
            {type === ModalType.Alert && (
              <TbAlertTriangleFilled style={{ color: "#ff5252" }} />
            )}
            {!type ||
              (type === ModalType.Question && (
                <BsFillQuestionCircleFill style={{ color: "3890ee" }} />
              ))}
          </div>
          <div className="modal-content-title">
            <p className="modal-content-title-header">
              {ModalType[type ?? ModalType.Question]}
            </p>
            <p className="modal-content-title-description">{description}</p>
          </div>
        </div>
        <div className="modal-function">
          <div
            className="modal-function-button cancel"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </div>
          <div className="modal-function-button accept" onClick={handleAccept}>
            Accept
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
