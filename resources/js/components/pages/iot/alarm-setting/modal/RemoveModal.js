import React, {useState} from 'react';
import {Button, Col,  Row} from "@themesberg/react-bootstrap";
import { faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function RemoveModal(props) {
    return (
        <div>
            <form>
                <div className="mb-row w-100 text-right">
                    <Button onClick={() => props.onSubmit(props.selectedAlarm.id)}
                            className={"btn-danger btn"}><FontAwesomeIcon icon={faTrashAlt}/> Remove</Button>
                    <Button onClick={() => props.onClose()}
                            className={"btn-secondary btn"}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}

export default RemoveModal;