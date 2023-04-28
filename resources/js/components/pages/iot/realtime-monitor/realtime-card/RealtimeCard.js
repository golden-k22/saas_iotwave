import React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "react-simple-card";
import "./card_style.css";
import tempIcon from "../../../../assets/img/icons/temperature.png";
import Image from "@themesberg/react-bootstrap/lib/esm/Image";
import {convertUTCToLocalString} from "../../DateParser";

const RealtimeCard = (props) => {
        // const history = useHistory();

        function handleClick(id, sn, name) {
            props.viewHistoryCallback(id, sn, name);
            // history.push("/admin/devices/history/" + id);
        }

        const {wlt, wht, lt, ht, wlh, whh, lh, hh, lv, oft} = props.alarm !== undefined ? props.alarm :
            {
                device_sn:null,
                wlt: null,
                wht: null,
                lt: null,
                ht: null,
                wlh: null,
                whh: null,
                lh: null,
                hh: null,
                lv: null,
                oft: null
            };

        function isWarning() {
            let warning = false;
            if ((wlt !== null && props.message.temperature < wlt)
                || (wht !== null && props.message.temperature > wht)
                || (wlh !== null && props.message.humidity < wlh)
                || (whh !== null && props.message.humidity > whh)) {
                warning = true;
            }
            return warning;
        }

        function isDangerous() {
            let dangerous = false;
            if ((lt !== null && props.message.temperature < lt)
                || (ht !== null && props.message.temperature > ht)
                || (lh !== null && props.message.humidity < lh)
                || (hh !== null && props.message.humidity > hh)
                || (lv !== null && props.message.voltage < lv)) {
                dangerous = true;
            }
            return dangerous;
        }

        return (
            <Card style={{width: '280px' ,boxShadow: '0 2px 3px 1px #ccc'}}
                  className="realtime-card-container"
                  bgColor={(props.message.voltage === "--" ? '#aaaaaa' : isDangerous() ? '#c91112' : isWarning() ? '#ffb848' : '#28b779')}
            >
                <CardHeader
                    className={(props.message.voltage === "--" ? 'card-header-passive' : isDangerous() ? 'card-header-accident' : isWarning() ? 'card-header-warning' : 'card-header-normal')}>
                   <div className="w-100 d-flex align-items-center justify-content-between">
                       <span
                           className="card-text-color card-header-bold">{props.message.name}</span>
                       <div className="d-flex">
                           <div className="props-title card-text-color me-2">
                               <span className="card-header-bold">{props.message.signal}</span><span>DB</span>
                           </div>
                           <div className="props-title card-text-color">
                               <span className="card-header-bold">{props.message.voltage}</span><span>V</span>
                           </div>
                       </div>
                   </div>
                </CardHeader>
                <CardBody>
                    <div className={"row"}>
                        <div className="col-5  sensor-icon">
                            <Image src={tempIcon}/>
                        </div>
                        <div className="col-7">
                            <div className="card-content-height-wrapper w-100 d-flex">
                                <div
                                    className="col-9 sensor-props card-text-color card-header-bold me-1">{props.message.temperature}</div>
                                <div className="col-3 sensor-unit card-text-color">ºC</div>
                            </div>
                            <div className="card-content-height-wrapper w-100 d-flex">
                                <div
                                    className="col-9 sensor-props card-text-color card-header-bold me-2">{
                                    props.message.humidity != 255 ? props.message.humidity : "--"}
                                </div>
                                <div className="col-3 sensor-unit card-text-color">%</div>
                            </div>
                            <div
                                className="time-props card-text-color w-100 pe-2">{props.message.time == "--/--/-- --:--" ? "--/--/--  --:--" : convertUTCToLocalString(props.message.time)}
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <div onClick={() => handleClick(props.message.device_id, props.message.device_sn, props.message.name)}
                         className=" col-md-12 col-xs-12 col-lg-12 col-xl-12 history-link">VIEW HISTORY
                    </div>
                </CardFooter>
            </Card>
        )
    }
;
export default RealtimeCard;


