import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faFileDownload, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import {Card, Button, Table} from '@themesberg/react-bootstrap';
import Preloader from "../../../components/Preloader";
import {convertUTCToLocalString} from "../DateParser";

export const ReportListTable = (props) => {
    const [reportList, setReportList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (props.reportGenerated === true) {
            props.dataSource.GetRequest("/iot-service/v1/" + props.tenant + "/reports/" + props.device.id,
                data => {
                    setReportList(data);
                    setLoaded(true);
                });
            props.setReportGenerated(false);
        }
    }, [props.reportGenerated]);

    function onDownloadClick(report) {
        props.dataSource.DownloadFile("/iot-service/v1/" + props.tenant + "/reports/download/" + report.id,
            pdffile => {
                const filename = report.url.split("/").pop();
                const url = window.URL.createObjectURL(new Blob([pdffile]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            })
    }

    function onRemoveClick(reportId) {
        props.dataSource.DeleteRequest("/iot-service/v1/" + props.tenant + "/reports/" + reportId,
            data => {
                let updatedList = [];
                reportList.map(report => {
                    if (report.id != data.id) {
                        updatedList.push(report)
                    }
                });
                setReportList(updatedList);
            }
        );
    }


    const TableRow = (props) => {
        const {id, url, } = props;
        const from=convertUTCToLocalString(props.date_from);
        const to=convertUTCToLocalString(props.date_to);
        const created_at=convertUTCToLocalString(props.created_at);
        return (
            <tr className={"vertical-middle"}>
                <td className="col-1 text-center">
                    <span className="fw-normal">
                        {props.index + 1}
                    </span>
                </td>
                <td className="col-2 text-center">
                  <span className="fw-normal">
                    {url}
                  </span>
                </td>
                <td className="col-1 text-center">
                  <span className="fw-normal">
                    {from}
                  </span>
                </td>
                <td className="col-1 text-center">
                  <span className="fw-normal">
                    {to}
                  </span>
                </td>
                <td className="col-2 text-center">
                  <span className={`fw-normal`}>
                    {created_at}
                  </span>
                </td>
                <td className="col-2 text-center">
                    <span className="icon-dark">
                        <Button className={"btn-success btn-sm me-2"}
                                onClick={() => props.onDownloadClick(props)}><FontAwesomeIcon
                            icon={faFileDownload} className="me-2"/> Download</Button>
                        <Button className={"btn-danger btn-sm"}
                                onClick={() => props.onRemoveClick(id)}><FontAwesomeIcon
                            icon={faTrashAlt} className=""/> Remove</Button>
                    </span>
                </td>
            </tr>
        );
    };

    return (
        <>
            {!loaded ?
                <div className='preloader-container'><Preloader show={true}/></div> :
                <Card
                    border="light" className="table-wrapper shadow-sm">
                    <Card.Body className="pt-0">
                        <Table hover className="user-table align-items-center table-responsive">
                            <thead>
                            <tr>
                                <th className="border-bottom text-center bold-font">#</th>
                                <th className="border-bottom text-center bold-font">URL</th>
                                <th className="border-bottom text-center bold-font">From</th>
                                <th className="border-bottom text-center bold-font">To</th>
                                <th className="border-bottom text-center bold-font">Created At</th>
                                <th className="border-bottom text-center bold-font">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reportList.map((t, index) => <TableRow key={`transaction-${t.id}`}  {...t} index={index}
                                                                    onDownloadClick={onDownloadClick}
                                                                    onRemoveClick={onRemoveClick}
                            />)}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            }
        </>
    );
};