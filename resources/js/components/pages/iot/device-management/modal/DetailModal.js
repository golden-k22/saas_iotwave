import React, {useState} from 'react';
import {Button, Col, FormControl, Row} from "@themesberg/react-bootstrap";
import Select from 'react-select';
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {convertUTCToLocalString} from "../../DateParser";

function DetailModal(props) {
    const matchType = props.typeOptions.filter(item => item.value == props.selectedDevice.type)[0];
    const matchGroup = props.groupOptions.filter(item => item.value == props.selectedDevice.group_no)[0];
    let createTime = convertUTCToLocalString(props.selectedDevice.created_at);
    let expireTime = convertUTCToLocalString(props.selectedDevice.expire_at);
    return (
        <div>
            <form>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Device Name</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <label className="detail-row"> {props.selectedDevice.name}</label>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">IMEI / SN</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <label className="detail-row"> {props.selectedDevice.sn}</label>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Type of facility</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <label className="detail-row"> {matchType===undefined?"Not Available":matchType.label}</label>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Group</label>
                    </Col>

                    <Col xs={6} md={6} lg={6} xl={6}>
                        <label className="detail-row"> {matchGroup===undefined?"Not Available":matchGroup.label}</label>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Created At</label>
                    </Col>

                    <Col xs={6} md={6} lg={6} xl={6}>
                        <label className="detail-row"> {createTime}</label>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Expire Time</label>
                    </Col>

                    <Col xs={6} md={6} lg={6} xl={6}>
                        <label className="detail-row"> {expireTime}</label>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title sm-text">Data Interval(minute)</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <label className="detail-row"> {props.selectedDevice.interval}</label>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Remark</label>
                    </Col>

                    <Col xs={6} md={6} lg={6} xl={6}>
                        <label className="detail-row"> {props.selectedDevice.remark}</label>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={9} md={9} lg={9} xl={9}>
                    </Col>
                    <Col xs={2} md={2} lg={2} xl={2} className="align-right">
                        <Button onClick={props.onClose}
                                className={"btn-secondary search-btn"}>Close</Button>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
            </form>
        </div>
    );
}

export default DetailModal;