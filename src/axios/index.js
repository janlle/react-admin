import axios from 'axios';
import {message} from 'antd';
import config from './config'

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const GET = ({url, msg = '接口异常', headers}) =>
    axios.get(config.SERVICE_URL + url, headers).then(res => res.data).catch(err => {
        console.log(err);
        message.warn(msg);
    });

export const POST = ({url, data, msg = '接口异常', headers}) =>
    axios.post(config.SERVICE_URL + url, data, headers).then(res => res.data).catch(err => {
        console.log(err);
        message.warn(msg);
    });


export const PUT = ({url, data, msg = '接口异常', headers}) =>
    axios.put(config.SERVICE_URL + url, data, headers).then(res => res.data).catch(err => {
        console.log(err);
        message.warn(msg);
    });


export const DELETE = ({url, data, msg = '接口异常', headers}) =>
    axios.delete(config.SERVICE_URL + url, headers).then(res => res.data).catch(err => {
        console.log(err);
        message.warn(msg);
    });
