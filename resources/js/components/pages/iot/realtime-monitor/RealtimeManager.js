import React, {Component} from "react";
import {Button, Col, FormControl, Row} from '@themesberg/react-bootstrap';
import mqtt from "mqtt"
import RealtimeCard from "./realtime-card/RealtimeCard";
import HistoryDashboard from "../history/HistoryDashboard";
import {RestDataSource} from "../../../../service/RestDataSource";
import ReactDOM from "react-dom";
import "../../../scss/volt/components/monthPickerStyle.css";
import '../../../scss/management-table-style.scss';
import '../../../scss/volt.scss';
import {ReportListTable} from "../report-management/ReportListTable";
import Select from "react-select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";

class RealtimeManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            alarms: [],
            viewHistory: false,
            selectedDevice: {
                id: 0,
                sn: 0,
				name:'',
            },
            reportGenerated: true,
            groupOptions: [],
            deviceName: '',
            typeOptions: [],
            selectedGroupOption: null,
            selectedTypeOption: null
        };
        this.client = null;
        this.viewHistoryBtnClicked = this.viewHistoryBtnClicked.bind(this);
        this.backToCardView = this.backToCardView.bind(this);
        this.setReportGenerated = this.setReportGenerated.bind(this);
        this.dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => console.log("Server connection failed."));
    }

    render() {
        return (
            <div className="w-100">

                {this.state.viewHistory ?
                    <>
                        <HistoryDashboard
                            tenant={this.props.tenant}
                            title={`History of Device ${this.state.selectedDevice.name}`}
                            device={this.state.selectedDevice} dataSource={this.dataSource}
                            setReportGenerated={this.setReportGenerated}
                            backCallback={this.backToCardView}/>
                        <ReportListTable dataSource={this.dataSource} device={this.state.selectedDevice}
                                         reportGenerated={this.state.reportGenerated}
                                         setReportGenerated={this.setReportGenerated}/>
                    </> :
                    <Row className="section-container">
                        <div className='top-section'>
                            <span className="section-title">Realtime Monitoring</span>
                        </div>
                        <Row className="mb-3">
                            <Col md={4} className={"d-flex align-items-center"}>
                                <span className={"h6 me-2 mb-0"}>
                                        Type of facility
                                </span>
                                <Select
                                    className="facility-type-value w-50"
                                    defaultValue={this.state.selectedTypeOption}
                                    onChange={(e)=>{
                                        this.setState({
                                            selectedTypeOption: e
                                        })
                                    }}
                                    options={this.state.typeOptions}
                                />
                            </Col>
                            <Col md={4} className={"d-flex align-items-center"}>
                                <span className={"h6 me-2 mb-0"}>
                                    Group
                                </span>
                                <Select
                                    className="facility-type-value w-50"
                                    defaultValue={this.state.selectedGroupOption}
                                    onChange={(e)=>{
                                        this.setState({
                                            selectedGroupOption: e
                                        })
                                    }}
                                    options={this.state.groupOptions}
                                />
                            </Col>
                            <Col md={4} className={"d-flex align-items-center"}>
                                <span className={"h6 me-2 mb-0"}>
                                    Device
                                </span>
                                <FormControl value={this.state.deviceName} type="text" placeholder="Device Name"
                                             className="key-input-value me-2"
                                             onChange={(e)=>{
                                                 this.setState({
                                                     deviceName: e.target.value
                                                 })
                                             }}/>
                                <Button className={"btn-primary d-flex align-items-center"}
                                        onClick={() => this.searchDevices()}><FontAwesomeIcon
                                    icon={faSearch} className={"me-1"}/> Search</Button>
                            </Col>
                        </Row>
                        <Row className={"mt-4"}>
                            {this.state.messages.map((message, index) =>
                                <Col key={index} xs={12} sm={12} md={6} lg={4} className="mb-4">
                                    <RealtimeCard
                                        message={message}
                                        alarm={this.state.alarms.find(o => o.device_sn == message.device_sn)}
                                        viewHistoryCallback={this.viewHistoryBtnClicked}/>
                                </Col>
                            )}
                        </Row>
                    </Row>
                }

            </div>
        )
    }

    searchDevice(){

    }

    setReportGenerated(isGenerated) {
        this.setState({reportGenerated: isGenerated});
    }

    viewHistoryBtnClicked(deviceId, sn, name) {
        this.setState({selectedDevice: {...this.state.selectedDevice, id: deviceId, sn: sn, name: name}},
            () => {
                this.setState({viewHistory: true})
            });
    }

    backToCardView() {
        this.setState({viewHistory: false});
        this.setState({reportGenerated: true})
    }

    componentWillUnmount() {
        if (this.client !== null) {
            this.client.end();
        }
    }

    componentDidMount() {
        this.searchDevices();
        this.dataSource.GetRequest("/iot-service/v1/" + this.props.tenant + "/groups",
            groups => {
                let newOption = [{value:null, label: "No Select"}];
                groups.map(group => {
                    newOption.push(
                        {
                            value: group.id, label: group.name
                        }
                    )
                })
                this.setState({
                    groupOptions: newOption
                });
            });
        this.dataSource.GetRequest("/iot-service/v1/devices/types",
            types => {
                let newOption = [{value:null, label: "No Select"}];
                types.map(type => {
                    newOption.push(
                        {
                            value: type.id, label: type.name
                        }
                    )
                })
                this.setState({
                    typeOptions: newOption
                });
            });
    }

    searchDevices() {
        let type = this.state.selectedTypeOption && this.state.selectedTypeOption.value? '&type='+this.state.selectedTypeOption.value: '';
        let group = this.state.selectedGroupOption && this.state.selectedGroupOption.value? '&group='+this.state.selectedGroupOption.value: '';
        this.dataSource.GetRequest("/iot-service/v1/" + this.props.tenant + "/status/latest?device_name=" + this.state.deviceName + type + group,
            data => {
                this.setState({messages: data});
                this.setAlarms();
                this.subscribeDevices();
            });
    }

    setAlarms() {
        let alarmList = [];
        this.state.messages.map(msg => {
            this.dataSource.GetRequest("/iot-service/v1/" + this.props.tenant + "/alarms?device_sn=" + msg.device_sn,
                data => {
                    let alarm_temp = {
                        device_sn:msg.device_sn,
                        wlt: null,
                        wht: null,
                        lt: null,
                        ht: null,
                        wlh: null,
                        whh: null,
                        lh: null,
                        hh: null,
                        lv: null,
                        oft: null
                    };
                    data.map(item => {
                        if (item.alarm_type === 0) {
                            alarm_temp.wlt = item.low_warning;
                            alarm_temp.wht = item.high_warning;
                            alarm_temp.lt = item.low_threshold;
                            alarm_temp.ht = item.high_threshold;
                        } else if (item.alarm_type === 1) {
                            alarm_temp.wlh = item.low_warning;
                            alarm_temp.whh = item.high_warning;
                            alarm_temp.lh = item.low_threshold;
                            alarm_temp.hh = item.high_threshold;
                        } else if (item.alarm_type === 2) {
                            alarm_temp.lv = item.low_threshold;
                        } else if (item.alarm_type === 3) {
                            alarm_temp.oft = item.offline_time;
                        }
                    });
                    alarmList.push(alarm_temp);
                    if(alarmList.length==this.state.messages.length){
                        this.setState({alarms: alarmList});
                    }                    
                });
        });
        // this.setState({alarms: alarmList});
    }

    getLatestStatus() {
        let type = this.state.selectedTypeOption && this.state.selectedTypeOption.value? '&type='+this.state.selectedTypeOption.value: '';
        let group = this.state.selectedGroupOption && this.state.selectedGroupOption.value? '&group='+this.state.selectedGroupOption.value: '';
        this.dataSource.GetRequest("/iot-service/v1/" + this.props.tenant + "/status/latest?device_name=" + this.state.deviceName + type + group,
            data => {
                this.setState({messages: data});
            });
    }

    subscribeDevices() {
        let clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
        let host = process.env.MIX_IOT_MQTT_SERVER_URL;
        let options = {
            keepalive: 0,
            clientId: clientId,
            reconnectPeriod: 1000,
            connectTimeout: 3 * 1000,
            will: {
                topic: 'WillMsg',
                payload: 'Connection Closed abnormally..!',
                qos: 0,
                retain: false
            },
            rejectUnauthorized: false
        };

        console.log('connecting to mqtt client...');
        this.client = mqtt.connect(host, options);
        let that = this;
        this.client.on('connect', function () {
            console.log('connected successfully!');
            that.getLatestStatus();
            that.state.messages.map((msg) => {
                that.client.subscribe("saasiot/sensors/" + msg.device_sn, function (err) {
                    if (err) {
                        console.log('cannot subscribe...');
                    }
                })
            });
        });
        this.client.on('message', (topic, payload, packet) => {
                let json_obj = JSON.parse(payload.toString());
                let copyMessages = [...that.state.messages];
                for (let index = 0; index < that.state.messages.length; index++) {
                    let msg = that.state.messages[index];
                    if (msg.device_sn == json_obj.SN) {
                        copyMessages[index].voltage = json_obj.Battery_Voltage;
                        copyMessages[index].temperature = json_obj.Temperature;
                        copyMessages[index].humidity = json_obj.Humidity;
                        copyMessages[index].signal = json_obj.RSSI;
                        copyMessages[index].time = json_obj.Sensor_Time;
                        break;
                    }
                }
                that.setState({messages: copyMessages});
            }
        )
    }
}


export default RealtimeManager;

if (document.getElementById('realtime-card-dashboard')) {
    let admin = false;
    let tenant = document.documentURI.split("/")[3];
    let user = document.getElementById("realtime-card-dashboard").getAttribute("data-user");
    if (user === tenant) {
        admin = true;
    }
    ReactDOM.render(<RealtimeManager tenant={tenant}
                                     admin={admin}/>, document.getElementById('realtime-card-dashboard'));
}