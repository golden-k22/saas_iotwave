import sysImg from "../components/assets/img/icons/google-tag-manager.svg";
import ListGroup from "@themesberg/react-bootstrap/lib/esm/ListGroup";
import {Col, Image, Row} from "@themesberg/react-bootstrap";
import React from "react";
import {convertUTCToLocalString} from "../components/pages/iot/DateParser";

/** Notification Content Component **/

const Notification = (props) => {
    const {alarm_time, alarm_name, sn, alarm_type, alarm_item, current_value, setting_value, message, status} = props;
    const ALARM_TYPE = alarm_type === 0 ? "Temperature" : alarm_type === 1 ? "Humidity" : alarm_type === 2 ? "Voltage" : alarm_type === 3 ? "Security" : "";
    const UNIT = alarm_type === 0 ? "ºC" : alarm_type === 1 ? "%" : alarm_type === 2 ? "V" : alarm_type === 3 ? "min" : "";
    // const MESSAGE = " Current " + ALARM_TYPE + " is " + current_value + UNIT + ", but setting value is " + setting_value + UNIT + ".";
    const MESSAGE = message;

    const {link, sender, image, time, MsgContent, read = false} = {
        link: "#",
        sender: alarm_name,
        image: sysImg,
        time: convertUTCToLocalString(alarm_time),
        MsgContent: MESSAGE,
        read: status === 0
    };
    const readClassName = read ? "" : "text-danger";

    return (
        <ListGroup.Item action href={link} className="border-bottom border-light">
            <Row className="align-items-center">
                <Col xs={2} md={2} lg={3} xl={3} className="avatar_col">
                    <Image src={image} className="user-avatar lg-avatar rounded-circle"/>
                </Col>
                <Col xs={9} md={9} lg={9} xl={9} className="sender_col">
                    <Row>
                        <h4 className="h6 mb-0 text-small">{sender}</h4>
                    </Row>
                    <Row>
                        <small className={readClassName}>{time}</small>
                    </Row>
                </Col>
            </Row>
            <Row className="align-items-center">
                <p className="font-small mt-1 mb-0">{MsgContent}</p>
            </Row>
        </ListGroup.Item>
    );
};

export default Notification;
