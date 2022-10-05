export const convertUTCToLocalString = (dateStr) => {
    let createTime = new Date(dateStr);
    let diff = createTime.getTimezoneOffset() * 60 * 1000;
    let timestamp = createTime.getTime() - diff;
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // Hours part from the timestamp
    let hours = "0" + date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Will display time in 10:30:23 format
    let formattedTime = year + '-' + month + '-' + day + ' ' + hours.substr(-2) + ':' + minutes.substr(-2);
    return formattedTime;
};

/**
 * Convert Date to only Date string.
 * @param date
 * @returns {string}
 */
export const makeDateOnly = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
};

/**
 * Make Start position local Datetime String from UTC Date string.
 */
export const makeStartDateTimeFromUTCDate = (dateStr) => {
    let createTime = new Date();
    let diffmins = createTime.getTimezoneOffset();
    let tempMins = 24 * 60 + diffmins;
    let resultHrs = parseInt(tempMins / 60);
    let resultMins = tempMins % 60;
    let startTime = resultHrs + ":" + resultMins + ":00";
    let formattedDate = convertUTCToLocalString(dateStr + " " + startTime);
    return formattedDate;
}
/**
 * Make End position local Datetime String from UTC Date string.
 */
export const makeEndDateTimeFromUTCDate = (dateStr) => {
    let createTime = new Date();
    let diffmins = createTime.getTimezoneOffset();
    let tempMins = (23 * 60 + 59) + diffmins;
    let resultHrs = parseInt(tempMins / 60);
    let resultMins = tempMins % 60;
    let startTime = resultHrs + ":" + resultMins + ":00";
    let formattedDate = convertUTCToLocalString(dateStr + " " + startTime);
    return formattedDate;
}
/**
 * Convert Date to UTC datetime string.
 * @param dateStr
 * @returns {string}
 */
export const convertTotalLocalTimeToUTCString = (dateObj) => {

    let createTime = new Date(dateObj);
    let diff = createTime.getTimezoneOffset() * 60 * 1000;
    let timestamp = createTime.getTime() + diff;
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = "0" + date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Will display time in 10:30:23 format
    let formattedTime = year + '-' + month + '-' + day + ' ' + hours.substr(-2) + ':' + minutes.substr(-2);
    return formattedTime;
};

/**
 * Convert Date time string to UTC datetime string.
 * @param dateStr
 * @param timeStr
 * @returns {string}
 */
export const convertLocalTimeToUTCString = (dateStr, timeStr) => {

    let createTime = new Date(dateStr);
    let diff = createTime.getTimezoneOffset() * 60 * 1000;
    let timestamp = createTime.getTime() + diff;

    let diffMins = createTime.getTimezoneOffset();
    let time = timeStr.split(':');
    let hrs = parseInt(time[0]);
    let mins = parseInt(time[1]);
    let originMins = hrs * 60 + mins;
    let tempMins = originMins + diffMins;
    let convertedMins = 0;
    if (tempMins > 0) {
        convertedMins = tempMins;
    } else {
        convertedMins = 24 * 60 + tempMins;
        timestamp = timestamp - 24 * 60 * 60 * 1000;
    }
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let resultHrs = "0" + parseInt(convertedMins / 60);
    let resultMins = "0" + convertedMins % 60;
    let formattedTime = year + '-' + month + '-' + day + ' ' + resultHrs.substr(-2) + ':' + resultMins.substr(-2) + ":00";
    return formattedTime;
};

export const convertHoursToUTCString = (timeStr) => {
    let createTime = new Date();
    let diffMins = createTime.getTimezoneOffset();
    let time = timeStr.split(':');
    let hrs = parseInt(time[0]);
    let mins = parseInt(time[1]);
    let originMins = hrs * 60 + mins;

    let tempMins = originMins + diffMins;
    let convertedMins = tempMins >= 0 ? tempMins : 24 * 60 + tempMins;
    let resultHrs = "0" + parseInt(convertedMins / 60);
    let resultMins = "0" + convertedMins % 60;
    let formattedTime = resultHrs.substr(-2) + ':' + resultMins.substr(-2) + ":00";
    // noinspection JSAnnotator
    return formattedTime;
};

export const convertUTCToLocalHourString = (timeStr) => {
    if(timeStr){
        let createTime = new Date();
        let diffMins = createTime.getTimezoneOffset();
        let time = timeStr.split(':');
        let hrs = parseInt(time[0]);
        let mins = parseInt(time[1]);
        let originMins = hrs * 60 + mins;

        let tempMins = originMins - diffMins;
        let resultHrs = parseInt(tempMins / 60);
        resultHrs = resultHrs >= 24 ? "0" + (resultHrs - 24) : "0" + resultHrs;
        let resultMins = "0" + tempMins % 60;
        let formattedTime = resultHrs.substr(-2) + ':' + resultMins.substr(-2) + ":00";
        // noinspection JSAnnotator
        return formattedTime;
    }
    return  '';
};
