import React, { useState } from "react";
import "./modal.css";

function Modal(props) {
  const { title, onAccept, isShow, setShow, id } = props;

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
    <div className={`modal ${isShow && "show"}`}>
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
}

export default Modal;
