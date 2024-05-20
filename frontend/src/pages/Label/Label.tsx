import { notification } from "antd";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import AddLabelBox from "../../components/AddLabelBox/AddLabelBox";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import Modal, { ModalType } from "../../components/Modal/Modal";
import Percentage from "../../components/Percentage/Percentage";
import { getProgressColor } from "../../helper/Common";
import { useTheme } from "../../contexts/ThemeContext";
import { labels } from "../../mock/labels";
import LabelListModel from "../../models/LabelModel/LabelListModel";
import "./label.css";

function Label() {
  const [Labels, setLabels] = useState<LabelListModel[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const [actionLabelId, setActionLabelId] = useState<string | null>(null);
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
    getLabelList();
  }, [currentPage]);

  const getLabelList = () => {
    setLabels(labels);
  };

  const handleAddLabel = async (name: string, color: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLabels([
      { id: "", color, name, percentCompleted: 100, taskCount: 0 },
      ...Labels,
    ]);
    setLoading(false);
  };

  const handleEditLabel = async (name: string, color: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLabels(
      Labels.map((label) => {
        if (label.id === actionLabelId) {
          label.name = name;
          label.color = color;
          return label;
        }
        return label;
      })
    );
    setActionLabelId(null);
    setLoading(false);
  };

  const onDelete = (Label: LabelListModel) => {
    if (Label.taskCount !== 0) {
      openNotificationFailure("You can only delete an empty Label.");
    } else {
      setActionLabelId(Label.id);
      setShowModal(true);
    }
  };

  const handleDeleteLabel = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLabels(Labels.filter((Label) => Label.id !== actionLabelId));
    setActionLabelId(null);
    setLoading(false);
  };

  useEffect(() => {
    if (!isShowBox && !isShowModal) {
      setActionLabelId(null);
    }
  }, [isShowBox, isShowModal]);

  return (
    <div className={`label ${theme}`}>
      {contextHolder}
      <Header />
      <div className="label-container">
        <div className="label-header">
          <div className="label-header-title">Labels</div>
          <div className="label-header-button">
            <button
              title="Add new Label"
              onClick={() => {
                setShowBox(true);
              }}
            >
              <span className="label-header-button-icon">
                <IoIosAdd />
              </span>
              New Label
            </button>
          </div>
        </div>
        <div className="label-content">
          <div className="label-table">
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
                {Labels.map((label, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td width={150} style={{ textAlign: "left" }}>
                      <div
                        className="label-table-name"
                        style={{
                          backgroundColor: label.color,
                        }}
                      >
                        {label.name}
                      </div>
                    </td>
                    <td>{label.taskCount}</td>
                    <td>
                      <div className="label-table-percent">
                        <div className="stage-table-percent">
                          <Percentage
                            percent={label.percentCompleted / 100}
                            color={getProgressColor(
                              label.percentCompleted / 100
                            )}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="label-table-actions">
                        <button
                          className="label-table-function edit"
                          onClick={() => {
                            setActionLabelId(label.id);
                            setShowBox(true);
                          }}
                        >
                          <MdEdit title="Edit" />
                        </button>
                        <button
                          className="label-table-function delete"
                          onClick={() => {
                            onDelete(label);
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
        description="Do you want to delete this Label?"
        setShow={setShowModal}
        type={ModalType.Alert}
        onAccept={handleDeleteLabel}
        show={isShowModal}
      />
      {isShowBox && (
        <AddLabelBox
          setShowBox={setShowBox}
          edit={actionLabelId !== null}
          onEdit={handleEditLabel}
          onAdd={handleAddLabel}
          name={Labels.find((Label) => Label.id === actionLabelId)?.name}
          color={Labels.find((Label) => Label.id === actionLabelId)?.color}
        />
      )}
      {loading && <Loading fullScreen />}
    </div>
  );
}

export default Label;
