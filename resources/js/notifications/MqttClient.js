import React, {Component} from "react";
import mqtt from "mqtt"
import ReactDOM from "react-dom";
import '../components/scss/volt.scss'
import Dropdown, {DropdownToggle, DropdownMenu, MenuItem,} from '@trendmicro/react-dropdown';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import {Badge} from '@themesberg/react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-regular-svg-icons";
import {RestDataSource} from "../service/RestDataSource";
import Notification from "./Notification";

import {Toast} from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Badger from "./Badger";

class MqttClient extends Component {
    constructor(props) {
        super(props);
        this.dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => console.log("Server connection failed."));
        this.state = {
            notifications: [],
            cntOfNotifications: 0,
            isLoaded: false,
        };
        this.client = null;
        this.toastRef = React.createRef();
        this.urgentAudio = new Audio(process.env.MIX_APP_URL + '/sounds/urgent-alert-bells-echo-in-7.mp3');
        this.warningAudio = new Audio(process.env.MIX_APP_URL + '/sounds/warning-notification-4-bells.mp3');
        this.title = document.title;
        const myBadgerOptions = {};
        this.myBadger = new Badger(myBadgerOptions);
        this.myBadger.value = 0;
    }


    render() {
        return (
            <>
                <Toast ref={this.toastRef} position="bottom-right"/>
                <Dropdown
                    onSelect={(eventKey) => {
                        this.readNotification(eventKey)
                    }}
                >
                    <DropdownToggle btnStyle="link" btnSize="lg">
                        <FontAwesomeIcon icon={faBell} className="bell-shake"/>
                    </DropdownToggle>
                    {!this.state.isLoaded || this.state.cntOfNotifications === 0 ? null :
                        <Badge bg="danger" className="me-1 alarm-count-badge">{this.state.cntOfNotifications}</Badge>}
                    <DropdownMenu>
                        {this.state.notifications.map(n =>
                            <MenuItem
                                eventKey={n.id}
                                key={`notification-${n.id}`}
                                onSelect={(eventKey) => {
                                }}
                            >
                                <Notification key={`notification-${n.id}`} {...n} />
                            </MenuItem>
                        )}
                        <MenuItem
                            eventKey={-1}
                            active
                            title="link with title"
                            onSelect={(eventKey) => {
                            }}
                        >
                            View all messages.
                        </MenuItem>
                    </DropdownMenu>
                </Dropdown>
            </>
        )
    }

    showToast = (message) => {
        if (message) {
            this.toastRef.current.show({severity: 'info', summary: 'Warning Message', detail: message, life: 3000});
        }
    };

    async componentDidMount() {
        this.getCountOfNotifications();
        this.interval = setInterval(() => this.getCountOfNotifications(), 60000);
        await this.subscribe();
    }

    componentWillUnmount() {
        if (this.client !== null) {
            this.client.end();
        }
    }

    markNotificationsAsRead = () => {
        console.log("readed.");
    };

    async subscribe() {
        let clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
        let host = process.env.MIX_IOT_MQTT_SERVER_URL;
        let options = {
            keepalive: 0,
            clientId: clientId,
            reconnectPeriod: 1000,
            connectTimeout: 3 * 1000,
            // protocol: 'Mqtt',
            will: {
                topic: 'WillMsg',
                payload: 'Connection Closed abnormally..!',
                qos: 0,
                retain: false
            },
            rejectUnauthorized: false
        };

        console.log('connecting to mqtt client...');
        this.client = mqtt.connect(host, options);
        let that = this;
        this.client.on('connect', function () {
            console.log('connected successfully!');
            that.getCountOfNotifications();
            that.client.subscribe("user_01/", function (err) {
                if (err) {
                    console.log('cannot subscribe...');
                }
            });
        });

        this.client.on('message', (topic, payload, packet) => {
                // let json_obj = JSON.parse(payload.toString());
                this.showToast("Occurred Sensor Alarm ! ");
                this.getCountOfNotifications();
            }
        );

        this.client.on('close', () => {
            console.log("closed: ")
        });
        this.client.on('error', (err) => {
            console.log("Error: ", err)
        });
        this.client.on('disconnect', (packet) => {
            console.log("Dicconnect: ", packet)
        })

    }

    getCountOfNotifications() {
        this.dataSource.GetRequest("/iot-service/v1/alarms/records/counts?is_read=1",
            data => {
                this.myBadger.value = data.count;
                this.changeTitle(data.count);
                this.setState({cntOfNotifications: data.count}, () => {
                    this.getLastNotifications(3);
                });
            });
    }

    getLastNotifications(limitNo) {
        this.dataSource.GetRequest("/iot-service/v1/alarms/records?limit=" + limitNo,
            data => {
                if (data.length > 0 && this.state.notifications.length > 0 && (data[0].created_at != this.state.notifications[0].created_at)) {
                    if (data[0].alarm_item <= 1) {
                        this.playAudio(this.urgentAudio);
                    } else if (data[0].alarm_item > 1) {
                        this.playAudio(this.warningAudio)
                    }
                }
                this.setState({notifications: data}, () => {
                    this.setState({isLoaded: true});
                });

            });
    }

    playAudio(audioSrc) {
        const audioPromise = audioSrc.play()
        if (audioPromise !== undefined) {
            audioPromise
                .then(_ => {
                    // autoplay started
                })
                .catch(err => {
                    // catch dom exception
                    console.info(err)
                })
        }
    }

    changeTitle(count) {
        if (count != 0) {
            let newTitle = '(' + count + ') ' + this.title;
            document.title = newTitle;
        }else {
            document.title = this.title;
        }
    }


    readNotification(eventId) {
        window.location.href = '/admin/alarms/records';
    }


}

export default MqttClient;

let appContainer = document.querySelector('.app-container');
let navBar = appContainer.querySelector('nav.navbar.navbar-top .container-fluid .navbar-header');
let badge = document.createElement("span");
badge.setAttribute('id', 'alarm-badge');
navBar.appendChild(badge);

if (document.getElementById('alarm-badge')) {
    ReactDOM.render(<MqttClient/>, document.getElementById('alarm-badge'));
    document.getElementById('alarm-badge').click();
}
