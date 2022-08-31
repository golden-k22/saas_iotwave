import React from "react";
import {Col, Row, Button} from '@themesberg/react-bootstrap';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import HistoryChart from "./HistoryChart";
import {Toast} from "primereact/toast";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {convertLocalTimeToUTCString} from "../DateParser";

class HistoryDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.dataSource = props.dataSource;
        this.state = {
            dateRange: [this.getDateFrom(2), new Date()],
            height: 400
        };
        this.toastRef=React.createRef();
    }

    /**Get the date of {agoMonth} ago from now. */
    getDateFrom(agoMonth) {
        let curDate = new Date();
        curDate.setMonth(curDate.getMonth() - agoMonth);
        return curDate;
    }

    setDateRange(value){
        this.setState({dateRange: value});
    }

    showToast = (message) => {
        if (message) {
            this.toastRef.current.show({severity: 'success', summary: 'Success', detail: message, life: 3000 });
        }
    };

    async generateReport() {
        let base64Data = await this.saveToArchive('historyChart');
        let fromDate = this.state.dateRange[0].getFullYear() + "-" + ("0"+(this.state.dateRange[0].getMonth() + 1)).substr(-2) + "-" + ("0"+this.state.dateRange[0].getDate()).substr(-2);
        let toDate = this.state.dateRange[1].getFullYear() + "-" + ("0"+(this.state.dateRange[1].getMonth() + 1)).substr(-2) + "-" + ("0"+this.state.dateRange[1].getDate()).substr(-2);
        let dateFrom=convertLocalTimeToUTCString(fromDate,"00:00:00");
        let dateTo=convertLocalTimeToUTCString(toDate, "23:59:59");
        this.props.dataSource.PostRequest("/iot-service/v1/reports/" + this.props.device.id + "?from=" + dateFrom + "&to=" + dateTo,
            data => {
                this.showToast("Report Generated ! ");
                this.props.setReportGenerated(true);
                this.props.dataSource.DownloadFile("/iot-service/v1/reports/download/" + data.id,
                    pdffile => {
                        const filename = data.url.split("/").pop();
                        const url = window.URL.createObjectURL(new Blob([pdffile]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();
                        // Clean up and remove the link
                        link.parentNode.removeChild(link);
                    })
            }, {"base64Chart": base64Data});
    }

    async saveToArchive(chartId) {
        const chartInstance = window.Apex._chartInstances.find(chart => chart.id === chartId);
        const base64 = await chartInstance.chart.dataURI();
        return base64.imgURI;
    }

    render() {
        return (

            <Row className="section-container">
                <Toast ref={this.toastRef} position="bottom-right"/>
                <Row className="top-section">
                    <span className="section-title">{this.props.title}</span>
                </Row>
                <Row className='top-section'>
                        <span className='date-picker-group'>
                            <span>
                                <Button variant="primary" className="mb-2 me-2 date-picker-button"
                                        onClick={() => this.setState({dateRange: [this.getDateFrom(1), new Date()]})}>
                                    Last 1 Month
                                        </Button>
                            </span>
                            <span>
                                <Button variant="primary" className="mb-2 me-2 date-picker-button"
                                        onClick={() => this.setState({dateRange: [this.getDateFrom(3), new Date()]})}>
                                    Last 3 Months
                                        </Button>
                            </span>
                            <span>
                                <DateRangePicker
                                    calendarAriaLabel="Toggle calendar"
                                    clearAriaLabel="Clear value"
                                    rangeDivider="~"
                                    dayAriaLabel="Day"
                                    monthAriaLabel="Month"
                                    nativeInputAriaLabel="Date"
                                    clearIcon={null}
                                    onChange={(value) => this.setDateRange(value)}
                                    value={this.state.dateRange}
                                    yearAriaLabel="Year"
                                />
                            </span>
                            <span>
                                <Button variant="danger" className="mb-2 me-2 back-button"
                                        onClick={() => this.generateReport()}>
                                    GenerateReport
                                        </Button>
                            </span>
                            <span>
                                <Button variant="warning" className="mb-2 me-2 back-button"
                                        onClick={() => this.props.backCallback()}>
                                    Back
                                        </Button>
                            </span>
                        </span>
                </Row>
                <Col xs={12} xl={8} className="mb-4">
                    <HistoryChart height={this.state.height} dateRange={this.state.dateRange}
                                  dataSource={this.dataSource} device={this.props.device}/>
                </Col>
            </Row>
        );
    }

}

export default HistoryDashboard;
