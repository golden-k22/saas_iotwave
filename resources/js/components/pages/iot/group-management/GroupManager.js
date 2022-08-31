import React, {useState, useEffect,useRef } from 'react';
import {GroupTable} from "./GroupTable";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Col, Row, Button} from '@themesberg/react-bootstrap';
import Modal from "react-modal";
import Preloader from "../../../components/Preloader";
import AddEditModal from "./modal/AddEditModal";
import RemoveModal from "./modal/RemoveModal";
import ReactDOM from "react-dom";
import '../../../scss/management-table-style.scss';
import '../../../scss/volt.scss';
import {RestDataSource} from "../../../../service/RestDataSource";
import {Toast} from "primereact/toast";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const customStyles = {
    content: {
        top: '45%',
        left: '55%',
        width: '600px',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

if (document.getElementById('group-dashboard')) {
    Modal.setAppElement('#group-dashboard');
}


const GroupManager = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [groupList, setGroupList] = useState([]);


    const [isLoaded, setLoaded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [totalGroups, setTotalGroups] = useState(0);
    const toastRef=useRef(null);
    const dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => console.log("Server connection failed."));

    useEffect(() => {
        dataSource.GetRequest("/iot-service/v1/" + props.tenant +"/groups?page_number=" + pageNumber + "&page_size=" + pageSize,
            groupList => {
                setGroupList(groupList);
                dataSource.GetRequest("/iot-service/v1/" + props.tenant +"/groups/counts",
                    count => {
                        setTotalGroups(count.count);
                        setLoaded(true);
                    });
            });
    }, []);

    function onPagenationChange(page_number) {
        dataSource.GetRequest("/iot-service/v1/" + props.tenant +"/groups?page_number=" + page_number + "&page_size=" + pageSize,
            data => {
                setGroupList(data);
                dataSource.GetRequest("/iot-service/v1/" + props.tenant +"/groups/counts",
                    count => {
                        setTotalGroups(count.count);
                        setLoaded(true);
                    });
            });
    }

    /**
     * Modal settings.
     * **/
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [removeModalIsOpen, setRemoveModalIsOpen] = React.useState(false);

    /** Add/ Edit Modal **/
    function openModal(isEdit, device_info) {
        setIsEdit(isEdit);
        setSelectedGroup(device_info);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    /** Remove Modal  **/
    function openRemoveModal(device) {
        setSelectedGroup(device);
        setRemoveModalIsOpen(true);
    }

    function closeRemoveModal() {
        setRemoveModalIsOpen(false);
    }

    function addGroup(id, name, remark) {
        setIsOpen(false);
        let request_data = {
            name: name,
            remark: remark,
        };
        dataSource.PostRequest("/iot-service/v1/" + props.tenant +"/groups",
            data => {
                let updatedList = [...groupList];
                updatedList.push(data);
                setGroupList(updatedList);
                dataSource.GetRequest("/iot-service/v1/" + props.tenant +"/groups/counts",
                    count => {
                        setTotalGroups(count.count);
                    });
            }, request_data);
    }

    function editGroup(id, name, remark) {
        setIsOpen(false);
        let request_data = {
            name: name,
            remark: remark,
            alarmIds: []
        };
        dataSource.PostRequest("/iot-service/v1/" + props.tenant +"/groups/" + id,
            data => {
                let updatedList = [];
                groupList.map(group => {
                    if (group.id === id) {
                        updatedList.push(data)
                    } else {
                        updatedList.push(group)
                    }
                });
                setGroupList(updatedList);
                dataSource.GetRequest("/iot-service/v1/" + props.tenant +"/groups/counts",
                    count => {
                        setTotalGroups(count.count);
                    });
            }, request_data);
    }


    function deleteGroup(id) {
        setRemoveModalIsOpen(false);
        dataSource.DeleteRequest("/iot-service/v1/" + props.tenant +"/groups/" + id,
            data => {
                if (data.is_used != 1){
                    let updatedList = [];
                    groupList.map(device => {
                        if (device.id !== id) {
                            updatedList.push(device)
                        }
                    });
                    setGroupList(updatedList);
                    dataSource.GetRequest("/iot-service/v1/" + props.tenant +"/groups/counts",
                        count => {
                            setTotalGroups(count.count);
                        });
                }else {
                    showToast("Group already in use.");
                }

            }
        );
    }


    /****************** Show Toast**************************/
    function showToast(message){
        if (message) {
            toastRef.current.show({severity: 'error', summary: 'Failed.', detail: message, life: 3000 });
        }
    }

    /****************************************************/
    return (
        <div className="device-manage-container">
            <Toast ref={toastRef} position="top-right"/>
            <Row className='top-section'>
                <Col>
                    <span className="section-title mb-row">Group Management</span>
                </Col>
                <Col className={"text-right"}>
                    {props.admin? <Button className={"btn-success d-flex align-items-center float-right"}
                                          onClick={() => openModal(false)}><FontAwesomeIcon
                        icon={faPlus} className={"me-1"}/> Add</Button> : ""}
                </Col>
            </Row>
            <div className={"w-100"}>
                {!isLoaded ?
                    <div className='preloader-container'><Preloader show={true}/></div> :
                    <GroupTable admin={props.admin} groupList={groupList} onEditClick={openModal} onRemoveClick={openRemoveModal}
                                onPagenationCallback={onPagenationChange}
                                pageSize={pageSize} totalTransactions={totalGroups}/>
                }
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Edit Modal"
            >
                <h4 className="modal-title">{isEdit ? "Edit group" : "Add Group"}</h4>
                <AddEditModal onClose={closeModal} onSubmit={!isEdit ? addGroup : editGroup}
                              isEdit={isEdit} selectedGroup={selectedGroup}></AddEditModal>
            </Modal>
            <Modal
                isOpen={removeModalIsOpen}
                onRequestClose={closeRemoveModal}
                style={customStyles}
                contentLabel="Remove Modal"
            >
                <h4 className="modal-title">Do you want to delete this Group ?</h4>
                <RemoveModal onClose={closeRemoveModal} onSubmit={deleteGroup}
                             selectedGroup={selectedGroup}></RemoveModal>
            </Modal>
        </div>
    );
};
export default GroupManager;

if (document.getElementById('group-dashboard')) {
    let admin = false;
    let tenant = document.documentURI.split("/")[3];
    let user = document.getElementById("group-dashboard").getAttribute("data-user");
    if(user === tenant){
        admin = true;
    }
    ReactDOM.render(<GroupManager tenant={tenant} admin={admin}/>, document.getElementById('group-dashboard'));
}