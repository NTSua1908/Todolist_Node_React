import React, { useState } from "react";
import { userSelects } from "../../mock/user";
import AutoComplete, { AutoCompleteItem } from "../AutoComplete/AutoComplete";
import { IoIosCloseCircle } from "react-icons/io";
import "./shareModal.css";
import SelectBox, { SelectBoxOption } from "../SelectBox/SelectBox";
import ProjectRole from "../../enums/ProjectRole";
import ProjectShareModel from "../../models/ProjectModel/ProjectShareModel";
import { FaCheck } from "react-icons/fa";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";

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

const projectRoles: SelectBoxOption[] = [
    {
        name: ProjectRole[ProjectRole.Editor],
        value: ProjectRole.Editor,
    },
    {
        name: ProjectRole[ProjectRole.Viewer],
        value: ProjectRole.Viewer,
    },
];

function ShareModal({ setShowModal }: ShareModalProps) {
    const [users, setUsers] = useState<AutoCompleteItem[]>([]);

    const [editIndex, setEditIndex] = useState<number>(-1);
    const [userShared, setUserShared] = useState<UserSharedItem[]>([]);
    const [isAddingUser, setAddingUser] = useState(false);
    const [newUser, setNewUser] = useState<UserSharedItem>({
        id: "",
        username: "",
        role: ProjectRole.Viewer,
    });

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

    return (
        <div className='shareModal'>
            <div className='shareModal-container'>
                <div className='shareModal-title'>Add members to project</div>
                <div
                    className='shareModal-close'
                    onClick={() => {
                        setShowModal(false);
                    }}
                >
                    <IoIosCloseCircle />
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
                                                <AutoComplete
                                                    onSearch={onSearch}
                                                    dataSource={users}
                                                    onSelect={onSelect}
                                                />
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
                                                    />
                                                </div>
                                            </td>
                                            <td className='shareModal-table-actions'>
                                                <div className='shareModal-table-function save'>
                                                    <MdSave title='Save' />
                                                </div>
                                                <div className='shareModal-table-function delete'>
                                                    <MdDelete title='Delete' />
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{user.username}</td>
                                            <td>{ProjectRole[user.role]}</td>
                                            <td className='shareModal-table-actions'>
                                                <div
                                                    className='shareModal-table-function edit'
                                                    onClick={() =>
                                                        setEditIndex(index)
                                                    }
                                                >
                                                    <MdEdit />
                                                </div>
                                                <div className='shareModal-table-function delete'>
                                                    <MdDelete title='Delete' />
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            {!isAddingUser && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className='shareModal-add'
                                        onClick={() => {
                                            setAddingUser(true);
                                        }}
                                    >
                                        Add users
                                    </td>
                                </tr>
                            )}
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
                                            <button className='shareModal-table-function delete'>
                                                <MdDelete title='Delete' />
                                            </button>
                                        </td>
                                    </>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ShareModal;
