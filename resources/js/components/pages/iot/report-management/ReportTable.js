import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faCheck, faEdit, faEye, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Table, Pagination, Col, Row,} from '@themesberg/react-bootstrap';
import {convertUTCToLocalString} from "../DateParser";

export const ReportTable = (props) => {
    const totalTransactions = props.totalTransactions;
    const totalPages = totalTransactions===0?1:Math.ceil(totalTransactions / props.pageSize);
    const transactions = props.deviceList;
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
    const endNumber = totalPages === 1 || totalPages===2  ? totalPages : activeItem === totalPages ? activeItem : (activeItem === 1 ? activeItem + 2 : activeItem + 1);

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
        const {name, sn, type, group_no, created_at, expire_at} = props;
        const matchType = props.typeOptions.filter(item => item.value == type)[0];
        const matchGroup = props.groupOptions.filter(item => item.value == group_no)[0];
        let createTime = convertUTCToLocalString(created_at);
        let expireTime = convertUTCToLocalString(expire_at);
        return (
            <tr>
                <td className="col-1 col-xl-1 text-center">
                    <span className="fw-normal">
                        {props.index + 1}
                    </span>
                </td>
                <td className="col-2 text-center">
                  <span className="fw-normal">
                    {name}
                  </span>
                </td>
                <td className="col-1 text-center">
                  <span className="fw-normal">
                    {sn}
                  </span>
                </td>
                <td className="col-1 text-center">
                  <span className="fw-normal">
                      {matchType === undefined ? "Not Available" : matchType.label}
                  </span>
                </td>
                <td className="col-1 col-xl-2 text-center">
                  <span className="fw-normal">
                      {matchGroup === undefined ? "Not Available" : matchGroup.label}
                  </span>
                </td>
                <td className="col-2 text-center">
                  <span className={`fw-normal`} >
                    {createTime}
                  </span>
                </td>
                <td className="col-2 text-center">
                  <span className={`fw-normal`}>
                    {expireTime}
                  </span>
                </td>
                <td className="col-2 col-xl-1 text-center">
                    <span className="icon-dark">
                        <Button className={"btn-success action-btn"}
                                onClick={() => props.onDetailClick(props)}>Generate report</Button>
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
                        <th className="border-bottom text-center bold-font">Device Name</th>
                        <th className="border-bottom text-center bold-font">IMEI/SN</th>
                        <th className="border-bottom text-center bold-font">Type of facility</th>
                        <th className="border-bottom text-center bold-font">Group</th>
                        <th className="border-bottom text-center bold-font">Create Time</th>
                        <th className="border-bottom text-center bold-font">Expire Time</th>
                        <th className="border-bottom text-center bold-font">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((t, index) => <TableRow key={`transaction-${t.id}`}  {...t} index={index}
                                                              typeOptions={props.typeOptions}
                                                              groupOptions={props.groupOptions}
                                                              onDetailClick={props.onDetailClick}
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