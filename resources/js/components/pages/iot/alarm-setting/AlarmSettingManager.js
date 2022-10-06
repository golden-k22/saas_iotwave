import React, {useState, useEffect, createRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Col, Row, Button, FormControl} from '@themesberg/react-bootstrap';
import Select from 'react-select';
import Modal from "react-modal";
import Preloader from "../../../components/Preloader";
import {AlarmSettingTable} from "./AlarmSettingTable";
import AddEditModal from "./modal/AddEditModal";
import RemoveModal from "./modal/RemoveModal";
import {convertHoursToUTCString, convertTotalLocalTimeToUTCString} from "../DateParser";
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

if (document.getElementById('alarm-setting-dashboard')) {
    Modal.setAppElement('#alarm-setting-dashboard');
}


const AlarmSettingManager = (props) => {
    const ALARM_TYPE = props.alarmType;
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [deviceOptions, setDeviceOptions] = useState([]);
    const toastRef = createRef();
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedGroupOption, setSelectedGroupOption] = useState(null);
    const [searchKey, setSearchKey] = useState("");
    const [groupOptions, setGroupOptions] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [alarmList, setAlarmList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedAlarm, setSelectedAlarm] = useState(null);
    const [totalAlarms, setTotalAlarms] = useState(0);


    useEffect(() => {
        props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/groups",
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
        props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices",
            data => {
                let newOption = [{value: null, label: "No Select"}];
                data.map(device => {
                    newOption.push(
                        {
                            value: device.sn, label: device.name
                        }
                    )
                });
                setDeviceOptions(newOption);
            });
        props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms?alarm_type=" + ALARM_TYPE + "&page_number=" + pageNumber + "&page_size=" + pageSize,
            data => {
                setAlarmList(data);
                props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/counts?alarm_type=" + ALARM_TYPE,
                    count => {
                        setTotalAlarms(count.count);
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

    function searchDevice() {
        let selectedOptionString = '';
        let selectedGroupOptionString = '';
        if(selectedOption && selectedOption.value){
            selectedOptionString = "&device_name=" + selectedOption.value;
        }
        if(selectedGroupOption && selectedGroupOption.value){
            selectedGroupOptionString = "&group=" + selectedGroupOption.value
        }
        props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms?alarm_type=" + ALARM_TYPE + "&page_number=" + pageNumber + "&page_size=" + pageSize + "&device_sn=" + searchKey + selectedGroupOptionString + selectedOptionString,
            data => {
                setAlarmList(data);
                setLoaded(true);
            });
    }

    function onPagenationChange(page_number) {
        props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms?alarm_type=" + ALARM_TYPE + "&page_number=" + page_number + "&page_size=" + pageSize,
            data => {
                setAlarmList(data);
                setLoaded(true);
            });
    }

    /**
     * Modal settings.
     * **/
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [removeModalIsOpen, setRemoveModalIsOpen] = React.useState(false);

    /** Add/Edit Modal **/
    function openModal(isEdit, alarm) {
        setIsEdit(isEdit);
        setSelectedAlarm(alarm);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    /** Remove Modal  **/

    function openRemoveModal(alarm) {
        setSelectedAlarm(alarm);
        setRemoveModalIsOpen(true);
    }

    function closeRemoveModal() {
        setRemoveModalIsOpen(false);
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


                let payload = [];
                for(let i = 0; i < jsonData.length; i++){
                    let request_data = {
                        alarmName: '',
                        alarmType: ALARM_TYPE, // 0:temperature, 1:humidity, 2:voltage, 3: security
                        objectId: '',
                        lowWarning: null,
                        highWarning: null,
                        lowThreshold: null,
                        highThreshold: null,
                        offlineTime: null,
                        effectiveDateFrom: '',
                        effectiveDateTo: '',
                        group_no: null,
                        repeat: ["1","1","1","1","1","1","1"],
                        effectiveTimeFrom: '',
                        effectiveTimeTo: '',
                    };

                    request_data.alarmName = jsonData[i].Alarm_Name;
                    let device = deviceOptions.find(item=>item.label === jsonData[i].Device_Name);
                    if(device){
                        request_data.objectId = device.value;
                    } else {
                        continue;
                    }
                    request_data.lowWarning = jsonData[i].LowWarning;
                    request_data.highWarning = jsonData[i].HighWarning;
                    request_data.lowThreshold = jsonData[i].LowThreshold;
                    request_data.highThreshold = jsonData[i].HighThreshold;
                    request_data.effectiveDateFrom = jsonData[i].EffectiveDateFrom;
                    request_data.effectiveDateTo = jsonData[i].EffectiveDateTo;
                    request_data.effectiveTimeFrom = jsonData[i].EffectiveTimeFrom;
                    request_data.effectiveTimeTo = jsonData[i].EffectiveTimeTo;

                    payload.push(request_data);
                }

                var toaster = toastRef.current;
                props.dataSource.PostRequest("/iot-service/v1/" + props.tenant + "/alarms/multiple",
                    data => {
                        if(data.length === 0){
                            searchDevice();
                            props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/counts?alarm_type=" + ALARM_TYPE,
                                count => {
                                    setTotalAlarms(count.count);
                                });
                            toaster.show({sticky: true, severity: 'success', summary: 'Success', detail: 'You have successfully added multiple alarms.', life: 3000});
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
                obj[headers[j].replaceAll("\"", "")] = currentline[j];
            }

            result.push(obj);
        }
        return result; // JSON
    }

    function checkCSV(csvData){
        if(csvData.length === 0){
            return false;
        }
        return !!(csvData[0].Alarm_Name && csvData[0].Device_Name && csvData[0].LowWarning);
    }

    function addAlarm(id, selectedDevice, dateRange, alarmSetting, selectedGroup) {
        setIsOpen(false);
        let dateFrom = convertTotalLocalTimeToUTCString(dateRange[0]);
        let dateTo = convertTotalLocalTimeToUTCString(dateRange[1]);
        let timeFrom = convertHoursToUTCString(alarmSetting.time_from);
        let timeTo = convertHoursToUTCString(alarmSetting.time_to);

        let request_data = {
            alarmName: alarmSetting.name,
            alarmType: ALARM_TYPE, // 0:temperature, 1:humidity, 2:voltage, 3: security
            objectId: selectedDevice? selectedDevice.value : '',
            lowWarning: alarmSetting.low_warning == "" ? null : alarmSetting.low_warning,
            highWarning: alarmSetting.high_warning == "" ? null : alarmSetting.high_warning,
            lowThreshold: alarmSetting.low_threshold == "" ? null : alarmSetting.low_threshold,
            highThreshold: alarmSetting.high_threshold == "" ? null : alarmSetting.high_threshold,
            offlineTime: alarmSetting.offline_time == "" ? null : alarmSetting.offline_time,
            effectiveDateFrom: dateFrom,
            group: selectedGroup? selectedGroup.value: '',
            effectiveDateTo: dateTo,
            repeat: alarmSetting.repeat,
            effectiveTimeFrom: timeFrom,
            effectiveTimeTo: timeTo,
        };
        selectedGroup? delete request_data.objectId: delete request_data.group;
        props.dataSource.PostRequest("/iot-service/v1/" + props.tenant + "/alarms",
            data => {
                let updatedList = [...alarmList];
                updatedList.push(data);
                setAlarmList(updatedList);
                props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/counts?alarm_type=" + ALARM_TYPE,
                    count => {
                        setTotalAlarms(count.count);
                    });
            }, request_data);
    }

    function editAlarm(id, selectedDevice, dateRange, alarmSetting, selectedGroup) {
        setIsOpen(false);
        let dateFrom = convertTotalLocalTimeToUTCString(dateRange[0]);
        let dateTo = convertTotalLocalTimeToUTCString(dateRange[1]);
        let timeFrom = convertHoursToUTCString(alarmSetting.time_from);
        let timeTo = convertHoursToUTCString(alarmSetting.time_to);

        let request_data = {
            alarmName: alarmSetting.name,
            alarmType: ALARM_TYPE, // 0:temperature, 1:humidity, 2:voltage, 3: security
            objectId: selectedDevice? selectedDevice.value : '',
            lowWarning: alarmSetting.low_warning,
            highWarning: alarmSetting.high_warning,
            lowThreshold: alarmSetting.low_threshold,
            highThreshold: alarmSetting.high_threshold,
            offlineTime: alarmSetting.offline_time,
            group: selectedGroup? selectedGroup.value: '',
            effectiveDateFrom: dateFrom,
            effectiveDateTo: dateTo,
            repeat: alarmSetting.repeat,
            effectiveTimeFrom: timeFrom,
            effectiveTimeTo: timeTo,
        };
        selectedGroup? delete request_data.objectId: delete request_data.group;
        props.dataSource.PostRequest("/iot-service/v1/" + props.tenant + "/alarms/" + id,
            data => {
                let updatedList = [];
                alarmList.map(alarm => {
                    if (alarm.id === id) {
                        updatedList.push(data)
                    } else {
                        updatedList.push(alarm)
                    }
                });
                setAlarmList(updatedList);
            }, request_data);
    }


    function deleteAlarm(id) {
        setRemoveModalIsOpen(false);
        props.dataSource.DeleteRequest("/iot-service/v1/" + props.tenant + "/alarms/" + id,
            data => {
                let updatedList = [];
                alarmList.map(device => {
                    if (device.id !== id) {
                        updatedList.push(device)
                    }
                });
                setAlarmList(updatedList);
                props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/counts?alarm_type=" + ALARM_TYPE,
                    count => {
                        setTotalAlarms(count.count);
                    });
            }
        );

    }

    /******************************************************/


    return (
        <div className="device-manage-container">
            <Toast ref={toastRef} position="bottom-right"/>
            <Row className='top-section '>
                <span className="section-title mb-row">{ALARM_TYPE === 0 ? "Temperature" : ALARM_TYPE === 1 ? "Humidity" : ALARM_TYPE === 2 ? "Voltage" : ALARM_TYPE === 3 ? "Security" : ""} Alarm Settings</span>
            </Row>
            <Row className="mb-3">
                <Col md={3} className={"d-flex align-items-center"}>
                    <span className={"h6 me-2 mb-0"}>
                            Device Name
                        </span>
                    <Select
                        className="facility-type-value w-50"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={deviceOptions}
                    />
                </Col>
                <Col md={3} className={"d-flex align-items-center"}>
                    <span className={"h6 me-2 mb-0"}>
                        Group
                    </span>
                    <Select
                        className="facility-type-value w-50"
                        defaultValue={setSelectedGroupOption}
                        onChange={setSelectedGroupOption}
                        options={groupOptions}
                    />
                </Col>
                <Col md={3} className={"d-flex align-items-center"}>
                    <span className={"h6 me-2 mb-0"}>SN/IMEI</span>
                    <FormControl value={searchKey} type="text" placeholder="SN/IMEI"
                                 className="key-input-value me-2" onChange={searchkeyChanged}/>
                    <Button className={"btn-primary d-flex align-items-center"}
                            onClick={() => searchDevice()}><FontAwesomeIcon
                        icon={faSearch} className={"me-1"}/> Search</Button>
                </Col>
                <Col md={3}>
                    <div className={"w-100 text-right"}>
                        {props.admin ?
                            (
                                <>
                                    <Button className={"btn-success d-flex align-items-center float-right"}
                                            onClick={() => openModal(false)}><FontAwesomeIcon
                                        icon={faPlus} className={"me-1"}/> Add</Button>
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
                                </>
                            ) : ""}
                    </div>
                </Col>
            </Row>
            <div className={"w-100"}>
                {!isLoaded ?
                    <div className='preloader-container'><Preloader show={true}/></div> :
                    <AlarmSettingTable admin={props.admin} alarmList={alarmList} deviceOptions={deviceOptions}
                                       onEditClick={openModal} onRemoveClick={openRemoveModal}
                                       onPagenationCallback={onPagenationChange} groupOptions={groupOptions}
                                       pageSize={pageSize} totalTransactions={totalAlarms} type={ALARM_TYPE}/>
                }
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Edit Modal"
            >
                <h4 className="modal-title">{isEdit ? "Edit Alarm" : "Add Alarm"}</h4>
                <AddEditModal onClose={closeModal} onSubmit={!isEdit ? addAlarm : editAlarm}
                              deviceOptions={deviceOptions} groupOptions={groupOptions}
                              isEdit={isEdit} selectedAlarm={selectedAlarm} type={ALARM_TYPE}></AddEditModal>
            </Modal>
            <Modal
                isOpen={removeModalIsOpen}
                onRequestClose={closeRemoveModal}
                style={customStyles}
                contentLabel="Remove Modal"
            >
                <h4 className="modal-title">Do you want to delete this alarm ?</h4>
                <RemoveModal onClose={closeRemoveModal} onSubmit={deleteAlarm}
                             selectedAlarm={selectedAlarm}></RemoveModal>
            </Modal>
        </div>
    );
};
export default AlarmSettingManager;