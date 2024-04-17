import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdClose, MdDelete, MdEdit, MdSave } from "react-icons/md";
import ProjectRole from "../../enums/ProjectRole";
import { projectRoles } from "../../helper/Common";
import { useTheme } from "../../hooks/ThemeContext";
import { userSelects } from "../../mock/user";
import ProjectShareModel from "../../models/ProjectModel/ProjectShareModel";
import AutoComplete, { AutoCompleteItem } from "../AutoComplete/AutoComplete";
import Loading from "../Loading/Loading";
import Modal, { ModalType } from "../Modal/Modal";
import SelectBox from "../SelectBox/SelectBox";
import "./shareModal.css";

interface ShareModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SelectOption {
    text: string;
    value: string;
}

interface UserSharedItem {
    id: string;
    username: string;
    role: ProjectRole;
}

function ShareModal({ setShowModal }: ShareModalProps) {
    const { theme } = useTheme();
    const [users, setUsers] = useState<AutoCompleteItem[]>([]);
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [userShared, setUserShared] = useState<UserSharedItem[]>([]);
    const [isAddingUser, setAddingUser] = useState(false);
    const [isEditingUser, setEditingUser] = useState(false);
    const [newUser, setNewUser] = useState<UserSharedItem>({
        id: "",
        username: "",
        role: ProjectRole.Viewer,
    });

    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [isShowDialog, setShowDialog] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleCloseModal = () => {
        if (userShared.length === 0) setShowModal(false);
        else {
            setShowDialog(true);
        }
    };

    const onRemoveUser = (index: number) => {
        setDeleteIndex(index);
        setShowDialog(true);
    };

    const handleRemoveUsers = (index: number) => {
        setUserShared((users) =>
            users.filter((user, listIndex) => listIndex !== index)
        );
        setDeleteIndex(-1);
    };

    const onSearch = async (data: string) => {
        console.log("search");
        await new Promise((r) => setTimeout(r, 500));
        setUsers(
            userSelects.map<AutoCompleteItem>((user) => ({
                label: user.username,
                value: user.id,
            }))
        );
    };

    const onSelect = (data: AutoCompleteItem) => {
        setNewUser({
            id: data.value,
            username: data.label,
            role: newUser.role,
        });
    };

    const handleSelectRole = (role: ProjectRole) => {
        setNewUser({
            id: newUser.id,
            username: newUser.username,
            role,
        });
    };

    const handleAddUser = () => {
        setUserShared([...userShared, newUser]);
        setNewUser({
            id: "",
            username: "",
            role: newUser.role,
        });
        setAddingUser(false);
    };

    const handleCancelAddUser = () => {
        setAddingUser(false);
        setNewUser({
            id: "",
            username: "",
            role: newUser.role,
        });
    };

    const onEditUser = (index: number, userShared: UserSharedItem) => {
        setEditIndex(index);
        setNewUser(userShared);
        setEditingUser(true);
    };

    const handleCancelEdit = () => {
        setEditIndex(-1);
        setEditingUser(false);
        setNewUser({
            id: "",
            username: "",
            role: newUser.role,
        });
    };

    const handleEditUser = () => {
        userShared[editIndex] = { ...newUser };
        setUserShared(userShared);
        setNewUser({
            id: "",
            username: "",
            role: newUser.role,
        });
        setEditIndex(-1);
        setEditingUser(false);
    };

    const handleShare = async () => {
        const userShares = userShared.map<ProjectShareModel>((user) => ({
            id: user.id,
            role: user.role,
        }));
        console.log(userShares);
        setLoading(true);
        await new Promise((r) => setTimeout(r, 2000));
        setLoading(false);
        setShowModal(false);
    };

    return (
        <div className={`shareModal ${theme}`}>
            <div className='shareModal-container'>
                <div className='shareModal-title'>
                    Add members to the project
                </div>

                <div className='shareModal-list'>
                    <table className='shareModal-table'>
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        borderTopLeftRadius: "10px",
                                        width: "65px",
                                    }}
                                >
                                    Index
                                </th>
                                <th style={{ width: "170px" }}>Username</th>
                                <th style={{ width: "127px" }}>Role</th>
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
                            {userShared.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {index === editIndex ? (
                                        <>
                                            <td>
                                                <div>
                                                    <AutoComplete
                                                        onSearch={onSearch}
                                                        dataSource={users}
                                                        onSelect={onSelect}
                                                        selectedItem={{
                                                            label: user.username,
                                                            value: user.id,
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <SelectBox
                                                        options={projectRoles}
                                                        onSelect={
                                                            handleSelectRole
                                                        }
                                                        width={100}
                                                        small
                                                        selectedValue={
                                                            user.role
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className='shareModal-table-actions'>
                                                <button
                                                    className='shareModal-table-function save'
                                                    onClick={handleEditUser}
                                                >
                                                    <MdSave title='Save' />
                                                </button>
                                                <button
                                                    className='shareModal-table-function delete'
                                                    onClick={handleCancelEdit}
                                                >
                                                    <MdClose title='Cancel' />
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>
                                                <span>{user.username}</span>
                                            </td>
                                            <td>{ProjectRole[user.role]}</td>
                                            <td className='shareModal-table-actions'>
                                                <button
                                                    disabled={
                                                        isEditingUser ||
                                                        isAddingUser
                                                    }
                                                    className='shareModal-table-function edit'
                                                    onClick={() => {
                                                        onEditUser(index, user);
                                                    }}
                                                >
                                                    <MdEdit title='Edit' />
                                                </button>
                                                <button
                                                    className='shareModal-table-function delete'
                                                    disabled={
                                                        isEditingUser ||
                                                        isAddingUser
                                                    }
                                                    onClick={() => {
                                                        onRemoveUser(index);
                                                    }}
                                                >
                                                    <MdDelete title='Delete' />
                                                </button>

                                                {deleteIndex === index &&
                                                    isShowDialog && (
                                                        <Modal
                                                            type={
                                                                ModalType.Alert
                                                            }
                                                            description='Do you want to remove this user ?'
                                                            setShow={
                                                                setShowDialog
                                                            }
                                                            show={isShowDialog}
                                                            onAccept={() => {
                                                                handleRemoveUsers(
                                                                    index
                                                                );
                                                                setDeleteIndex(
                                                                    -1
                                                                );
                                                            }}
                                                        />
                                                    )}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}

                            {isAddingUser && (
                                <tr>
                                    <>
                                        <td>{userShared.length + 1}</td>
                                        <td>
                                            <div>
                                                <AutoComplete
                                                    onSearch={onSearch}
                                                    dataSource={users}
                                                    onSelect={onSelect}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <SelectBox
                                                    options={projectRoles}
                                                    onSelect={handleSelectRole}
                                                    width={100}
                                                    small
                                                    selectedValue={newUser.role}
                                                />
                                            </div>
                                        </td>
                                        <td className='shareModal-table-actions'>
                                            <button
                                                className='shareModal-table-function save'
                                                onClick={handleAddUser}
                                                disabled={
                                                    newUser.username.length ===
                                                    0
                                                }
                                            >
                                                <MdSave title='Save' />
                                            </button>
                                            <button
                                                className='shareModal-table-function delete'
                                                onClick={handleCancelAddUser}
                                            >
                                                <MdClose title='Delete' />
                                            </button>
                                        </td>
                                    </>
                                </tr>
                            )}
                            <tr>
                                <td colSpan={4}>
                                    {(!isAddingUser ||
                                        userShared.length !== 0) && (
                                        <div className='shareModal-add'>
                                            {!isAddingUser &&
                                                !isEditingUser && (
                                                    <div
                                                        className='shareModal-add-container'
                                                        onClick={() => {
                                                            setAddingUser(true);
                                                        }}
                                                    >
                                                        <span className='shareModal-add-icon'>
                                                            <IoMdAdd />
                                                        </span>
                                                        Add more
                                                    </div>
                                                )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='shareModal-function'>
                    <button
                        className='shareModal-function-button cancel'
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                    <button
                        className='shareModal-function-button share'
                        disabled={userShared.length === 0}
                        onClick={handleShare}
                    >
                        Share
                    </button>
                </div>
            </div>
            <Modal
                description='Do you want to cancel this sharing?'
                show={isShowDialog && deleteIndex === -1}
                setShow={setShowDialog}
                onAccept={() => setShowModal(false)}
            />
            {loading && <Loading fullScreen />}
        </div>
    );
}

export default ShareModal;
