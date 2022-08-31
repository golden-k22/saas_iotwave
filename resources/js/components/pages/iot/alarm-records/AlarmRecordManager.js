import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Col, Row, Button, FormControl} from '@themesberg/react-bootstrap';
import Select from 'react-select';
import Preloader from "../../../components/Preloader";
import {AlarmRecordTable} from "./AlarmRecordTable";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import {RestDataSource} from "../../../../service/RestDataSource";
import ReactDOM from "react-dom";
import '../../../scss/management-table-style.scss';

const AlarmRecordManager = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    const [deviceOptions, setDeviceOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedAlarmType, setSelectedAlarmType] = useState(null);
    const [searchKey, setSearchKey] = useState("");

    const [isLoaded, setLoaded] = useState(false);
    const [alarmRecordList, setAlarmRecordList] = useState([]);
    const [totalAlarms, setTotalAlarms] = useState(0);
    const dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => console.log("Server connection failed."));

    const alarmTypeOptions =
        [{value: null, label: "All"},
            {value: 0, label: "Temperature Alarm"},
            {value: 1, label: "Humidity Alarm"},
            {value: 2, label: "Voltage Alarm"},
            {value: 3, label: "Security Alarm"}];
    useEffect(() => {
        dataSource.GetRequest("/iot-service/v1/devices",
            data => {
                let newOption = [{value: null, label: "All"}];
                data.map(device => {
                    newOption.push(
                        {
                            value: device.sn, label: device.name
                        }
                    )
                });
                setDeviceOptions(newOption);
            });
        dataSource.GetRequest("/iot-service/v1/alarms/records?&page_number=" + pageNumber + "&page_size=" + pageSize,
            data => {
                setAlarmRecordList(data);
                dataSource.GetRequest("/iot-service/v1/alarms/records/counts",
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
        if (selectedOption != null && selectedOption.value!=null) {
            if (selectedAlarmType != null && selectedAlarmType.value!=null) {
                dataSource.GetRequest("/iot-service/v1/alarms/records?page_number=" + pageNumber + "&page_size=" + pageSize + "&device_name=" + selectedOption.value + "&alarm_type=" + selectedAlarmType.value,
                    data => {
                        setAlarmRecordList(data);
                        setLoaded(true);
                    });
            } else {
                dataSource.GetRequest("/iot-service/v1/alarms/records?page_number=" + pageNumber + "&page_size=" + pageSize + "&device_name=" + selectedOption.value,
                    data => {
                        setAlarmRecordList(data);
                        setLoaded(true);
                    });
            }
        } else {
            if (selectedAlarmType != null && selectedAlarmType.value!=null) {
                dataSource.GetRequest("/iot-service/v1/alarms/records?page_number=" + pageNumber + "&page_size=" + pageSize + "&alarm_type=" + selectedAlarmType.value,
                    data => {
                        setAlarmRecordList(data);
                        setLoaded(true);
                    });
            }else {
                dataSource.GetRequest("/iot-service/v1/alarms/records?&page_number=" + pageNumber + "&page_size=" + pageSize,
                    data => {
                        setAlarmRecordList(data);
                        dataSource.GetRequest("/iot-service/v1/alarms/records/counts",
                            count => {
                                setTotalAlarms(count.count);
                                setLoaded(true);
                            });
                    });
            }
        }
        // if (selectedOption == null) {
        //     // dataSource.GetRequest("/iot-service/v1/alarms/records?page_number=" + pageNumber + "&page_size=" + pageSize + "&device_sn=" + searchKey,
        //     dataSource.GetRequest("/iot-service/v1/alarms/records?page_number=" + pageNumber + "&page_size=" + pageSize + "&alarm_type=" + selectedAlarmType,
        //         data => {
        //             setAlarmRecordList(data);
        //             setLoaded(true);
        //         });
        // }
        // else {
        //     if (selectedOption.value == null) {
        //         dataSource.GetRequest("/iot-service/v1/alarms/records?page_number=" + pageNumber + "&page_size=" + pageSize + "&device_sn=" + searchKey,
        //             data => {
        //                 setAlarmRecordList(data);
        //                 setLoaded(true);
        //             });
        //     } else {
        //         dataSource.GetRequest("/iot-service/v1/alarms/records?page_number=" + pageNumber + "&page_size=" + pageSize + "&device_name=" + selectedOption.value + "&device_sn=" + searchKey,
        //             data => {
        //                 setAlarmRecordList(data);
        //                 setLoaded(true);
        //             });
        //     }
        // }
    }


    function makeRecordAsRead(recId) {
        if (recId !== 0) {
            dataSource.PostRequest("/iot-service/v1/alarms/records/" + recId,
                data => {
                    setAlarmRecordList(alarmRecordList.map(record => {
                        if (record.id !== data.id) return record;
                        return data
                    }));
                    getCountOfNotifications();
                }, {status: 0});
        } else {
            setLoaded(false);
            dataSource.PostRequest("/iot-service/v1/alarms/records/" + recId,
                data => {
                    dataSource.GetRequest("/iot-service/v1/alarms/records?&page_number=" + pageNumber + "&page_size=" + pageSize,
                        data => {
                            setAlarmRecordList(data);
                            dataSource.GetRequest("/iot-service/v1/alarms/records/counts",
                                count => {
                                    setTotalAlarms(count.count);
                                    setLoaded(true);
                                });
                        });
                    getCountOfNotifications();
                }, {status: 0});
        }
    }

    function getCountOfNotifications() {
        dataSource.GetRequest("/iot-service/v1/alarms/records/counts?is_read=1",
            data => {
                document.getElementsByClassName("alarm-count-badge")[0].innerHTML = data.count;
            });
    }

    function onPagenationChange(page_number) {
        dataSource.GetRequest("/iot-service/v1/alarms/records?page_number=" + page_number + "&page_size=" + pageSize,
            data => {
                setAlarmRecordList(data);
                setLoaded(true);
            });
    }

    /******************************************************/


    return (
        <div className="device-manage-container">
            <Row className='top-section '>
                <span className="section-title mb-row">Alarm Records</span>
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
                {/*<Col xs={8} md={4} lg={3} xl={4}>*/}
                {/*<div className={"col-xs-4 col-md-4 col-lg-4 col-xl-4 key-input-title"}>SN/IMEI</div>*/}
                {/*<div className={"col-xs-8 col-md-8 col-lg-8 col-xl-8"}>*/}
                {/*<FormControl value={searchKey} type="text" placeholder="SN/IMEI"*/}
                {/*className="key-input-value" onChange={searchkeyChanged}/>*/}
                {/*</div>*/}
                {/*</Col>*/}
                <Col xs={8} md={6} lg={4} xl={4}>
                    <div className={"col-xs-6 col-md-6 col-lg-6 col-xl-6 facility-type-title"}>Alarm Type
                    </div>
                    <div className={"col-xs-6 col-md-6 col-lg-6 col-xl-6"}>
                        <Select
                            className="facility-type-value"
                            defaultValue={selectedAlarmType}
                            onChange={setSelectedAlarmType}
                            options={alarmTypeOptions}
                        />
                    </div>
                </Col>
                <Col xs={8} md={1} lg={1} xl={0}>
                </Col>

                <Col xs={8} md={12} lg={1} xl={1}>
                    <Button className={"btn-primary search-btn"}
                            onClick={() => searchDevice()}><FontAwesomeIcon
                        icon={faSearch}/> Search</Button>
                </Col>
                <Col xs={8} md={12} lg={2} xl={2}>
                    <Button className={"btn-danger make-read-btn"}
                            onClick={() => makeRecordAsRead(0)}><FontAwesomeIcon
                        icon={faEye}/> Make all as Read</Button>
                </Col>
            </Row>
            <Row>
                {!isLoaded ?
                    <div className='preloader-container'><Preloader show={true}/></div> :
                    <AlarmRecordTable alarmRecordList={alarmRecordList} deviceOptions={deviceOptions}
                                      onCheckRecordCallback={makeRecordAsRead} onPagenationCallback={onPagenationChange}
                                      pageSize={pageSize} totalTransactions={totalAlarms}/>
                }
            </Row>
        </div>
    );
};
export default AlarmRecordManager;


if (document.getElementById('alarm-record-dashboard')) {
    ReactDOM.render(<AlarmRecordManager/>, document.getElementById('alarm-record-dashboard'));
}