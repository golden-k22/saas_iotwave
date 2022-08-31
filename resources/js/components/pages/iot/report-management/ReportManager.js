import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Col, Row, Button, FormControl} from '@themesberg/react-bootstrap';
import Select from 'react-select';
import Preloader from "../../../components/Preloader";
import {ReportTable} from "./ReportTable";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {RestDataSource} from "../../../../service/RestDataSource";
import ReactDOM from "react-dom";
import HistoryDashboard from "../history/HistoryDashboard";
import '../../../scss/management-table-style.scss';
import "../../../scss/volt/components/monthPickerStyle.css";
import {ReportListTable} from "./ReportListTable";

const ReportManager = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    const [groupOptions, setGroupOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);

    const [selectedOption, setSelectedOption] = useState(null);
    const [searchKey, setSearchKey] = useState("");
    const [isLoaded, setLoaded] = useState(false);
    const [deviceList, setDeviceList] = useState([]);
    const [totalDevices, setTotalDevices] = useState(0);
    const [selectedDevice, setSelectedDevice] = useState({id: 0, sn: 0});
    const [viewHistory, setViewHistory] = useState(false);
    const [reportGenerated, setReportGenerated]=useState(true);
    const dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => console.log("Server connection failed."));
    useEffect(() => {
        dataSource.GetRequest("/iot-service/v1/groups",
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
        dataSource.GetRequest("/iot-service/v1/devices?page_number=" + pageNumber + "&page_size=" + pageSize,
            data => {
                setDeviceList(data);
                dataSource.GetRequest("/iot-service/v1/devices/counts",
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

    function searchDevice() {
        if (selectedOption == null) {
            dataSource.GetRequest("/iot-service/v1/devices?page_number=" + pageNumber + "&page_size=" + pageSize + "&key=" + searchKey,
                data => {
                    setDeviceList(data);
                    setLoaded(true);
                });
        }
        else {
            if (selectedOption.value == null) {
                dataSource.GetRequest("/iot-service/v1/devices?page_number=" + pageNumber + "&page_size=" + pageSize + "&key=" + searchKey,
                    data => {
                        setDeviceList(data);
                        setLoaded(true);
                    });
            } else {
                dataSource.GetRequest("/iot-service/v1/devices?page_number=" + pageNumber + "&page_size=" + pageSize + "&type=" + selectedOption.value + "&key=" + searchKey,
                    data => {
                        setDeviceList(data);
                        setLoaded(true);
                    });
            }

        }
    }

    function onPagenationChange(page_number) {
        dataSource.GetRequest("/iot-service/v1/devices?page_number=" + page_number + "&page_size=" + pageSize,
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
                    <div className="dashboard-container">
                        <HistoryDashboard title={`Generate Report of Device ${selectedDevice.sn}`}
                                          device={selectedDevice} dataSource={dataSource} setReportGenerated={setReportGenerated}
                                          backCallback={backToReportTable}/>
                        <ReportListTable dataSource={dataSource} device={selectedDevice} reportGenerated={reportGenerated} setReportGenerated={setReportGenerated}/>
                    </div> :
                    <div className="device-manage-container">
                        <Row className='top-section '>
                            <span className="section-title mb-row">Report</span>
                        </Row>
                        <Row className="search-bar">
                            <Col xs={8} md={6} lg={4} xl={4}>
                                <div className={"col-xs-6 col-md-6 col-lg-6 col-xl-6 facility-type-title"}>Type of
                                    facility
                                </div>
                                <div className={"col-xs-6 col-md-6 col-lg-6 col-xl-6"}>
                                    <Select
                                        className="facility-type-value"
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={typeOptions}
                                    />
                                </div>

                            </Col>
                            <Col xs={8} md={4} lg={4} xl={4}>
                                <div className={"col-xs-4 col-md-4 col-lg-4 col-xl-4 key-input-title"}>Key</div>
                                <div className={"col-xs-8 col-md-8 col-lg-8 col-xl-8"}>
                                    <FormControl value={searchKey} type="text" placeholder="Name/IMEI/SN"
                                                 className="key-input-value" onChange={searchkeyChanged}/>
                                </div>
                            </Col>
                            <Col xs={8} md={2} lg={2} xl={2}>

                            </Col>

                            <Col xs={8} md={1} lg={1} xl={1}>
                                <Button className={"btn-primary search-btn"}
                                        onClick={() => searchDevice()}><FontAwesomeIcon
                                    icon={faSearch}/> Search</Button>
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
    ReactDOM.render(<ReportManager/>, document.getElementById('report-dashboard'));
}