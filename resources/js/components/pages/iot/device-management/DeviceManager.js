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
    const [selectedGroupOption, setSelectedGroupOption] = useState(null);
    const [searchKey, setSearchKey] = useState("");
    const [searchName, setSearchName] = useState("");
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
        let selectedOptionString = '';
        let selectedGroupOptionString = '';
        if(selectedOption && selectedOption.value){
            selectedOptionString = "&type=" + selectedOption.value;
        }
        if(selectedGroupOption && selectedGroupOption.value){
            selectedGroupOptionString = "&group=" + selectedGroupOption.value
        }
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices?page_number=" + pageNumber + "&page_size=" + pageSize + "&key=" + searchKey + "&device_name=" + searchName + selectedGroupOptionString + selectedOptionString,
            data => {
                setDeviceList(data);
                setLoaded(true);
            });

        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices/counts",
            count => {
                setTotalDevices(count.count);
            });
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

    function checkCSV(csvData){
        if(csvData.length === 0){
            return false;
        }
        return !!(csvData[0].Name && csvData[0].Serial && csvData[0].Facility && csvData[0].Group && csvData[0].Password && csvData[0].Remark && csvData[0].Interval);
    }

    function addMultipleDevices(e) {
        let file = e.target.files[0];
        if (file && file.type === 'text/csv') {
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                let jsonData = csvToJson(evt.target.result);
                if(!checkCSV(jsonData)){
                    toastRef.current.show({sticky: true, severity: 'error', summary: 'Invalid CSV file', detail: "The format of the CSV file is not valid.", life: 3000});
                    return;
                }
                let request_data = {
                    name: '',
                    serialNo: '',
                    typeOfFacility: '',
                    group: '',
                    devicePassword: '',
                    dataInterval: '',
                    remark: '',
                };
                let payload = [];
                for(let i = 0; i < jsonData.length; i++){
                    request_data.name = jsonData[i].Name;
                    request_data.serialNo = jsonData[i].Serial;
                    let facility = typeOptions.find(item=>item.label === jsonData[i].Facility);
                    if(facility){
                        request_data.typeOfFacility = facility.value;
                    } else {
                        continue;
                    }
                    let group = groupOptions.find(item=>item.label === jsonData[i].Group);
                    if(group){
                        request_data.group = group.value;
                    } else {
                        continue;
                    }
                    request_data.devicePassword = jsonData[i].Password;
                    request_data.dataInterval = jsonData[i].Interval;
                    request_data.remark = jsonData[i].Remark;
                    payload.push(request_data);
                }
                var toaster = toastRef.current;
                dataSource.PostRequest("/iot-service/v1/" + props.tenant + "/devices/multiple",
                    data => {
                        if(data.isAxiosError){
                            if(data.response.data=="Cannot add a new device with the same Serial Number!"){
                                toastRef.current.show({sticky: true, severity: 'warn', summary: 'Same IMEI is already in use.', detail: data.response.data, life: 5000});
                            }else{
                                toastRef.current.show({sticky: true, severity: 'warn', summary: 'Upgrade Subscription Plan', detail: data.response.data, life: 5000});
                            }
                            closeModal()
                            return;
                        }


                        if(data.length === 0){
                            searchDevice();
                            toaster.show({sticky: true, severity: 'success', summary: 'Success', detail: 'You have successfully added multiple devices.', life: 3000});
                        }
                        else {
                            toaster.show({sticky: true, severity: 'error', summary: 'Failed ' + data.length + ' items', detail: data[0].message, life: 3000});
                        }
                    }, payload);
            }
            reader.onerror = function (evt) {
                toastRef.current.show({sticky: true, severity: 'error', summary: 'Error in reading file', detail: 'It seems that there is an issue in the file.', life: 3000});
            }
        } else {
            toastRef.current.show({sticky: true, severity: 'error', summary: 'Invalid file format', detail: 'The file that you chose is not csv format.', life: 3000});
        }
    }

    function csvToJson(csv) {
        let lines = csv.split("\n");

        let result = [];

        // NOTE: If your columns contain commas in their values, you'll need
        // to deal with those before doing the next step
        // (you might convert them to &&& or something, then covert them back later)
        // jsfiddle showing the issue https://jsfiddle.net/
        let headers = lines[0].split(",");

        for (let i = 1; i < lines.length; i++) {
            let obj = {};
            let currentline = lines[i].split(",");

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }
        return result; // JSON
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
                    if(data.response.data=="Cannot add a new device with the same Serial Number!"){
                        toastRef.current.show({sticky: true, severity: 'warn', summary: 'Same IMEI is already in use.', detail: data.response.data, life: 5000});
                    }else{
                        toastRef.current.show({sticky: true, severity: 'warn', summary: 'Upgrade Subscription Plan', detail: data.response.data, life: 5000});
                    }
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
                <Col md={6} className="section-title mb-row">Device Management</Col>
                <Col md={6}>
                    <div className={"w-100 text-right"}>
                        {props.admin?
                            (
                                <>
                                    <Button className={"btn-success d-flex align-items-center float-right"}
                                            onClick={() => openModal(false)}><FontAwesomeIcon
                                        icon={faPlus} className={"me-1"}/> Add</Button>
                                    <div className={"w-100 text-right"}>
                                        <input type="file" id="selectedFile" className="d-none" onChange={addMultipleDevices}/>
                                        <Button className={"btn-primary d-flex align-items-center float-right me-2"}
                                                onClick={() => {
                                                    document.getElementById('selectedFile').click();
                                                }}>
                            <span className="inline-block mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="h-3 text-white w-4" viewBox="0 0 16 16">
                                <path
                                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path
                                    d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                              </svg>
                            </span>
                                            Import CSV
                                        </Button>
                                    </div>
                                </>
                            )
                            : ""}
                    </div>
                </Col>
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
                    <span className={"h6 me-2 mb-0"}>
                            Group
                        </span>
                    <Select
                        className="facility-type-value w-100"
                        defaultValue={selectedGroupOption}
                        onChange={setSelectedGroupOption}
                        options={groupOptions}
                    />
                </Col>
                <Col md={3} className={"d-flex align-items-center"}>
                    <span className={"h6 me-2 mb-0"}>Name</span>
                    <FormControl value={searchName} type="text" placeholder="Device Name"
                                 className="key-input-value me-2" onChange={searchNameChanged}/>
                </Col>
                <Col md={3} className={"d-flex align-items-center"}>
                    <span className={"h6 me-2 mb-0"}>Key</span>
                    <FormControl value={searchKey} type="text" placeholder="IMEI"
                                 className="key-input-value me-2" onChange={searchkeyChanged}/>
                    <Button className={"btn-primary d-flex align-items-center"}
                            onClick={() => searchDevice()}><FontAwesomeIcon
                        icon={faSearch} className={"me-1"}/> Search</Button>
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