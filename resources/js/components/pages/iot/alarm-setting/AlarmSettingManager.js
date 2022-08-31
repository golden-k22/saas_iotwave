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
        props.dataSource.GetRequest("/iot-service/v1/devices",
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
        props.dataSource.GetRequest("/iot-service/v1/alarms?alarm_type=" + ALARM_TYPE + "&page_number=" + pageNumber + "&page_size=" + pageSize,
            data => {
                setAlarmList(data);
                props.dataSource.GetRequest("/iot-service/v1/alarms/counts?alarm_type=" + ALARM_TYPE,
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
            props.dataSource.GetRequest("/iot-service/v1/alarms?alarm_type=" + ALARM_TYPE + "&page_number=" + pageNumber + "&page_size=" + pageSize + "&device_sn=" + searchKey,
                data => {
                    setAlarmList(data);
                    setLoaded(true);
                });
        }
        else {
            if (selectedOption.value == null) {
                props.dataSource.GetRequest("/iot-service/v1/alarms?alarm_type=" + ALARM_TYPE + "&page_number=" + pageNumber + "&page_size=" + pageSize + "&device_sn=" + searchKey,
                    data => {
                        setAlarmList(data);
                        setLoaded(true);
                    });
            } else {
                props.dataSource.GetRequest("/iot-service/v1/alarms?alarm_type=" + ALARM_TYPE + "&page_number=" + pageNumber + "&page_size=" + pageSize + "&device_name=" + selectedOption.value + "&device_sn=" + searchKey,
                    data => {
                        setAlarmList(data);
                        setLoaded(true);
                    });
            }
        }
    }

    function onPagenationChange(page_number) {
        props.dataSource.GetRequest("/iot-service/v1/alarms?alarm_type=" + ALARM_TYPE + "&page_number=" + page_number + "&page_size=" + pageSize,
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
        props.dataSource.PostRequest("/iot-service/v1/alarms",
            data => {
                let updatedList = [...alarmList];
                updatedList.push(data);
                setAlarmList(updatedList);
                props.dataSource.GetRequest("/iot-service/v1/alarms/counts?alarm_type=" + ALARM_TYPE,
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
        props.dataSource.PostRequest("/iot-service/v1/alarms/" + id,
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
        props.dataSource.DeleteRequest("/iot-service/v1/alarms/" + id,
            data => {
                let updatedList = [];
                alarmList.map(device => {
                    if (device.id !== id) {
                        updatedList.push(device)
                    }
                });
                setAlarmList(updatedList);
                props.dataSource.GetRequest("/iot-service/v1/alarms/counts?alarm_type=" + ALARM_TYPE,
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
            <Row className="search-bar">
                <Col xs={8} md={6} lg={4} xl={4}>
                    <div className={"col-xs-6 col-md-6 col-lg-6 col-xl-6 facility-type-title"}>Device Name
                    </div>
                    <div className={"col-xs-6 col-md-6 col-lg-6 col-xl-6"}>
                        <Select
                            className="facility-type-value"
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={deviceOptions}
                        />
                    </div>

                </Col>
                <Col xs={8} md={4} lg={4} xl={4}>
                    <div className={"col-xs-4 col-md-4 col-lg-4 col-xl-4 key-input-title"}>SN/IMEI</div>
                    <div className={"col-xs-8 col-md-8 col-lg-8 col-xl-8"}>
                        <FormControl value={searchKey} type="text" placeholder="SN/IMEI"
                                     className="key-input-value" onChange={searchkeyChanged}/>
                    </div>
                </Col>
                <Col xs={8} md={2} lg={2} xl={2}>
                    <Button className={"btn-primary search-btn"}
                            onClick={() => searchDevice()}><FontAwesomeIcon
                        icon={faSearch}/> Search</Button>
                </Col>

                <Col xs={8} md={12} lg={1} xl={1}>
                    <Button className={"btn-success search-btn"}
                            onClick={() => openModal(false)}><FontAwesomeIcon
                        icon={faPlus}/> Add</Button>
                </Col>
            </Row>
            <Row>
                {!isLoaded ?
                    <div className='preloader-container'><Preloader show={true}/></div> :
                    <AlarmSettingTable alarmList={alarmList} deviceOptions={deviceOptions}
                                       onEditClick={openModal} onRemoveClick={openRemoveModal}
                                       onPagenationCallback={onPagenationChange}
                                       pageSize={pageSize} totalTransactions={totalAlarms} type={ALARM_TYPE}/>
                }
            </Row>
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