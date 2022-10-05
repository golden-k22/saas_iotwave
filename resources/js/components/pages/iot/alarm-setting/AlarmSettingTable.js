import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft, faAngleDoubleRight, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Card, Button, Table, Pagination, Col, Row,} from '@themesberg/react-bootstrap';
import {
    convertUTCToLocalString,
    convertUTCToLocalHourString,
    makeStartDateTimeFromUTCDate,
    makeEndDateTimeFromUTCDate
} from "../DateParser";

export const AlarmSettingTable = (props) => {
    const totalTransactions = props.totalTransactions;
    const totalPages = totalTransactions === 0 ? 1 : Math.ceil(totalTransactions / props.pageSize);
    const transactions = props.alarmList;
    const [activeItem, setActiveItem] = React.useState(1);
    const retrievedRecordNo = (activeItem - 1) * props.pageSize + transactions.length;
    const size = "sm", withIcons = true, disablePrev = false;
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

    const TableRow = (properties) => {
        const {
            id,
            name,
            device_sn,
            low_warning,
            high_warning,
            low_threshold,
            high_threshold,
            date_from,
            date_to,
            time_from,
            time_to,
            repeat,
            group_no,
            created_at,
            offline_time
        } = properties;
        const LOW_WARNING = properties.type === 0 ? "WLT" : properties.type === 1 ? "WLH" : "Low Warning";
        const HIGH_WARNING = properties.type === 0 ? "WHT" : properties.type === 1 ? "WHH" : "High Warning";
        const LOW_THRESHOLD = properties.type === 0 ? "LT" : properties.type === 1 ? "LH" : properties.type === 2 ? "LV" : "Low Threshold";
        const HIGH_THRESHOLD = properties.type === 0 ? "HT" : properties.type === 1 ? "HH" : "High Threshold";
        const OFFLINE_TIME = properties.type === 3 ? "Offline Time" : "";
        const UNIT = properties.type === 0 ? "ºC" : properties.type === 1 ? "%" : properties.type === 2 ? "V" : properties.type === 3 ? "min" : "";
        const matchDevice = properties.deviceOptions.filter(item => item.value == device_sn)[0];
        const matchGroup = properties.groupOptions.filter(item => item.value == group_no)[0];
        const dateFrom = makeStartDateTimeFromUTCDate(date_from);
        const dateTo = makeEndDateTimeFromUTCDate(date_to);
        const createTime = convertUTCToLocalString(created_at);
        const timeFrom = convertUTCToLocalHourString(time_from);
        const timeTo = convertUTCToLocalHourString(time_to);
        return (
            <tr>
                <td className="col-1 text-center">
                    <span className="fw-normal">
                        {properties.index + 1}
                    </span>
                </td>
                <td className="col-2 text-center">
                  <span className="fw-normal">
                    {name}
                  </span>
                </td>
                <td className="col-1 text-center">
                  <span className="fw-normal">
                      {matchDevice? matchDevice.label : "Not Available"}
                  </span>
                </td>
                <td className="col-1 text-center">
                  <span className="fw-normal">
                      {matchGroup ? matchGroup.label : "Not Available"}
                  </span>
                </td>

                <td className="col-2 text-center">
                    {properties.type === 0 || properties.type === 1 ?
                        <div>
                            <span className="fw-normal">{LOW_WARNING}: {low_warning} {UNIT}</span>
                        </div> : null
                    }
                    {properties.type === 0 || properties.type === 1 ?
                        <div>
                            <span className="fw-normal">{HIGH_WARNING}: {high_warning} {UNIT}</span>
                        </div> : null
                    }
                    {properties.type === 0 || properties.type === 1 || properties.type === 2 ?
                        <div>
                            <span className="fw-normal">{LOW_THRESHOLD}: {low_threshold} {UNIT}</span>
                        </div> : null
                    }
                    {properties.type === 0 || properties.type === 1 ?
                        <div>
                            <span className="fw-normal">{HIGH_THRESHOLD}: {high_threshold} {UNIT}</span>
                        </div> : null
                    }
                    {properties.type === 3 ?
                        <div>
                            <span className="fw-normal">{OFFLINE_TIME}: {offline_time} {UNIT}</span>
                        </div> : null
                    }
                </td>
                <td className="col-2 text-center">
                    <div>
                        <span className="fw-normal">{dateFrom} ~ {dateTo}</span>
                    </div>
                    <div>
                        <span className="fw-normal">{timeFrom} ~ {timeTo}</span>
                    </div>
                </td>
                <td className="col-1 text-center">
                  <span className={`fw-normal`}>
                    {createTime}
                  </span>
                </td>
                {props.admin ? (<td className="col-2 text-center">
                    <span className="icon-dark">
                        <Button className={"btn-primary btn-sm me-2"}
                                onClick={() => properties.onEditClick(true, properties)}><FontAwesomeIcon
                            icon={faEdit} className="me-1"/>Edit</Button>
                        <Button className={"btn-danger btn-sm"}
                                onClick={() => properties.onRemoveClick(properties)}><FontAwesomeIcon
                            icon={faTrashAlt} className="me-1"/>Remove</Button>
                    </span>
                </td>) : ""}
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
                        <th className="border-bottom text-center bold-font">Name</th>
                        <th className="border-bottom text-center bold-font">Device</th>
                        <th className="border-bottom text-center bold-font">Group</th>
                        <th className="border-bottom text-center bold-font">Event</th>
                        <th className="border-bottom text-center bold-font">Effective Time</th>
                        <th className="border-bottom text-center bold-font">Create Time</th>
                        {props.admin? <th className="border-bottom text-center bold-font">Action</th> : ""}
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((t, index) => <TableRow key={`transaction-${t.id}`}  {...t} index={index}
                                                              type={props.type}
                                                              deviceOptions={props.deviceOptions}
                                                              groupOptions={props.groupOptions}
                                                              onEditClick={props.onEditClick}
                                                              onRemoveClick={props.onRemoveClick}
                    />)}
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