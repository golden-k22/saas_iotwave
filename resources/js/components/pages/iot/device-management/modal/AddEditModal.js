import React, {useState} from 'react';
import {Button, Col, FormControl, Row} from "@themesberg/react-bootstrap";
import Select from 'react-select';
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function AddEditModal(props) {
    const matchType = props.isEdit ? props.typeOptions.filter(item => item.value == props.selectedDevice.type)[0] : undefined;
    const matchGroup = props.isEdit ? props.groupOptions.filter(item => item.value == props.selectedDevice.group_no)[0] : undefined;

    const [selectedFacility, setSelectedFacility] = useState(!props.isEdit ? null : {
        value: props.selectedDevice.type,
        label: matchType === undefined ? "Not Available" : matchType.label
    });
    const [selectedGroup, setSelectedGroup] = useState(!props.isEdit ? null : {
        value: props.selectedDevice.group_no,
        label: matchGroup === undefined ? "Not Available" : matchGroup.label
    });
    const [deviceName, setDeviceName] = useState(!props.isEdit ? "" : props.selectedDevice.name);
    const [imei, setImei] = useState(!props.isEdit ? "" : props.selectedDevice.sn);
    const [devicePassword, setDevicePassword] = useState(!props.isEdit ? "" : props.selectedDevice.password);
    const [dataInterval, setDataInterval] = useState(!props.isEdit ? "15" : props.selectedDevice.interval);
    const [remark, setRemark] = useState(!props.isEdit ? "" : props.selectedDevice.remark);
    const [isError, setError] = useState(false);

    function updateDevice() {
        if (selectedGroup == null || selectedGroup.value == null || selectedFacility == null||selectedFacility.value == null) {
            setError(true);
        }else if (deviceName === ""|| imei==="" || dataInterval==="") {
            setError(true);
        }else{
            props.onSubmit(!props.isEdit ? null : props.selectedDevice.id, deviceName, imei, selectedFacility, selectedGroup, devicePassword, dataInterval, remark);
        }
    }

    return (
        <div>
            <form>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Device Name</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <FormControl defaultValue={deviceName} name="deviceName"
                                     type="text" placeholder=""
                                     className="key-input-value grey-border"
                                     onChange={e => setDeviceName(e.target.value)}/>
                        {
                            isError && (deviceName === "") ?
                                <span style={{color: "red"}}>Please input the name of Device</span> : null
                        }
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">IMEI / SN</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <FormControl defaultValue={imei} type="text"
                                     placeholder=""
                                     className="key-input-value grey-border"
                                     onChange={e => setImei(e.target.value)} disabled={!props.isEdit ? false : true}/>
                        {
                            isError && (imei === "") ?
                                <span style={{color: "red"}}>Please input the IMEI/SN of Device</span> : null
                        }
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Type of facility</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <Select
                            className="facility-type-value grey-border"
                            defaultValue={selectedFacility}
                            onChange={setSelectedFacility}
                            options={props.typeOptions}
                        />
                        {
                            isError && (selectedFacility == null||selectedFacility.value==null) ?
                                <span style={{color: "red"}}>Please select the type of facility</span> : null
                        }
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Group</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <Select
                            className="facility-type-value grey-border"
                            defaultValue={selectedGroup}
                            onChange={setSelectedGroup}
                            options={props.groupOptions}
                        />
                        {
                            isError && (selectedGroup == null ||selectedGroup.value==null)?
                                <span style={{color: "red"}}>Please select the group</span> : null
                        }
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Device Password</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <FormControl defaultValue={devicePassword} type="text"
                                     placeholder="" className="key-input-value grey-border"
                                     onChange={e => setDevicePassword(e.target.value)}/>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title sm-text">Data Interval(minute)</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <FormControl defaultValue={dataInterval} type="number"
                                     placeholder="" className="key-input-value grey-border"
                                     onChange={e => setDataInterval(e.target.value)}/>
                        {
                            isError && (dataInterval === "") ?
                                <span style={{color: "red"}}>Please input the Interval</span> : null
                        }
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Remark</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <FormControl defaultValue={remark} type="text"
                                     placeholder="" className="key-input-value grey-border"
                                     onChange={e => setRemark(e.target.value)}/>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={9} md={9} lg={9} xl={9}>
                    </Col>
                    <Col xs={2} md={2} lg={2} xl={2} className="align-right">
                        <Button type="button" onClick={() => updateDevice()}
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