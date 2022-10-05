import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Col, Row, Button, FormControl} from '@themesberg/react-bootstrap';
import Select from 'react-select';
import Preloader from "../../../components/Preloader";
import {ReportTable} from "./ReportTable";
import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {RestDataSource} from "../../../../service/RestDataSource";
import ReactDOM from "react-dom";
import HistoryDashboard from "../history/HistoryDashboard";
import '../../../scss/management-table-style.scss';
import "../../../scss/volt/components/monthPickerStyle.css";
import {ReportListTable} from "./ReportListTable";
import DeviceManager from "../device-management/DeviceManager";

const ReportManager = (props) => {
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
    const [totalDevices, setTotalDevices] = useState(0);
    const [selectedDevice, setSelectedDevice] = useState({id: 0, sn: 0});
    const [viewHistory, setViewHistory] = useState(false);
    const [reportGenerated, setReportGenerated]=useState(true);
    const dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => console.log("Server connection failed."));
    useEffect(() => {
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/groups",
            groups => {
                let newOption = [{value: null, label: "No Select"}];
                groups.map(group => {
                    newOption.push(
                        {
                            value: group.id, label: group.name
                        }
                    )
                });
                setGroupOptions(newOption);
            });
        dataSource.GetRequest("/iot-service/v1/devices/types",
            types => {
                let newOption = [{value: null, label: "No Select"}];
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
    }

    function onPagenationChange(page_number) {
        dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/devices?page_number=" + page_number + "&page_size=" + pageSize,
            data => {
                setDeviceList(data);
                setLoaded(true);
            });
    }

    function onDetailClick(device) {
        setSelectedDevice({id: device.id, sn: device.sn});
        setViewHistory(true);
    }

    function backToReportTable() {
        setViewHistory(false);
        setReportGenerated(true)
    }

    return (
        <>
            {
                viewHistory ?
                    <div className="w-100">
                        <HistoryDashboard tenant={props.tenant} title={`Generate Report of Device ${selectedDevice.sn}`}
                                          device={selectedDevice} dataSource={dataSource} setReportGenerated={setReportGenerated}
                                          backCallback={backToReportTable}/>
                        <ReportListTable tenant={props.tenant} dataSource={dataSource} device={selectedDevice} reportGenerated={reportGenerated} setReportGenerated={setReportGenerated}/>
                    </div> :
                    <div className="device-manage-container">
                        <Row className='top-section d-flex align-items-center'>
                            <Col md={6} className="section-title mb-row">Report</Col>
                            <Col md={6} className="text-right">
                                <Button className={"btn-primary d-flex align-items-center float-right"}
                                        onClick={() => searchDevice()}><FontAwesomeIcon
                                    icon={faSearch} className={"me-1"}/> Search</Button>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={3} className={"d-flex align-items-center"}>
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
                                <span className={"h6 me-2"}>Key</span>
                                <FormControl value={searchKey} type="text" placeholder="IMEI"
                                             className="key-input-value me-2" onChange={searchkeyChanged}/>

                            </Col>
                        </Row>
                        <Row>
                            {!isLoaded ?
                                <div className='preloader-container'><Preloader show={true}/></div> :
                                <ReportTable deviceList={deviceList} groupOptions={groupOptions}
                                             typeOptions={typeOptions}
                                             onDetailClick={onDetailClick}
                                             onPagenationCallback={onPagenationChange} pageSize={pageSize}
                                             totalTransactions={totalDevices}/>
                            }
                        </Row>

                    </div>
            }
        </>
    );
};

export default ReportManager;
if (document.getElementById('report-dashboard')) {
    let admin = false;
    let tenant = document.documentURI.split("/")[3];
    let user = document.getElementById("report-dashboard").getAttribute("data-user");
    if(user === tenant){
        admin = true;
    }
    ReactDOM.render(<ReportManager tenant={tenant} admin={admin}/>, document.getElementById('report-dashboard'));
}