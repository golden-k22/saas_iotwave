import React, {Fragment} from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {RestDataSource} from "../../../../service/RestDataSource";
import '../../../scss/management-table-style.scss';
import AlarmSettingManager from "./AlarmSettingManager";

const AlarmSettingRouter = (parentProps) => {
    // const dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => this.props.history.push('/error/${err}'));
    const dataSource = new RestDataSource(process.env.MIX_IOT_APP_URL, (err) => console.log("Server connection failed."));

    return <BrowserRouter basename={"/" + parentProps.tenant}>
        <Routes>
            <Route
                path={"/alarm/settings/temperature"}
                element={<AlarmSettingManager dataSource={dataSource ? dataSource : null} alarmType={0}
                                              tenant={parentProps.tenant} admin={parentProps.admin}/>}
            />
            <Route
                path={"/alarm/settings/humidity"}
                element={<AlarmSettingManager dataSource={dataSource ? dataSource : null}
                                              alarmType={1} tenant={parentProps.tenant}
                                              admin={parentProps.admin}/>}
            />
            <Route
                path={"/alarm/settings/voltage"}
                element={<AlarmSettingManager dataSource={dataSource ? dataSource : null}
                                                alarmType={2} tenant={parentProps.tenant}
                                                admin={parentProps.admin}/>}
            />
            <Route
                path={"/alarm/settings/security"}
                element={<AlarmSettingManager dataSource={dataSource ? dataSource : null}
                                              alarmType={3} tenant={parentProps.tenant}
                                              admin={parentProps.admin}/>}
            />
            <Route
                element={<div>Not found alarms</div>}
            />
        </Routes>
    </BrowserRouter>
};

export default AlarmSettingRouter;

if (document.getElementById('alarm-setting-dashboard')) {
    let admin = false;
    let tenant = document.documentURI.split("/")[3];
    let user = document.getElementById("alarm-setting-dashboard").getAttribute("data-user");
    if (user === tenant) {
        admin = true;
    }
    ReactDOM.render(<AlarmSettingRouter tenant={tenant}
                                        admin={admin}/>, document.getElementById('alarm-setting-dashboard'));
}