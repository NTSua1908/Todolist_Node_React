import React, { useEffect, useState } from "react";
import "./stage.css";
import Header from "../../components/Header/Header";
import { IoIosAdd } from "react-icons/io";
import StageListModel from "../../models/StageModel/StageListModel";
import { useTheme } from "../../hooks/ThemeContext";
import { MdDelete, MdEdit } from "react-icons/md";
import { stageList } from "../../mock/stage";
import Loading from "../../components/Loading/Loading";
import Modal, { ModalType } from "../../components/Modal/Modal";
import AddStageBox from "../../components/AddStageBox/AddStageBox";

function Stage() {
    const [stages, setStages] = useState<StageListModel[]>([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);

    const [actionStageId, setActionStageId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isShowBox, setShowBox] = useState(false);
    const [isShowModal, setShowModal] = useState(false);

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
            { id: "", name, percentComplete: 100, taskCount: 0 },
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

    const handleDeleteStage = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setStages(stages.filter((stage) => stage.id !== actionStageId));
        setActionStageId(null);
        setLoading(false);
    };

    return (
        <div className={`stage ${theme}`}>
            <Header />
            <div className='stage-container'>
                <div className='stage-header'>
                    <div className='stage-header-title'>Stages</div>
                    <div className='stage-header-button'>
                        <button
                            title='Add new stage'
                            onClick={() => {
                                setShowBox(true);
                            }}
                        >
                            <span className='stage-header-button-icon'>
                                <IoIosAdd />
                            </span>
                            New stage
                        </button>
                    </div>
                </div>
                <div className='stage-content'>
                    <div className='stage-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Total tasks</th>
                                    <th>
                                        Percent <br />
                                        completed
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {stages.map((stage, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td width={200}> {stage.name}</td>
                                        <td>{stage.taskCount}</td>
                                        <td>{stage.percentComplete}%</td>
                                        <td>
                                            <div className='stage-table-actions'>
                                                <button
                                                    className='stage-table-function edit'
                                                    onClick={() => {
                                                        setActionStageId(
                                                            stage.id
                                                        );
                                                        setShowBox(true);
                                                    }}
                                                >
                                                    <MdEdit title='Edit' />
                                                </button>
                                                <button
                                                    className='stage-table-function delete'
                                                    onClick={() => {
                                                        setActionStageId(
                                                            stage.id
                                                        );
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <MdDelete title='Delete' />
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
                description='Do you want to delete this stage?'
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
                    value={
                        stages.find((stage) => stage.id === actionStageId)?.name
                    }
                />
            )}
            {loading && <Loading fullScreen />}
        </div>
    );
}

export default Stage;
