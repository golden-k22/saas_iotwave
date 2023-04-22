import React, {useState, useEffect} from 'react';
import {GatewayTable} from "./GatewayTable";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Col, Row, Button, FormControl} from '@themesberg/react-bootstrap';
import Select from 'react-select';
import Modal from "react-modal";
import Preloader from "../../../components/Preloader";
import AddEditModal from "./modal/AddEditModal";
import RemoveModal from "./modal/RemoveModal";
import DetailModal from "./modal/DetailModal";
import ReactDOM from "react-dom";
import {RestDataSource} from "../../../../service/RestDataSource";
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

if (document.getElementById('gateway-dashboard')) {
    Modal.setAppElement('#gateway-dashboard');
}


const GatewayManager = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [typeOptions, setTypeOptions] = useState([]);

    const [selectedOption, setSelectedOption] = useState(null);
    const [searchKey, setSearchKey] = useState("");
    const [searchName, setSearchName] = useState("");
    const [isLoaded, setLoaded] = useState(false);
    const [deviceList, setDeviceList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [totalDevices, setTotalDevices] = useState(0);
    const dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => console.log("Server connection failed."));
    const [duplicated, setDuplicated] = useState(false);
    const toastRef = React.createRef();

    useEffect(() => {
        dataSource.GetRequest("/iot-service/v1/gateways/types",
            types => {
                let newOption = [{value: null, label: "No Select"}];
                types.map(type => {
                    newOption.push(
                        {
                            value: type.id, label: type.name
                        }
                    )
                });
                setTypeOptions(newOption);
            });
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/gateways?page_number=" + pageNumber + "&page_size=" + pageSize,
            data => {
                setDeviceList(data);
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/gateways/counts",
                    count => {
                        setTotalDevices(count.count);
                        setLoaded(true);
                    });
            });
    }, []);


    function searchkeyChanged(event) {
        let text = event.target.value;
        if (text !== null) {
            setSearchKey(event.target.value);
        }
    }

    function searchNameChanged(event) {
        let text = event.target.value;
        if (text !== null) {
            setSearchName(event.target.value);
        }
    }

    function searchDevice() {
        if (selectedOption == null) {
            dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/gateways?page_number=" + pageNumber + "&page_size=" + pageSize + "&key=" + searchKey + "&device_name=" + searchName,
                data => {
                    setDeviceList(data);
                    setLoaded(true);
                });
        }
        else {
            if (selectedOption.value == null) {
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/gateways?page_number=" + pageNumber + "&page_size=" + pageSize + "&key=" + searchKey + "&device_name=" + searchName,
                    data => {
                        setDeviceList(data);
                        setLoaded(true);
                    });
            } else {
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/gateways?page_number=" + pageNumber + "&page_size=" + pageSize + "&type=" + selectedOption.value + "&key=" + searchKey + "&device_name=" + searchName,
                    data => {
                        setDeviceList(data);
                        setLoaded(true);
                    });
            }

        }
    }

    function onPagenationChange(page_number) {
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/gateways?page_number=" + page_number + "&page_size=" + pageSize,
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
    function openModal(isEdit, device) {
        setIsEdit(isEdit);
        setSelectedDevice(device);
        setIsOpen(true);
    }

    function closeModal() {
        setDuplicated(false);
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


    function addDevice(id, deviceName, imei, selectedFacility, remark) {
        let request_data = {
            name: deviceName,
            imei: imei,
            typeOfFacility: selectedFacility.value,
            remark: remark,
        };
        dataSource.PostRequest("/iot-service/v1/" + props.tenant + "/gateways",
            data => {
                if(data.isAxiosError){
                    if(data.response.data=="Same IMEI is already in use. please Select difference Device or IMEI"){
                        toastRef.current.show({sticky: true, severity: 'warn', summary: 'Same IMEI is already in use.', detail: data.response.data, life: 5000});
                    }else{
                        toastRef.current.show({sticky: true, severity: 'warn', summary: 'Upgrade Subscription Plan', detail: data.response.data, life: 5000});
                    }
                    closeModal()
                    return;
                }
                
                let updatedList = [...deviceList];
                let isExist = updatedList.filter((gateway) => {
                    return gateway.imei == data.imei;
                });
                if (isExist.length == 0) {
                    setIsOpen(false);
                    updatedList.push(data);
                    setDeviceList(updatedList);
                    dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/gateways/counts",
                        count => {
                            setTotalDevices(count.count);
                        });
                } else {
                    setDuplicated(true);
                }

            }, request_data);
    }

    function editDevice(id, deviceName, imei, selectedFacility, remark) {
        setIsOpen(false);
        let request_data = {
            name: deviceName,
            imei: imei,
            typeOfFacility: selectedFacility.value,
            remark: remark,
        };
        dataSource.PostRequest("/iot-service/v1/" + props.tenant + "/gateways/" + id,
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
        dataSource.DeleteRequest("/iot-service/v1/" + props.tenant + "/gateways/" + id,
            data => {
                let updatedList = [];
                deviceList.map(device => {
                    if (device.id !== id) {
                        updatedList.push(device)
                    }
                });
                setDeviceList(updatedList);
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/gateways/counts",
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
                <span className="section-title mb-row">Gateway Management</span>
            </Row>
            <Row className="mb-3">
                <Col md={3} className={"d-flex align-items-center"}>
                    <span className={"h6 me-2 mb-0"}>
                            Type of facility
                        </span>
                    <Select
                        className="facility-type-value w-50"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={typeOptions}
                    />
                </Col>
                <Col md={3} className={"d-flex align-items-center"}>
                    <span className={"h6 me-2 mb-0"}>Name</span>
                    <FormControl value={searchName} type="text" placeholder="Device Name"
                                 className="key-input-value me-2" onChange={searchNameChanged}/>
                </Col>
                <Col md={4} className={"d-flex align-items-center"}>
                        <span className={"h6 me-2 mb-0"}>Key</span>
                        <FormControl value={searchKey} type="text" placeholder="IMEI"
                                     className="key-input-value me-2" onChange={searchkeyChanged}/>
                        <Button className={"btn-primary d-flex align-items-center"}
                                onClick={() => searchDevice()}><FontAwesomeIcon
                            icon={faSearch} className={"me-1"}/> Search</Button>
                </Col>
                <Col md={2}>
                    <div className={"w-100 text-right"}>
                        {props.admin? <Button className={"btn-success d-flex align-items-center float-right"}
                                              onClick={() => openModal(false)}><FontAwesomeIcon
                            icon={faPlus} className={"me-1"}/> Add</Button> : ""}
                    </div>
                </Col>
            </Row>
            <div>
                {!isLoaded ?
                    <div className='preloader-container'><Preloader show={true}/></div> :
                    <GatewayTable admin={props.admin} deviceList={deviceList} typeOptions={typeOptions} onEditClick={openModal}
                                  onDetailClick={openDetailModal}
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
                <DetailModal onClose={closeDetailModal} selectedDevice={selectedDevice}
                             typeOptions={typeOptions}></DetailModal>
            </Modal>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Edit Modal"
            >
                <h4 className="modal-title">{isEdit ? "Edit Gateway" : "Add Gateway"}</h4>
                <AddEditModal onClose={closeModal} onSubmit={!isEdit ? addDevice : editDevice} typeOptions={typeOptions}
                              isEdit={isEdit} selectedDevice={selectedDevice} duplicated={duplicated}></AddEditModal>
            </Modal>
            <Modal
                isOpen={removeModalIsOpen}
                onRequestClose={closeRemoveModal}
                style={customStyles}
                contentLabel="Remove Modal"
            >
                <h4 className="modal-title">Do you want to delete this gateway ?</h4>
                <RemoveModal onClose={closeRemoveModal} onSubmit={deleteDevice}
                             selectedDevice={selectedDevice}></RemoveModal>
            </Modal>
        </div>
    );
};
export default GatewayManager;

if (document.getElementById('gateway-dashboard')) {
    let admin = false;
    let tenant = document.documentURI.split("/")[3];
    let user = document.getElementById("gateway-dashboard").getAttribute("data-user");
    if(user === tenant){
        admin = true;
    }
    ReactDOM.render(<GatewayManager tenant={tenant} admin={admin}/>, document.getElementById('gateway-dashboard'));
}