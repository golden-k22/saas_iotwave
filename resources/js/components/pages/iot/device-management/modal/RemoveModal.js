import React, {Fragment, useState} from 'react';
import {Button, Col, Row} from "@themesberg/react-bootstrap";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '45%',
        left: '55%',
        width: '600px',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function RemoveModal(props) {
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [matched, setMatched] = useState(false)

    return (
        <Fragment>
            <div>
                <form>
                    <div className="mb-row w-100">
                        <Button onClick={() => setShowConfirmModal(true)}
                                className={"btn-danger"}><FontAwesomeIcon icon={faTrashAlt}/> Remove</Button>
                    </div>
                </form>
            </div>
            {/* confirmation modal */}
            <Modal
                isOpen={showConfirmModal}
                onRequestClose={() => setShowConfirmModal(false)}
                style={customStyles}
                contentLabel="Confirmation Modal"
            >
                <h4 className="mb-4">Remove Device</h4>
                <p className="mb-3">Are you sure you would like to permanently delete {props.selectedDevice.name}?</p>
                <p className="mb-3">Deletion of the device will remove records related to that device only. Records must
                    be deleted separately.</p>
                <p className="mb-3">Confirm you want to permanently destroy this device by entering its name below.</p>
                <p className="fw-bold text-center py-3 text-center mb-2"
                   style={{backgroundColor: "rgb(206 206 206)"}}>{props.selectedDevice.name}</p>
                <div className="w-100 mb-3">
                    <input type="text" className="form-control" placeholder="Enter the name of device"
                           onChange={(e) => {
                               if (e.target.value === props.selectedDevice.name) {
                                   setMatched(true);
                               } else {
                                   setMatched(false);
                               }
                           }}/>
                </div>
                <div className="mb-row w-100">
                    <Button onClick={() => {
                        setShowConfirmModal(false);
                        props.onClose()
                    }}
                            className={"btn-secondary me-2"}>Cancel</Button>

                    {matched ? <Button onClick={() => {
                            props.onSubmit(props.selectedDevice.id)
                            setMatched(false)
                        }} className={"btn-danger"}><FontAwesomeIcon icon={faTrashAlt}/> Remove</Button> :
                        <Button disabled onClick={() => {
                            props.onSubmit(props.selectedDevice.id)
                            setMatched(false)
                        }} className={"btn-danger"}><FontAwesomeIcon icon={faTrashAlt}/> Remove</Button>}

                </div>
            </Modal>
        </Fragment>
    );
}

export default RemoveModal;