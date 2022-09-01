import React, {useState, useEffect} from 'react';
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

    const [selectedOption, setSelectedOption] = useState(null);
    const [searchKey, setSearchKey] = useState("");

    const [isLoaded, setLoaded] = useState(false);
    const [alarmList, setAlarmList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedAlarm, setSelectedAlarm] = useState(null);
    const [totalAlarms, setTotalAlarms] = useState(0);


    useEffect(() => {
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
        if (selectedOption == null) {
            props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms?alarm_type=" + ALARM_TYPE + "&page_number=" + pageNumber + "&page_size=" + pageSize + "&device_sn=" + searchKey,
                data => {
                    setAlarmList(data);
                    setLoaded(true);
                });
        } else {
            if (selectedOption.value == null) {
                props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms?alarm_type=" + ALARM_TYPE + "&page_number=" + pageNumber + "&page_size=" + pageSize + "&device_sn=" + searchKey,
                    data => {
                        setAlarmList(data);
                        setLoaded(true);
                    });
            } else {
                props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms?alarm_type=" + ALARM_TYPE + "&page_number=" + pageNumber + "&page_size=" + pageSize + "&device_name=" + selectedOption.value + "&device_sn=" + searchKey,
                    data => {
                        setAlarmList(data);
                        setLoaded(true);
                    });
            }
        }
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


    function addAlarm(id, selectedDevice, dateRange, alarmSetting) {
        setIsOpen(false);
        let dateFrom = convertTotalLocalTimeToUTCString(dateRange[0]);
        let dateTo = convertTotalLocalTimeToUTCString(dateRange[1]);
        let timeFrom = convertHoursToUTCString(alarmSetting.time_from);
        let timeTo = convertHoursToUTCString(alarmSetting.time_to);

        let request_data = {
            alarmName: alarmSetting.name,
            alarmType: ALARM_TYPE, // 0:temperature, 1:humidity, 2:voltage, 3: security
            objectId: selectedDevice.value,
            lowWarning: alarmSetting.low_warning == "" ? null : alarmSetting.low_warning,
            highWarning: alarmSetting.high_warning == "" ? null : alarmSetting.high_warning,
            lowThreshold: alarmSetting.low_threshold == "" ? null : alarmSetting.low_threshold,
            highThreshold: alarmSetting.high_threshold == "" ? null : alarmSetting.high_threshold,
            offlineTime: alarmSetting.offline_time == "" ? null : alarmSetting.offline_time,
            effectiveDateFrom: dateFrom,
            effectiveDateTo: dateTo,
            repeat: alarmSetting.repeat,
            effectiveTimeFrom: timeFrom,
            effectiveTimeTo: timeTo,
        };
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

    function editAlarm(id, selectedDevice, dateRange, alarmSetting) {
        setIsOpen(false);
        let dateFrom = convertTotalLocalTimeToUTCString(dateRange[0]);
        let dateTo = convertTotalLocalTimeToUTCString(dateRange[1]);
        let timeFrom = convertHoursToUTCString(alarmSetting.time_from);
        let timeTo = convertHoursToUTCString(alarmSetting.time_to);

        let request_data = {
            alarmName: alarmSetting.name,
            alarmType: ALARM_TYPE, // 0:temperature, 1:humidity, 2:voltage, 3: security
            objectId: selectedDevice.value,
            lowWarning: alarmSetting.low_warning,
            highWarning: alarmSetting.high_warning,
            lowThreshold: alarmSetting.low_threshold,
            highThreshold: alarmSetting.high_threshold,
            offlineTime: alarmSetting.offline_time,
            effectiveDateFrom: dateFrom,
            effectiveDateTo: dateTo,
            repeat: alarmSetting.repeat,
            effectiveTimeFrom: timeFrom,
            effectiveTimeTo: timeTo,
        };
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


    const subject = ALARM_TYPE === 0 ? "Temperature" : ALARM_TYPE === 1 ? "Humidity" : ALARM_TYPE === 2 ? "Voltage" : ALARM_TYPE === 3 ? "Security" : "";
    return (
        <div className="device-manage-container">
            <Row className='top-section '>
                <span className="section-title mb-row">{subject} Alarm Settings</span>
            </Row>
            <Row className="mb-3">
                <Col md={5} className={"d-flex align-items-center"}>
                    <span className={"h6 me-2"}>
                            Device Name
                        </span>
                    <Select
                        className="facility-type-value w-50"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={deviceOptions}
                    />
                </Col>
                <Col md={4} className={"d-flex align-items-center"}>
                    <span className={"h6 me-2"}>SN/IMEI</span>
                    <FormControl value={searchKey} type="text" placeholder="SN/IMEI"
                                 className="key-input-value me-2" onChange={searchkeyChanged}/>
                    <Button className={"btn-primary d-flex align-items-center"}
                            onClick={() => searchDevice()}><FontAwesomeIcon
                        icon={faSearch} className={"me-1"}/> Search</Button>
                </Col>
                <Col md={3}>
                    <div className={"w-100 text-right"}>
                        {props.admin ? <Button className={"btn-success d-flex align-items-center float-right"}
                                               onClick={() => openModal(false)}><FontAwesomeIcon
                            icon={faPlus} className={"me-1"}/> Add</Button> : ""}
                    </div>
                </Col>
            </Row>
            <div className={"w-100"}>
                {!isLoaded ?
                    <div className='preloader-container'><Preloader show={true}/></div> :
                    <AlarmSettingTable admin={props.admin} alarmList={alarmList} deviceOptions={deviceOptions}
                                       onEditClick={openModal} onRemoveClick={openRemoveModal}
                                       onPagenationCallback={onPagenationChange}
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
                              deviceOptions={deviceOptions}
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