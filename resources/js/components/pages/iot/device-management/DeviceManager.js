import React, {useState, useEffect, createRef} from 'react';
import {DeviceTable} from "./DeviceTable";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Col, Row, Button, FormControl} from '@themesberg/react-bootstrap';
import Select from 'react-select';
import Modal from "react-modal";
import Preloader from "../../../components/Preloader";
import AddEditModal from "./modal/AddEditModal";
import RemoveModal from "./modal/RemoveModal";
import DetailModal from "./modal/DetailModal";
import {RestDataSource} from "../../../../service/RestDataSource";
import ReactDOM from "react-dom";
import '../../../scss/management-table-style.scss';
import '../../../scss/volt.scss';
import {Toast} from "primereact/toast";

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

if (document.getElementById('device-dashboard')) {
    Modal.setAppElement('#device-dashboard');
}


const DeviceManager = (props) => {
    const toastRef = createRef();
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [groupOptions, setGroupOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);

    const [selectedOption, setSelectedOption] = useState(null);
    const [searchKey, setSearchKey] = useState("");
    const [isLoaded, setLoaded] = useState(false);
    const [deviceList, setDeviceList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [totalDevices, setTotalDevices] = useState(0);
    const dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => console.log("Server connection failed."));


    useEffect(() => {
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/groups",
            groups => {
                let newOption = [{value:null, label: "No Select"}];
                groups.map(group => {
                    newOption.push(
                        {
                            value: group.id, label: group.name
                        }
                    )
                })
                setGroupOptions(newOption);
            });
        dataSource.GetRequest("/iot-service/v1/devices/types",
            types => {
                let newOption = [{value:null, label: "No Select"}];
                types.map(type => {
                    newOption.push(
                        {
                            value: type.id, label: type.name
                        }
                    )
                })
                setTypeOptions(newOption);
            });
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices?page_number=" + pageNumber + "&page_size=" + pageSize,
            data => {
                setDeviceList(data);
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices/counts",
                    count => {
                        setTotalDevices(count.count);
                        setLoaded(true);
                        // dataSource.GetRequest("/iot-service/v1/devices/groups",
                        //     groups => {
                        //         let newOption = []
                        //         groups.map(group => {
                        //             newOption.push(
                        //                 {
                        //                     value: group.id, label: group.name
                        //                 }
                        //             )
                        //         })
                        //         setGroupOptions(newOption);
                        //         setLoaded(true);
                        //     });
                    });
            });
    }, []);

    // function onChange(){
    //     console.log("clicked");
    // }
    //
    // function onSearchClicked(searchTxt) {
    //     console.log("search clicked.", searchTxt)
    // }


    function searchkeyChanged(event) {
        let text = event.target.value;
        if (text !== null) {
            setSearchKey(event.target.value);
        }
    }

    function searchDevice() {
        if (selectedOption == null) {
            dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices?page_number=" + pageNumber + "&page_size=" + pageSize + "&key=" + searchKey,
                data => {
                    setDeviceList(data);
                    setLoaded(true);
                });
        }
        else {
            if (selectedOption.value==null){
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices?page_number=" + pageNumber + "&page_size=" + pageSize + "&key=" + searchKey,
                    data => {
                        setDeviceList(data);
                        setLoaded(true);
                    });
            } else {
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices?page_number=" + pageNumber + "&page_size=" + pageSize + "&type=" + selectedOption.value + "&key=" + searchKey,
                    data => {
                        setDeviceList(data);
                        setLoaded(true);
                    });
            }

        }
    }

    function onPagenationChange(page_number) {
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices?page_number=" + page_number + "&page_size=" + pageSize,
            data => {
                setDeviceList(data);
                setLoaded(true);
            });
    }

    /**
     * Modal settings.
     * **/
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [removeModalIsOpen, setRemoveModalIsOpen] = React.useState(false);
    const [detailModalIsOpen, setDetailModalIsOpen] = React.useState(false);

    /** Add/Edit Modal **/
    function openModal(isEdit, device_info) {
        setIsEdit(isEdit);
        setSelectedDevice(device_info);
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    /** Remove Modal  **/

    function openRemoveModal(device) {
        setSelectedDevice(device);
        setRemoveModalIsOpen(true);
    }

    function closeRemoveModal() {
        setRemoveModalIsOpen(false);
    }

    /** Detail Modal  **/

    function openDetailModal(device) {
        setSelectedDevice(device);
        setDetailModalIsOpen(true);
    }

    function closeDetailModal() {
        setDetailModalIsOpen(false);
    }


    function addDevice(id, deviceName, imei, selectedFacility, selectedGroup, devicePassword, dataInterval, remark) {
        let request_data = {
            name: deviceName,
            serialNo: imei,
            typeOfFacility: selectedFacility.value,
            group: selectedGroup.value,
            devicePassword: devicePassword,
            dataInterval: dataInterval,
            remark: remark,
        };
        dataSource.PostRequest("/iot-service/v1/" + props.tenant + "/devices",
            data => {
                if(data.isAxiosError){
                    toastRef.current.show({sticky: true, severity: 'warn', summary: 'Upgrade Subscription Plan', detail: data.response.data.message, life: 5000});
                    closeModal()
                    return;
                }

                let updatedList = [...deviceList];
                updatedList.push(data);
                setDeviceList(updatedList);

                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices/counts",
                    count => {
                        setTotalDevices(count.count);
                    });

                closeModal()
            }, request_data);
    }

    function editDevice(id, deviceName, imei, selectedFacility, selectedGroup, devicePassword, dataInterval, remark) {
        setIsOpen(false);
        let request_data = {
            name: deviceName,
            serialNo: imei,
            typeOfFacility: selectedFacility.value,
            group: selectedGroup.value,
            devicePassword: devicePassword,
            dataInterval: dataInterval,
            remark: remark,
            alarmIds: []
        };
        dataSource.PostRequest("/iot-service/v1/" + props.tenant + "/devices/" + id,
            data => {
                let updatedList = [];
                deviceList.map(device => {
                    if (device.id === id) {
                        updatedList.push(data)
                    } else {
                        updatedList.push(device)
                    }
                });
                setDeviceList(updatedList);
            }, request_data);
    }


    function deleteDevice(id) {
        setRemoveModalIsOpen(false);
        dataSource.DeleteRequest("/iot-service/v1/" + props.tenant + "/devices/" + id,
            data => {
                let updatedList = [];
                deviceList.map(device => {
                    if (device.id !== id) {
                        updatedList.push(device)
                    }
                });
                setDeviceList(updatedList);
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices/counts",
                    count => {
                        setTotalDevices(count.count);
                    });
            }
        );

    }

    /******************************************************/

    return (
        <div className="device-manage-container">
            <Toast ref={toastRef} position="bottom-right"/>
            <Row className='top-section'>
                <span className="section-title mb-row">Device Management</span>
            </Row>
            <Row className="mb-3">
                <Col md={5} className={"d-flex align-items-center"}>
                    <span className={"h6 me-2"}>
                            Type of facility
                        </span>
                    <Select
                        className="facility-type-value w-50"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={typeOptions}
                    />
                </Col>
                <Col md={4} className={"d-flex align-items-center"}>
                    <span className={"h6 me-2"}>Key</span>
                    <FormControl value={searchKey} type="text" placeholder="IMEI"
                                 className="key-input-value me-2" onChange={searchkeyChanged}/>
                    <Button className={"btn-primary d-flex align-items-center"}
                            onClick={() => searchDevice()}><FontAwesomeIcon
                        icon={faSearch} className={"me-1"}/> Search</Button>
                </Col>
                <Col md={3}>
                    <div className={"w-100 text-right"}>
                        {props.admin? <Button className={"btn-success d-flex align-items-center float-right"}
                                              onClick={() => openModal(false)}><FontAwesomeIcon
                            icon={faPlus} className={"me-1"}/> Add</Button> : ""}
                    </div>
                </Col>
            </Row>
            <div className={"w-100"}>
                {!isLoaded ?
                    <div className='preloader-container'><Preloader show={true}/></div> :
                    <DeviceTable admin={props.admin} deviceList={deviceList} groupOptions={groupOptions} typeOptions={typeOptions} onEditClick={openModal} onDetailClick={openDetailModal}
                                 onRemoveClick={openRemoveModal} onPagenationCallback={onPagenationChange}
                                 pageSize={pageSize} totalTransactions={totalDevices}/>
                }
            </div>
            <Modal
                isOpen={detailModalIsOpen}
                onRequestClose={closeDetailModal}
                style={customStyles}
                contentLabel="Detail Modal"
            >
                <h4 className="modal-title">Detail View</h4>
                <DetailModal onClose={closeDetailModal} selectedDevice={selectedDevice}  groupOptions={groupOptions} typeOptions={typeOptions}></DetailModal>
            </Modal>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Edit Modal"
            >
                <h4 className="modal-title">{isEdit ? "Edit Device" : "Add Device"}</h4>
                <AddEditModal onClose={closeModal} onSubmit={!isEdit ? addDevice : editDevice} groupOptions={groupOptions} typeOptions={typeOptions}
                              isEdit={isEdit} selectedDevice={selectedDevice}></AddEditModal>
            </Modal>
            <Modal
                isOpen={removeModalIsOpen}
                onRequestClose={closeRemoveModal}
                style={customStyles}
                contentLabel="Remove Modal"
            >
                <h4 className="mb-4">Remove Device</h4>
                <p className="mb-3">This is irreversible. We will destroy your device and all associated data. All device data will be scrubbed and irretrievable.</p>
                <RemoveModal onClose={closeRemoveModal} onSubmit={deleteDevice}
                             selectedDevice={selectedDevice}></RemoveModal>
            </Modal>
        </div>
    );
};
export default DeviceManager;

if (document.getElementById('device-dashboard')) {
    let admin = false;
    let tenant = document.documentURI.split("/")[3];
    let user = document.getElementById("device-dashboard").getAttribute("data-user");
    if(user === tenant){
        admin = true;
    }
    ReactDOM.render(<DeviceManager tenant={tenant} admin={admin}/>, document.getElementById('device-dashboard'));
}