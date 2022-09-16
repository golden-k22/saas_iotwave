import Axios from "axios";

// import { response } from "express";
export class RestDataSource {
    constructor(base_url, errorCallback) {
        this.BASE_URL = base_url;
        this.handleError = errorCallback;
        Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }

    /**
     * Get the dashboard data.
     * @param url
     * @param callback
     * @param data
     * @returns {Promise<void>}
     * @constructor
     */
    async GetData(url, callback, data) {
        this.SendRequest("post", this.BASE_URL+url, callback, data);
    }

    async GetRequest(url, callback){
        this.SendRequest("GET", this.BASE_URL+url, callback);
    }
    async PostRequest(url, callback,data){
        this.SendRequest("POST", this.BASE_URL+url, callback, data);
    }

    async DeleteRequest(url, callback){
        this.SendRequest("DELETE", this.BASE_URL+url, callback);
    }

    async SendRequest(method, url, callback, data) {
        try {
            let response = await Axios.request({
                method: method,
                url: url,
                data: data
            });
            // console.log(response.status);
            callback(response.data);
        } catch (err) {
            callback(err);
            this.handleError("Operation Failed: Network Error");
        }
        // Axios.request({
        //     method: method,
        //     url:url
        // }).then(response=>callback(response.data));
    }

    async DownloadFile(url, callback){
        this.SendFileDownloadRequest("GET", this.BASE_URL+url, callback);
    }
    async SendFileDownloadRequest(method, url, callback, data) {
        try {
            let response = await Axios.request({
                method: method,
                url: url,
                data: data,
                responseType: 'blob', // important
            });
            // console.log(response.status);
            callback(response.data);
        } catch (err) {
            this.handleError("Operation Failed: Network Error");
        }
        // Axios.request({
        //     method: method,
        //     url:url
        // }).then(response=>callback(response.data));
    }
}