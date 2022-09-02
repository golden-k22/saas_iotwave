import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faCheck, faEdit, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Table, Pagination, Col, Row,} from '@themesberg/react-bootstrap';
import {convertUTCToLocalString} from "../DateParser";

export const AlarmRecordTable = (props) => {
    const totalTransactions = props.totalTransactions;
    const totalPages = totalTransactions === 0 ? 1 : Math.ceil(totalTransactions / props.pageSize);
    const transactions = props.alarmRecordList;
    const [activeItem, setActiveItem] = React.useState(1);
    const retrievedRecordNo = (activeItem - 1) * props.pageSize + transactions.length;
    const size = "sm", withIcons = true, disablePrev = false
    const onPrevItem = () => {
        const prevActiveItem = activeItem === 1 ? activeItem : activeItem - 1;
        props.onPagenationCallback(prevActiveItem);
        setActiveItem(prevActiveItem);
    };

    const onNextItem = (totalPages) => {
        const nextActiveItem = activeItem === totalPages ? activeItem : activeItem + 1;
        props.onPagenationCallback(nextActiveItem);
        setActiveItem(nextActiveItem);
    };

    const items = [];
    const startNumber = activeItem === 1 || totalPages === 2 ? 1 : (activeItem < totalPages ? activeItem - 1 : activeItem - 2);
    const endNumber = totalPages === 1 || totalPages === 2 ? totalPages : activeItem === totalPages ? activeItem : (activeItem === 1 ? activeItem + 2 : activeItem + 1);

    for (let number = startNumber; number <= endNumber; number++) {
        const isItemActive = activeItem === number;
        const handlePaginationChange = () => {
            props.onPagenationCallback(number);
            setActiveItem(number);
        };
        items.push(
            <Pagination.Item active={isItemActive} key={number} onClick={handlePaginationChange}>
                {number}
            </Pagination.Item>
        );
    }

    const TableRow = (props) => {
        const {id, alarm_time, alarm_name, sn, alarm_type, alarm_item, current_value, setting_value, message, status} = props;
        const alarmTime=convertUTCToLocalString(alarm_time);
        const ALARM_TYPE = alarm_type === 0 ? "Temperature" : alarm_type === 1 ? "Humidity" : alarm_type === 2 ? "Voltage" : alarm_type === 3 ? "Security" : "";
        const UNIT = alarm_type === 0 ? "ºC" : alarm_type === 1 ? "%" : alarm_type === 2 ? "V" : alarm_type === 3 ? "min" : "";
        const MATCH_DEVICE = props.deviceOptions.filter(item => item.value == sn)[0];
        const MESSAGE = message + ".  Current " + ALARM_TYPE + " is " + current_value + UNIT + ", but setting value is " + setting_value + UNIT + ".";
        return (
            <tr>
                <td className="col-1 col-xl-1 text-center">
                    <span className="fw-normal">
                        {props.index + 1}
                    </span>
                </td>
                <td className="col-2 text-center">
                  <span className="fw-normal">
                    {ALARM_TYPE}
                  </span>
                </td>
                <td className="col-1 text-center">
                  <span className="fw-normal">
                      {MATCH_DEVICE === undefined ? "Not Available" : MATCH_DEVICE.label + "[" + MATCH_DEVICE.value + "]"}
                  </span>
                </td>
                <td className="col-1">
                  <span className="fw-normal">
                      {MESSAGE}
                  </span>
                </td>
                <td className="col-1 text-center">
                  <span className="fw-normal">
                      {alarmTime}
                  </span>
                </td>
                <td className="col-1 text-center">
                  <span className="fw-normal">
                      {status === 1 ?
                          <Button className={"btn-danger btn-sm"}
                                  onClick={() => props.onCheckRecordCallback(id)}>
                              Make as read</Button> :
                          <Button className={"btn-success btn-sm"}
                                  onClick={() => props.onCheckRecordCallback(id)} disabled={true}><FontAwesomeIcon
                              icon={faCheck} className="me-2"/> Checked</Button>
                      }
                  </span>
                </td>
            </tr>
        );
    };

    return (
        <Card
            border="light" className="table-wrapper table-responsive shadow-sm">
            <Card.Body className="pt-0">
                <Table hover className="user-table align-items-center">
                    <thead>
                    <tr>
                        <th className="border-bottom text-center bold-font">#</th>
                        <th className="border-bottom text-center bold-font">Alarm Type</th>
                        <th className="border-bottom text-center bold-font">Object</th>
                        <th className="border-bottom text-center bold-font">Alarm Content</th>
                        <th className="border-bottom text-center bold-font">Time</th>
                        <th className="border-bottom text-center bold-font">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((t, index) =>
                        <TableRow key={`transaction-${t.id}`}  {...t}
                                  index={index}
                                  deviceOptions={props.deviceOptions}
                                  onCheckRecordCallback={props.onCheckRecordCallback}
                        />)
                    }
                    </tbody>
                </Table>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <div className="search-bar w-100 d-flex justify-content-between align-items-center">
                        <small className="fw-bold">
                            Showing <b>{retrievedRecordNo}</b> out of <b>{totalTransactions}</b> entries
                        </small>
                        <Pagination size={size} className="mt-3">
                            <Pagination.Prev disabled={disablePrev} onClick={onPrevItem}>
                                {withIcons ? <FontAwesomeIcon icon={faAngleDoubleLeft}/> : "Previous"}
                            </Pagination.Prev>
                            {items}
                            <Pagination.Next onClick={() => onNextItem(totalPages)}>
                                {withIcons ? <FontAwesomeIcon icon={faAngleDoubleRight}/> : "Next"}
                            </Pagination.Next>
                        </Pagination>
                    </div>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};