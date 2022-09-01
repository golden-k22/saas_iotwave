import React, {useState} from 'react';
import {Button, Col, FormControl, Row} from "@themesberg/react-bootstrap";
import Select from 'react-select';
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import '../../../../scss/volt/components/rcTimePickerStyle.css'
import {
    convertUTCToLocalHourString,
    makeDateOnly,
    makeEndDateTimeFromUTCDate, makeStartDateTimeFromUTCDate
} from "../../DateParser";

function AddEditModal(props) {
    const matchType = props.isEdit ? props.deviceOptions.filter(item => item.value == props.selectedAlarm.device_sn)[0] : undefined;
    const [selectedDevice, setSelectedDevice] = useState(!props.isEdit ? null : {
        value: props.selectedAlarm.device_sn,
        label: matchType === undefined ? "Not Available" : matchType.label
    });

    const alarmTemp = {
        date_from: !props.isEdit ? "" : makeStartDateTimeFromUTCDate(props.selectedAlarm.date_from),
        date_to: !props.isEdit ? "" : makeEndDateTimeFromUTCDate(props.selectedAlarm.date_to),
        createdAt: !props.isEdit ? "" : props.selectedAlarm.created_at,
        name: !props.isEdit ? "" : props.selectedAlarm.name,
        device_sn: !props.isEdit ? "" : props.selectedAlarm.device_sn,
        alarm_type: !props.isEdit ? "" : props.selectedAlarm.alarm_type,
        low_warning: !props.isEdit ? null : props.selectedAlarm.low_warning,
        high_warning: !props.isEdit ? null : props.selectedAlarm.high_warning,
        low_threshold: !props.isEdit ? null : props.selectedAlarm.low_threshold,
        high_threshold: !props.isEdit ? null : props.selectedAlarm.high_threshold,
        offline_time: !props.isEdit ? null : props.selectedAlarm.offline_time,
        repeat: !props.isEdit ? [1, 1, 1, 1, 1, 1, 1] : props.selectedAlarm.repeat,
        time_from: !props.isEdit ? "09:00:00" : convertUTCToLocalHourString(props.selectedAlarm.time_from),
        time_to: !props.isEdit ? "21:00:00" : convertUTCToLocalHourString(props.selectedAlarm.time_to)
    };
    const [alarmSetting, setAlarmSetting] = useState(alarmTemp);
    const [dateRange, setDateRange] = useState(props.isEdit ? [new Date(alarmSetting.date_from), new Date(alarmSetting.date_to)] :
        [new Date(makeDateOnly(new Date()) + " 00:00:00"), new Date(makeDateOnly(getDateTo(2))+" 23:59:00")]);

    function getDateTo(pastMonth) {
        let curDate = new Date();
        curDate.setMonth(curDate.getMonth() + pastMonth);
        return curDate;
    }

    const format = 'h:mm a';

    // const format = 'H:mm';

    function changeTimeFrom(value) {
        setAlarmSetting({...alarmSetting, time_from: value.format('H:mm:ss')});
    }

    function changeTimeTo(value) {
        setAlarmSetting({...alarmSetting, time_to: value.format('H:mm:ss')});
    }

    const daysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function onCheckboxCheck(event) {
        let repeatArr = [...alarmSetting.repeat];
        let index = event.target.value;
        if (event.target.checked) {
            repeatArr[index] = 1;
        } else {
            repeatArr[index] = 0;
        }
        setAlarmSetting({...alarmSetting, repeat: repeatArr});
    }


    /** Validation. **/
    const [isError, setError] = useState(false);

    function updateAlarm() {
        if (selectedDevice == null || selectedDevice.value == null) {
            setError(true);
        } else if (alarmSetting.name === "") {
            setError(true);
        } else {
            props.onSubmit(!props.isEdit ? null : props.selectedAlarm.id, selectedDevice, dateRange, alarmSetting);
        }
    }


    /** Event Titles **/
    const LOW_WARNING = props.type === 0 ? "Low Warning Temperature" : props.type === 1 ? "Low Warning Humidity" : "Low Warning";
    const HIGH_WARNING = props.type === 0 ? "High Warning Temperature" : props.type === 1 ? "High Warning Humidity" : "High Warning";
    const LOW_THRESHOLD = props.type === 0 ? "Low Threshold Temperature" : props.type === 1 ? "Low Threshold Humidity" : props.type === 2 ? "Low Voltage" : "Low Threshold";
    const HIGH_THRESHOLD = props.type === 0 ? "High Threshold Temperature" : props.type === 1 ? "High Threshold Humidity" : "High Threshold";
    const OFFLINE_TIME = props.type === 3 ? "Offline Time" : "";
    const UNIT = props.type === 0 ? "ºC" : props.type === 1 ? "%" : props.type === 2 ? "V" : props.type === 3 ? "min" : "";

    return (
        <div>
            <form>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Name</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <FormControl defaultValue={alarmSetting.name} name="alarmName"
                                     type="text"
                                     placeholder=""
                                     className="key-input-value grey-border"
                                     onChange={e => setAlarmSetting({...alarmSetting, name: e.target.value})}/>
                        {
                            isError && (alarmSetting.name === "") ?
                                <span style={{color: "red"}}>Please input the name of Alarm</span> : null
                        }
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Object</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <Select
                            className="facility-type-value grey-border"
                            defaultValue={selectedDevice}
                            onChange={setSelectedDevice}
                            options={props.deviceOptions}
                        />
                        {
                            isError && (selectedDevice == null || selectedDevice.value == null) ?
                                <span style={{color: "red"}}>Please select the Device.</span> : null
                        }
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={2} md={2} lg={2} xl={2}>
                        <label className="facility-type-title">Event</label>
                    </Col>
                    <Col xs={8} md={8} lg={8} xl={8}>
                        {props.type === 0 || props.type === 1 ?
                            <Row>
                                <Col xs={8} md={8} lg={8} xl={8}>
                                    <label className="facility-type-title event-type-title">{LOW_WARNING}</label>
                                </Col>
                                <Col xs={4} md={4} lg={4} xl={4} className={"d-flex"}>
                                    <FormControl defaultValue={alarmSetting.low_warning}
                                                 name="alarmName"
                                                 type="number"
                                                 placeholder=""
                                                 className="key-input-value grey-border event-type-value"
                                                 onChange={e => setAlarmSetting({
                                                     ...alarmSetting,
                                                     low_warning: e.target.value
                                                 })}/>
                                    <label className="facility-type-title">{UNIT}</label>
                                </Col>
                            </Row> : null
                        }
                        {props.type === 0 || props.type === 1 ?

                            <Row>
                                <Col xs={8} md={8} lg={8} xl={8}>
                                    <label className="facility-type-title event-type-title">{HIGH_WARNING}</label>
                                </Col>
                                <Col xs={4} md={4} lg={4} xl={4} className={"d-flex"}>
                                    <FormControl defaultValue={alarmSetting.high_warning}
                                                 name="alarmName"
                                                 type="number"
                                                 placeholder=""
                                                 className="key-input-value grey-border event-type-value"
                                                 onChange={e => setAlarmSetting({
                                                     ...alarmSetting,
                                                     high_warning: e.target.value
                                                 })}/>
                                    <label className="facility-type-title">{UNIT}</label>
                                </Col>
                            </Row> : null
                        }
                        {props.type === 0 || props.type === 1 || props.type === 2 ?
                            <Row>
                                <Col xs={8} md={8} lg={8} xl={8}>
                                    <label className="facility-type-title event-type-title">{LOW_THRESHOLD}</label>
                                </Col>
                                <Col xs={4} md={4} lg={4} xl={4} className={"d-flex"}>
                                    <FormControl defaultValue={alarmSetting.low_threshold}
                                                 name="alarmName"
                                                 type="number"
                                                 placeholder=""
                                                 className="key-input-value grey-border event-type-value"
                                                 onChange={e => setAlarmSetting({
                                                     ...alarmSetting,
                                                     low_threshold: e.target.value
                                                 })}/>
                                    <label className="facility-type-title">{UNIT}</label>
                                </Col>
                            </Row> : null
                        }
                        {props.type === 0 || props.type === 1 ?
                            <Row>
                                <Col xs={8} md={8} lg={8} xl={8}>
                                    <label className="facility-type-title event-type-title">{HIGH_THRESHOLD}</label>
                                </Col>
                                <Col xs={4} md={4} lg={4} xl={4} className={"d-flex"}>
                                    <FormControl defaultValue={alarmSetting.high_threshold}
                                                 name="alarmName"
                                                 type="number"
                                                 placeholder=""
                                                 className="key-input-value grey-border event-type-value"
                                                 onChange={e => setAlarmSetting({
                                                     ...alarmSetting,
                                                     high_threshold: e.target.value
                                                 })}/>
                                    <label className="facility-type-title">{UNIT}</label>
                                </Col>
                            </Row> : null
                        }
                        {props.type === 3 ?
                            <Row>
                                <Col xs={8} md={8} lg={8} xl={8}>
                                    <label className="facility-type-title event-type-title">{OFFLINE_TIME}</label>
                                </Col>
                                <Col xs={4} md={4} lg={4} xl={4} className={"d-flex"}>
                                    <FormControl defaultValue={alarmSetting.offline_time}
                                                 name="alarmName"
                                                 type="number"
                                                 placeholder=""
                                                 className="key-input-value grey-border event-type-value"
                                                 onChange={e => setAlarmSetting({
                                                     ...alarmSetting,
                                                     offline_time: e.target.value
                                                 })}/>
                                    <label className="facility-type-title">{UNIT}</label>
                                </Col>
                            </Row> : null
                        }
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>

                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Effective Date</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <DateRangePicker
                            className={"w-100"}
                            calendarAriaLabel="Toggle calendar"
                            clearAriaLabel="Clear value"
                            rangeDivider="~"
                            dayAriaLabel="Day"
                            monthAriaLabel="Month"
                            nativeInputAriaLabel="Date"
                            clearIcon={null}
                            onChange={(value) => setDateRange(value)}
                            value={dateRange}
                            yearAriaLabel="Year"
                        />
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Effective Time</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <Row>
                            <Col xs={4} md={4} lg={4} xl={4}>
                                <label className="facility-type-title event-type-title">From :</label>
                            </Col>
                            <Col>
                                <TimePicker
                                    className={"w-100"}
                                    showSecond={false}
                                    defaultValue={moment(alarmSetting.time_from, format)}
                                    onChange={changeTimeFrom}
                                    format={format}
                                    // use12Hours
                                    inputReadOnly
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4} lg={4} xl={4}>
                                <label className="facility-type-title event-type-title">To :</label>
                            </Col>
                            <Col>
                                <TimePicker
                                    className={"w-100"}
                                    showSecond={false}
                                    defaultValue={moment(alarmSetting.time_to, format)}
                                    onChange={changeTimeTo}
                                    format={format}
                                    inputReadOnly
                                />
                            </Col>

                        </Row>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                {/* Repeat day setting*/}
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={2} md={2} lg={2} xl={2}>
                        <label className="facility-type-title">Repeat</label>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    {daysArr.map((day, index) =>
                        <Col xs={1} md={1} lg={1} xl={1} className="day-padding" key={index}>
                            <label className="facility-type-title event-type-title">{day}</label>
                        </Col>
                    )}
                </Row>
                <Row className="mb-row">
                    <Col xs={4} md={4} lg={4} xl={4}/>
                    {daysArr.map((day, index) =>
                        <Col xs={1} md={1} lg={1} xl={1} className="text-center" key={index}>
                            <input type="checkbox" name={day} value={index} checked={alarmSetting.repeat[index]}
                                   onChange={(e) => onCheckboxCheck(e)}/>
                        </Col>
                    )}
                </Row>

                <Row className="mb-row">
                    <Col xs={9} md={9} lg={9} xl={9}>
                    </Col>
                    <Col xs={2} md={2} lg={2} xl={2} className="align-right">
                        <Button
                            onClick={() => updateAlarm()}
                            className={"btn-success search-btn"}>{props.isEdit ? <FontAwesomeIcon icon={faEdit}/> :
                            <FontAwesomeIcon icon={faPlus}/>}{props.isEdit ? " Save" : " Add"}</Button>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
            </form>
        </div>
    );
}

export default AddEditModal;