import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Col, Row, Button, FormControl} from '@themesberg/react-bootstrap';
import Select from 'react-select';
import Preloader from "../../../components/Preloader";
import {AlarmRecordTable} from "./AlarmRecordTable";
import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import {RestDataSource} from "../../../../service/RestDataSource";
import ReactDOM from "react-dom";
import '../../../scss/management-table-style.scss';
import '../../../scss/volt.scss';

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
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices",
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
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/records?&page_number=" + pageNumber + "&page_size=" + pageSize,
            data => {
                setAlarmRecordList(data);
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/records/counts",
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
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/records?page_number=" + pageNumber + "&page_size=" + pageSize + "&device_name=" + selectedOption.value + "&alarm_type=" + selectedAlarmType.value,
                    data => {
                        setAlarmRecordList(data);
                        setLoaded(true);
                    });
            } else {
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/records?page_number=" + pageNumber + "&page_size=" + pageSize + "&device_name=" + selectedOption.value,
                    data => {
                        setAlarmRecordList(data);
                        setLoaded(true);
                    });
            }
        } else {
            if (selectedAlarmType != null && selectedAlarmType.value!=null) {
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/records?page_number=" + pageNumber + "&page_size=" + pageSize + "&alarm_type=" + selectedAlarmType.value,
                    data => {
                        setAlarmRecordList(data);
                        setLoaded(true);
                    });
            }else {
                dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/records?&page_number=" + pageNumber + "&page_size=" + pageSize,
                    data => {
                        setAlarmRecordList(data);
                        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/records/counts",
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
            dataSource.PostRequest("/iot-service/v1/" + props.tenant + "/alarms/records/" + recId,
                data => {
                    setAlarmRecordList(alarmRecordList.map(record => {
                        if (record.id !== data.id) return record;
                        return data
                    }));
                    getCountOfNotifications();
                }, {status: 0});
        } else {
            setLoaded(false);
            dataSource.PostRequest("/iot-service/v1/" + props.tenant + "/alarms/records/" + recId,
                data => {
                    dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/records?&page_number=" + pageNumber + "&page_size=" + pageSize,
                        data => {
                            setAlarmRecordList(data);
                            dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/records/counts",
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
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/records/counts?is_read=1",
            data => {
                document.getElementsByClassName("alarm-count-badge")[0].innerHTML = data.count;
            });
    }

    function onPagenationChange(page_number) {
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/alarms/records?page_number=" + page_number + "&page_size=" + pageSize,
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
                    <span className={"h6 me-2"}>Alarm Type</span>
                    <Select
                        className="facility-type-value w-50 me-2"
                        defaultValue={selectedAlarmType}
                        onChange={setSelectedAlarmType}
                        options={alarmTypeOptions}
                    />
                    <Button className={"btn-primary d-flex align-items-center"}
                            onClick={() => searchDevice()}><FontAwesomeIcon
                        icon={faSearch} className={"me-1"}/> Search</Button>
                </Col>
                <Col md={3}>
                    <div className={"w-100 text-right"}>
                        {props.admin? <Button className={"btn-danger d-flex align-items-center float-right"}
                                              onClick={() => makeRecordAsRead(0)}><FontAwesomeIcon
                            icon={faEye} className={"me-1"}/>Make all as Read</Button> : ""}
                    </div>
                </Col>
            </Row>
            <div className={"w-100"}>
                {!isLoaded ?
                    <div className='preloader-container'><Preloader show={true}/></div> :
                    <AlarmRecordTable admin={props.admin} alarmRecordList={alarmRecordList} deviceOptions={deviceOptions}
                                      onCheckRecordCallback={makeRecordAsRead} onPagenationCallback={onPagenationChange}
                                      pageSize={pageSize} totalTransactions={totalAlarms}/>
                }
            </div>
        </div>
    );
};
export default AlarmRecordManager;


if (document.getElementById('alarm-record-dashboard')) {
    let admin = false;
    let tenant = document.documentURI.split("/")[3];
    let user = document.getElementById("alarm-record-dashboard").getAttribute("data-user");
    if(user === tenant){
        admin = true;
    }
    ReactDOM.render(<AlarmRecordManager tenant={tenant} admin={admin}/>, document.getElementById('alarm-record-dashboard'));
}