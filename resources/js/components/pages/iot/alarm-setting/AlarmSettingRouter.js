import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {RestDataSource} from "../../../../service/RestDataSource";
import '../../../scss/management-table-style.scss';
import AlarmSettingManager from "./AlarmSettingManager";

const AlarmSettingRouter = ()=>{
    // const dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => this.props.history.push('/error/${err}'));
    const dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => console.log("Server connection failed."));

    return <Router >
        <Routes>
            <Route exact path="/admin/alarms/temperature" render={(props) => <AlarmSettingManager {...props} dataSource={dataSource?dataSource:null} alarmType={0}/> } />
            <Route exact path="/admin/alarms/humidity" render={(props) => <AlarmSettingManager {...props} dataSource={dataSource?dataSource:null} alarmType={1}/> } />
            <Route exact path="/admin/alarms/voltage" render={(props) => <AlarmSettingManager {...props} dataSource={dataSource?dataSource:null} alarmType={2}/> } />
            <Route exact path="/admin/alarms/security" render={(props) => <AlarmSettingManager {...props} dataSource={dataSource?dataSource:null} alarmType={3}/> } />
            <Navigate to="/" />
        </Routes>
    </Router>
};

export default AlarmSettingRouter;

if (document.getElementById('alarm-setting-dashboard')) {
    ReactDOM.render(<AlarmSettingRouter/>, document.getElementById('alarm-setting-dashboard'));
}