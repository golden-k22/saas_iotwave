import React, {useState} from 'react';
import {Button, Col, FormControl, Row} from "@themesberg/react-bootstrap";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function AddEditModal(props) {
    const [groupName, setGroupName] = useState(!props.isEdit?"":props.selectedGroup.name);
    const [remark, setRemark] = useState(!props.isEdit?"":props.selectedGroup.remark);
    const [isError, setError]=useState(false);
    function updateGroup(){
        if (groupName==="") {
            setError(true)
        }else {
            props.onSubmit(!props.isEdit?null:props.selectedGroup.id, groupName, remark )
        }
    }
    return (
        <div>
            <form>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Group Name</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <FormControl defaultValue={groupName} name="groupName" type="text" placeholder=""
                                     className="key-input-value grey-border"
                                     onChange={e => setGroupName(e.target.value)}/>
                        {
                            isError ?
                                <span style={{color: "red"}}>Please input the name of the group</span> : null
                        }
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={1} md={1} lg={1} xl={1}/>
                    <Col xs={4} md={4} lg={4} xl={4}>
                        <label className="facility-type-title">Remark</label>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <FormControl  defaultValue={remark} type="text" placeholder="" className="key-input-value grey-border"
                                     onChange={e => setRemark(e.target.value)}/>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
                <Row className="mb-row">
                    <Col xs={9} md={9} lg={9} xl={9}>
                    </Col>
                    <Col xs={2} md={2} lg={2} xl={2} className="align-right">
                        <Button onClick={() => updateGroup()}
                                className={"btn-success search-btn"}>{props.isEdit?<FontAwesomeIcon icon={faEdit}/>:<FontAwesomeIcon icon={faPlus}/>}{props.isEdit?" Save": " Add"}</Button>
                    </Col>
                    <Col xs={1} md={1} lg={1} xl={1}/>
                </Row>
            </form>
        </div>
    );
}

export default AddEditModal;