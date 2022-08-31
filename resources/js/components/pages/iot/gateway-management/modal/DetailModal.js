import React from 'react';
import {Button, Col, Row} from "@themesberg/react-bootstrap";
import {convertUTCToLocalString} from "../../DateParser";

function DetailModal(props) {
    const matchType = props.typeOptions.filter(item => item.value == props.selectedDevice.type)[0];
    let createTime = convertUTCToLocalString(props.selectedDevice.created_at);
    return (
        <div>
            <form>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Gateway Name</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <label className="detail-row"> {props.selectedDevice.name}</label>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">IMEI </label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <label className="detail-row"> {props.selectedDevice.imei}</label>
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