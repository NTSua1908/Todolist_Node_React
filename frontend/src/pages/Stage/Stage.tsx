import React, { useEffect, useState } from "react";
import "./stage.css";
import Header from "../../components/Header/Header";
import { IoIosAdd } from "react-icons/io";
import StageListModel from "../../models/StageModel/StageListModel";
import { useTheme } from "../../contexts/ThemeContext";
import { MdDelete, MdEdit } from "react-icons/md";
import { stageList } from "../../mock/stage.mock";
import Loading from "../../components/Loading/Loading";
import Modal, { ModalType } from "../../components/Modal/Modal";
import AddStageBox from "../../components/AddStageBox/AddStageBox";
import { getProgressColor } from "../../helper/Common";
import { notification } from "antd";
import Percentage from "../../components/Percentage/Percentage";

function Stage() {
  const [stages, setStages] = useState<StageListModel[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const [actionStageId, setActionStageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isShowBox, setShowBox] = useState(false);
  const [isShowModal, setShowModal] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationSuccess = () => {
    api.info({
      message: `Notification`,
      description: "Created successfully",
      placement: "topRight",
    });
  };
  const openNotificationFailure = (message: string) => {
    api.error({
      message: `Notification`,
      description: message,
      placement: "topRight",
      type: "error",
    });
  };

  const { theme } = useTheme();

  useEffect(() => {
    getStageList();
  }, [currentPage]);

  const getStageList = () => {
    setStages(stageList);
  };

  const handleAddStage = async (name: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setStages([
      { id: "", name, percentCompleted: 100, taskCount: 0 },
      ...stages,
    ]);
    setLoading(false);
  };

  const handleEditStage = async (name: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setStages(
      stages.map((stage) => {
        if (stage.id === actionStageId) {
          stage.name = name;
          return stage;
        }
        return stage;
      })
    );
    setActionStageId(null);
    setLoading(false);
  };

  const onDelete = (stage: StageListModel) => {
    if (stage.taskCount !== 0) {
      openNotificationFailure("You can only delete an empty stage.");
    } else {
      setActionStageId(stage.id);
      setShowModal(true);
    }
  };

  const handleDeleteStage = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setStages(stages.filter((stage) => stage.id !== actionStageId));
    setActionStageId(null);
    setLoading(false);
  };

  useEffect(() => {
    if (!isShowBox && !isShowModal) {
      setActionStageId(null);
    }
  }, [isShowBox, isShowModal]);

  return (
    <div className={`stage ${theme}`}>
      {contextHolder}
      <Header />
      <div className="stage-container">
        <div className="stage-header">
          <div className="stage-header-title">Stages</div>
          <div className="stage-header-button">
            <button
              title="Add new stage"
              onClick={() => {
                setShowBox(true);
              }}
            >
              <span className="stage-header-button-icon">
                <IoIosAdd />
              </span>
              New stage
            </button>
          </div>
        </div>
        <div className="stage-content">
          <div className="stage-table">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th style={{ textAlign: "left" }}>Name</th>
                  <th>Total tasks</th>
                  <th>
                    Percent <br />
                    completed
                  </th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {stages.map((stage, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td width={150} style={{ textAlign: "left" }}>
                      {" "}
                      {stage.name}
                    </td>
                    <td>{stage.taskCount}</td>
                    <td>
                      <div className="stage-table-percent">
                        <Percentage
                          percent={stage.percentCompleted / 100}
                          color={getProgressColor(stage.percentCompleted / 100)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="stage-table-actions">
                        <button
                          className="stage-table-function edit"
                          onClick={() => {
                            setActionStageId(stage.id);
                            setShowBox(true);
                          }}
                        >
                          <MdEdit title="Edit" />
                        </button>
                        <button
                          className="stage-table-function delete"
                          onClick={() => {
                            onDelete(stage);
                          }}
                        >
                          <MdDelete title="Delete" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        description="Do you want to delete this stage?"
        setShow={setShowModal}
        type={ModalType.Alert}
        onAccept={handleDeleteStage}
        show={isShowModal}
      />
      {isShowBox && (
        <AddStageBox
          setShowBox={setShowBox}
          edit={actionStageId !== null}
          onEdit={handleEditStage}
          onAdd={handleAddStage}
          value={stages.find((stage) => stage.id === actionStageId)?.name}
        />
      )}
      {loading && <Loading fullScreen />}
    </div>
  );
}

export default Stage;
