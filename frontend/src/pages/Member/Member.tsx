import { useEffect, useState } from "react";
import { IoIosAdd, IoMdAdd } from "react-icons/io";
import { MdSave, MdClose, MdEdit, MdDelete } from "react-icons/md";
import AutoComplete, {
  AutoCompleteItem,
} from "../../components/AutoComplete/AutoComplete";
import Loading from "../../components/Loading/Loading";
import Modal, { ModalType } from "../../components/Modal/Modal";
import SelectBox from "../../components/SelectBox/SelectBox";
import ProjectRole from "../../enums/ProjectRole";
import { useTheme } from "../../contexts/ThemeContext";
import { userProjectMembes, userSelects } from "../../mock/user.mock";
import ProjectShareModel from "../../models/ProjectModel/ProjectShareModel";
import "./member.css";
import ProjectMemberModel from "../../models/User/ProjectMemberModel";
import { projectRoles } from "../../helper/Common";
import Header from "../../components/Header/Header";
import { notification } from "antd";
import { formatDateToStringDay } from "../../helper/DateHelper";
import ShareModal from "../../components/ShareModal/ShareModal";

function Member() {
  const { theme } = useTheme();
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [projectMembers, setProjectMembers] = useState<ProjectMemberModel[]>(
    []
  );
  const [newUser, setNewUser] = useState<ProjectMemberModel>({
    id: "",
    username: "",
    role: ProjectRole.Viewer,
    avatar: "",
    displayName: "",
    grantedDate: new Date(),
  });

  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowBox, setShowBox] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    new Promise((r) => setTimeout(r, 1000)).then(() => {
      setProjectMembers(userProjectMembes);
      setLoading(false);
    });
  }, []);

  const onRemoveUser = (index: number) => {
    setDeleteIndex(index);
    setShowModal(true);
    setShowModal(true);
  };

  const handleRemoveUsers = (index: number) => {
    setProjectMembers((users) =>
      users.filter((user, listIndex) => listIndex !== index)
    );
    setDeleteIndex(-1);
  };

  const resetNewUser = () => {
    setNewUser({
      id: "",
      username: "",
      role: newUser.role,
      avatar: "",
      displayName: "",
      grantedDate: new Date(),
    });
  };

  const handleSelectRole = (role: ProjectRole) => {
    setNewUser({
      ...newUser,
      role,
    });
  };

  const onEditUser = (index: number, projectMembers: ProjectMemberModel) => {
    setEditIndex(index);
    setNewUser(projectMembers);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    resetNewUser();
  };

  const handleEditUser = () => {
    projectMembers[editIndex] = { ...newUser };
    setProjectMembers(projectMembers);
    resetNewUser();
    setEditIndex(-1);
  };

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

  return (
    <div className={`member ${theme}`}>
      {contextHolder}
      <Header />
      <div className="member-container">
        <div className="member-header">
          <div className="member-header-title">Project member</div>
          <div className="member-header-button">
            <button
              title="Add new member"
              onClick={() => {
                setShowBox(true);
              }}
            >
              <span className="member-header-button-icon">
                <IoIosAdd />
              </span>
              New members
            </button>
          </div>
        </div>
        {projectMembers.length !== 0 && (
          <div className="member-list">
            <table className="member-table">
              <thead>
                <tr>
                  <th
                    style={{
                      borderTopLeftRadius: "10px",
                      width: "40px",
                    }}
                  >
                    Index
                  </th>
                  <th
                    style={{
                      width: "140px",
                    }}
                  >
                    Avatar
                  </th>
                  <th
                    style={{
                      width: "200px",
                      textAlign: "left",
                      padding: "0",
                    }}
                  >
                    Username
                  </th>
                  <th
                    style={{
                      padding: "0",
                      textAlign: "left",
                    }}
                  >
                    Display name
                  </th>
                  <th style={{ width: "127px" }}>Role</th>
                  <th>Granted date</th>
                  <th
                    style={{
                      borderTopRightRadius: "10px",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectMembers.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="member-table-avatar"
                        src={user.avatar}
                        alt=""
                      />
                    </td>
                    {index === editIndex ? (
                      <>
                        <td
                          style={{
                            textAlign: "left",
                          }}
                        >
                          {user.username}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                          }}
                        >
                          {user.displayName}
                        </td>
                        <td>
                          <div>
                            <SelectBox
                              options={projectRoles}
                              onSelect={handleSelectRole}
                              width={100}
                              small
                              selectedValue={user.role}
                            />
                          </div>
                        </td>
                        <td>{formatDateToStringDay(user.grantedDate)}</td>
                        <td className="member-table-actions">
                          <button
                            className="member-table-function save"
                            onClick={handleEditUser}
                          >
                            <MdSave title="Save" />
                          </button>
                          <button
                            className="member-table-function delete"
                            onClick={handleCancelEdit}
                          >
                            <MdClose title="Cancel" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td
                          style={{
                            textAlign: "left",
                          }}
                        >
                          {user.username}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                          }}
                        >
                          {user.displayName}
                        </td>
                        <td>{ProjectRole[user.role]}</td>
                        <td>{formatDateToStringDay(user.grantedDate)}</td>
                        <td className="member-table-actions">
                          {user.role != ProjectRole.Owner && (
                            <>
                              <button
                                disabled={editIndex !== -1}
                                className="member-table-function edit"
                                onClick={() => {
                                  onEditUser(index, user);
                                }}
                              >
                                <MdEdit title="Edit" />
                              </button>
                              <button
                                className="member-table-function delete"
                                disabled={editIndex !== -1}
                                onClick={() => {
                                  onRemoveUser(index);
                                }}
                              >
                                <MdDelete title="Delete" />
                              </button>
                            </>
                          )}

                          {deleteIndex === index && isShowModal && (
                            <Modal
                              type={ModalType.Alert}
                              description="Do you want to remove this user ?"
                              setShow={setShowModal}
                              show={isShowModal}
                              onAccept={() => {
                                handleRemoveUsers(index);
                                setDeleteIndex(-1);
                              }}
                            />
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {loading && <Loading fullScreen />}
      {isShowBox && <ShareModal setShowModal={setShowBox} />}
    </div>
  );
}

export default Member;
