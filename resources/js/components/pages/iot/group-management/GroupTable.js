import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft, faAngleDoubleRight, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Table, Pagination, Col, Row,} from '@themesberg/react-bootstrap';
import {convertUTCToLocalString} from '../DateParser';

export const GroupTable = (props) => {
    const totalTransactions = props.totalTransactions;
    const totalPages = totalTransactions === 0 ? 1 : Math.ceil(totalTransactions / props.pageSize);
    const transactions = props.groupList;
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
        const {name, remark, created_at, admin} = props;
        let createTime = convertUTCToLocalString(created_at);
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
                    {remark}
                  </span>
                </td>
                <td className="col-1 text-center">
                  <span className="fw-normal">
                    {createTime}
                  </span>
                </td>
                {admin? (
                    <td className="col-2 col-xl-1 text-center">
                    <span className="icon-dark">
                        <Button className={"btn-primary action-btn"}
                                onClick={() => props.onEditClick(true, props)}><FontAwesomeIcon
                            icon={faEdit} className="me-2"/> Edit</Button>
                        <Button className={"btn-danger action-btn"}
                                onClick={() => props.onRemoveClick(props)}><FontAwesomeIcon
                            icon={faTrashAlt} className="me-2"/> Remove</Button>
                    </span>
                    </td>
                ): ""}
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
                        <th className="border-bottom text-center bold-font col-1">#</th>
                        <th className="border-bottom text-center bold-font">Name</th>
                        <th className="border-bottom text-center bold-font col-3">Remark</th>
                        <th className="border-bottom text-center bold-font">Create Time</th>
                        {props.admin? <th className="border-bottom text-center bold-font col-2">Action</th>: ""}
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((t, index) => <TableRow key={`transaction-${t.id}`}  {...t} index={index}
                                                              groupOptions={props.groupOptions}
                                                              typeOptions={props.typeOptions}
                                                              onEditClick={props.onEditClick}
                                                              onRemoveClick={props.onRemoveClick}
                                                              admin={props.admin}
                    />)}
                    </tbody>
                </Table>
                <Card.Footer className="w-100 px-3 border-0">
                    <div className="search-bar d-lg-flex align-items-center justify-content-between">
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