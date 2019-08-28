import axios from 'axios'
import {message} from 'antd'
import Config from './config'
import JsonP from 'jsonp'
import '../styles/loading.less'

const service = axios.create({
    baseURL: Config.SERVICE_URL,
    timeout: 10000
});


service.interceptors.request.use(function (request) {
    request.headers['token'] = sessionStorage.getItem('token');
    return request;
}, function (error) {
    return Promise.reject(error);
});


service.interceptors.response.use((response) => {
    if (response && response.status === 200) {
        let res = response.data;
        if (res.code === 20000) {
            return res;
        } else {
            message.warn(res.message);
        }
    } else if (response) {
        message.error(response.data.message);
        return response;
    }
}, function (error) {
    return Promise.reject(error)
});


export const GET = ({url, msg = '接口异常', headers, showLoading = true, params}) => {
    let loading;
    if (showLoading) {
        loading = document.getElementById("ajaxLoading");
        loading.style.display = 'block'
    }

    return new Promise((resolve, reject) => {
        service({url, method: 'get', params, headers}).then((res) => {
            if (showLoading) {
                loading = document.getElementById('ajaxLoading');
                loading.style.display = 'none'
            }
            resolve(res);
        }).catch((err) => {
            reject(err);
            message.error(msg);
            console.log(err);
        });
    });

};


export const POST = ({url, data, msg = '接口异常', headers, showLoading = false}) => {
    let loading;
    if (showLoading) {
        loading = document.getElementById("ajaxLoading");
        loading.style.display = 'block'
    }

    return new Promise((resolve, reject) => {
        service({url, method: 'post', data, headers}).then((res) => {
            if (showLoading) {
                loading = document.getElementById('ajaxLoading');
                loading.style.display = 'none'
            }
            resolve(res);
        }).catch((err) => {
            reject(err);
            message.error(msg);
            console.log(err);
        });
    });
};


export const PUT = ({url, data, msg = '接口异常', headers, showLoading = false}) => {
    let loading;
    if (showLoading) {
        loading = document.getElementById("ajaxLoading");
        loading.style.display = 'block'
    }

    return new Promise((resolve, reject) => {
        service({url, method: 'put', data, headers}).then((res) => {
            if (showLoading) {
                loading = document.getElementById('ajaxLoading');
                loading.style.display = 'none'
            }
            resolve(res);
        }).catch((err) => {
            reject(err);
            message.error(msg);
            console.log(err);
        });
    });
};


export const DELETE = ({url, params, msg = '接口异常', headers, showLoading = false}) => {
    let loading;
    if (showLoading) {
        loading = document.getElementById("ajaxLoading");
        loading.style.display = 'block'
    }

    return new Promise((resolve, reject) => {
        service({url, method: 'delete', params, headers}).then((res) => {
            if (showLoading) {
                loading = document.getElementById('ajaxLoading');
                loading.style.display = 'none'
            }
            resolve(res);
        }).catch((err) => {
            reject(err);
            message.error(msg);
            console.log(err);
        });
    });
};


export const JSONP = (option) => {
    return new Promise((resolve, reject) => {
        JsonP(option.url, {
            param: 'callback'
        }, function (err, response) {
            if (response.status === 'success') {
                resolve(response);
            } else {
                reject(response.message)
            }
        })
    });
};
