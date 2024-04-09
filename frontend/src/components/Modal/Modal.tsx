import React, { useState } from "react";
import "./modal.css";

interface ModalProps {
  title: string;
  id: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onAccept: (id: string) => Promise<void>;
}

const Modal: React.FC<ModalProps> = ({ title, onAccept, setShow, id }) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setShow(false);
  };

  const handleAccept = async () => {
    if (!loading) {
      setLoading(true);
      await onAccept(id);
      setLoading(false);
    }
  };

  return (
    <div className='modal'>
      <div className='modal-background' onClick={() => handleCancel()}></div>
      <div className='modal-container'>
        <div className='modal-content'>
          <p>{title}</p>
        </div>
        <div className='modal-function'>
          <div
            className='modal-function-button cancel'
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </div>
          <div
            className='modal-function-button accept'
            onClick={() => {
              handleAccept();
            }}
          >
            Accept
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
