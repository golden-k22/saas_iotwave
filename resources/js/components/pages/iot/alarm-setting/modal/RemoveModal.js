import React, {useState} from 'react';
import {Button, Col,  Row} from "@themesberg/react-bootstrap";
import { faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function RemoveModal(props) {
    return (
        <div>
            <form>
                <Row className="mb-row">
                    <Col xs={8} md={8} lg={8} xl={8}>
                    </Col>
                    <Col xs={2} md={2} lg={2} xl={2} className="align-right">
                        <Button onClick={() => props.onSubmit(props.selectedAlarm.id)}
                                className={"btn-danger search-btn"}><FontAwesomeIcon icon={faTrashAlt}/> Remove</Button>
                    </Col>
                    <Col xs={2} md={2} lg={2} xl={2} className="align-right">
                        <Button onClick={() => props.onClose()}
                                className={"btn-secondary search-btn"}>Cancel</Button>
                    </Col>
                </Row>
            </form>
        </div>
    );
}

export default RemoveModal;