import React from 'react';
import ReactApexChart from 'react-apexcharts';
import "@fortawesome/fontawesome-free/css/all.css";
import Preloader from "../../../components/Preloader";
import {convertLocalTimeToUTCString} from "../DateParser";

class HistoryChart extends React.Component {
    constructor(props) {
        super(props);
        this.dataSource = props.dataSource;
        this.state = {
            loaded: false,
            series: [],
            options: {
                chart: {
                    id: 'historyChart',
                    height: this.props.height,
                    type: 'line',
                    zoom: {
                        type: 'x',
                        enabled: true,
                    },
                    animations: {
                        enabled: true
                    },
                    dropShadow: {
                        enabled: false,
                        top: 0,
                        left: 0,
                        blur: 1,
                        opacity: 0.5
                    },
                },
                title: {
                    text: 'History Data : ' + this.props.device.sn,
                    align: 'center',
                    margin: 0,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '16px',
                        fontWeight: 700,
                        fontFamily: 'sans-serif',
                        color: '#5c5c5c'
                    },
                },
                stroke: {
                    width: 2,
                    curve: 'straight',
                    lineCap: 'round',
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    x: {
                        format:"dd MMM-HH:mm"
                    },
                    y: [{
                        formatter: (v) => {
                            return v + " V"
                        }
                    }, {
                        formatter: (v) => {
                            return v + " ºC"
                        }
                    }, {
                        formatter: (v) => {
                            return v + " %"
                        },
                    }]
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        datetimeUTC: false
                    }
                },
                yaxis: {
                    labels: {
                        show: true,
                        // formatter: (v) => formatTime(v)
                        // if (v != null)
                        //     return v.toFixed(3);
                    },
                    // axisTicks: {
                    //   show: true
                    // },
                    title: {
                        text: "Value",
                        style: {
                            fontSize: '14px',
                            fontWeight: 700,
                        }
                    },
                },
            },
        };
    }


    render() {
        return (

            <div className='react-component-container'>
                {this.state.loaded == false ?
                    <div className='preloader-container'><Preloader show={this.state.loaded ? false : true}/>
                    </div> :
                    <div id="chart">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="line"
                                        height={this.props.height}/>
                    </div>
                }
            </div>
        );
    }

    componentDidMount() {
        this.refreshComponent(this.props)
    }

    componentDidUpdate(prevProps) {
        if (this.props.dateRange !== prevProps.dateRange) {
            this.refreshComponent(this.props);
        }
    }

    refreshComponent(requestData) {
        let fromDate = requestData.dateRange[0].getFullYear() + "-" + ("0"+(requestData.dateRange[0].getMonth() + 1)).substr(-2) + "-" + ("0"+requestData.dateRange[0].getDate()).substr(-2);
        let toDate = requestData.dateRange[1].getFullYear() + "-" + ("0"+(requestData.dateRange[1].getMonth() + 1)).substr(-2) + "-" + ("0"+requestData.dateRange[1].getDate()).substr(-2);
        let dateFrom=convertLocalTimeToUTCString(fromDate,"00:00:00");
        let dateTo=convertLocalTimeToUTCString(toDate, "23:59:59");
        this.props.dataSource.GetRequest("/iot-service/v1/" + this.props.tenant + "/history/" + this.props.device.id + "?from=" + dateFrom + "&to=" + dateTo,
            data => {
                let series = [];
                let voltData = [];
                let tempData = [];
                let humidityData = [];
                let isHumidity=false;
                isHumidity=data.humidity[0]!=255;
                if (isHumidity) {
                    for (let i = 0; i < data.sensor_time.length; i++) {
                        let time_series = new Date(data.sensor_time[i]);
                        let diff = time_series.getTimezoneOffset() * 60 * 1000;
                        let timestamp = time_series.getTime()-diff;
                        let volt_series = data.voltage[i];
                        let temp_series = data.temperature[i];
                        let humidity_series = data.humidity[i];
                        voltData.push([timestamp, volt_series]);
                        tempData.push([timestamp, temp_series]);
                        humidityData.push([timestamp, humidity_series]);
                    }
                }else {
                    for (let i = 0; i < data.sensor_time.length; i++) {
                        let time_series = new Date(data.sensor_time[i]);
                        let diff = time_series.getTimezoneOffset() * 60 * 1000;
                        let timestamp = time_series.getTime() - diff;
                        let volt_series = data.voltage[i];
                        let temp_series = data.temperature[i];
                        voltData.push([timestamp, volt_series]);
                        tempData.push([timestamp, temp_series]);
                    }
                }

                series.push({name: "Voltage", data: voltData});
                series.push({name: "Temperature", data: tempData});
                if (isHumidity) {
                    series.push({name: "Humidity", data: humidityData});
                }
                this.setState({series: series, seriesLine: series},
                    () => {
                        this.setState({loaded: true})
                    })

            });
    }
}


export default HistoryChart
