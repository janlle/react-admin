import React from 'react';
import {Select} from 'antd'
import * as Http from '../axios'
import Config from '../axios/config'
import moment from "moment";

const Option = Select.Option;

export default {

    // 格式化时间戳
    formatTimestamp(timestamp) {
        if (timestamp == null) {
            return '';
        }
        let date = new Date(timestamp);
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    // 获取系统时间
    getSystemTime() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    },

    // 分页公共方法
    pagination(data, callback) {
        return {
            onChange: (page) => {
                callback(page)
            },
            page: data.data.pageNum,
            size: data.data.pageSize,
            total: data.data.total,
            pageSize: 8,
            showTotal: () => {
                return `共 ${data.data.total} 条`
            },
            showQuickJumper: true
        }
    },

    // 格式化金额,单位:分(eg:430分=4.30元)
    formatFee(fee, suffix = '') {
        if (!fee) {
            return 0;
        }
        return Number(fee).toFixed(2) + suffix;
    },

    // 格式化公里（eg:3000 = 3公里）
    formatMileage(mileage, text) {
        if (!mileage) {
            return 0;
        }
        if (mileage >= 1000) {
            text = text || " km";
            return Math.floor(mileage / 100) / 10 + text;
        } else {
            text = text || " m";
            return mileage + text;
        }
    },

    // 隐藏手机号中间4位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
    },

    // 隐藏身份证号中11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
    },

    getOptionList(data) {
        if (!data) {
            return [];
        }
        let options = []; //[<Option value="0" key="all_key">全部</Option>];
        data.forEach((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        });
        return options;
    },

    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },

    /**
     * 拼接 url 请求参数
     * @param obj 待拼接的对象
     * @returns
     */
    encodeUrlParams(obj) {
        const params = [];
        Object.keys(obj).forEach((key) => {
            let value = obj[key];
            // 如果值为undefined我们将其置空
            if (typeof value === 'undefined') {
                value = ''
            }
            // 对于需要编码的文本（比如说中文）我们要进行编码
            params.push([key, encodeURIComponent(value)].join('='))
        });
        return params.join('&')
    },

    /**
     * 调用百度 api 获取天气
     * @param city
     */
    getWeather({city = 'beijing'}) {
        const urlParam = this.encodeUrlParams({location: city, output: 'json', ak: Config.BAIDU_AK});
        return Http.JSONP({url: Config.WEATHER_URL + '?' + urlParam});
    },

    /**
     * 生成随机12位字符串
     * @returns {string}
     */
    getRandomString() {
        return Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
    },

    checkPhone(phone) {
        let phoneRex = /^1[3|4|5|6|7|8|9]\d{9}$/;
        return phoneRex.test(phone);
    },

    checkEmail(email) {
        let emailRex = /^[\w.-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;
        return emailRex.test(email);
    },

    // 字符串转为时间戳
    dateStringToTimestamp(dateString) {
        if (!dateString) {
            return '';
        }
        return new Date(dateString).getTime();
    },

    // 过滤参数字段
    filterParam(params) {
        if (!params) {
            return;
        }
        Object.keys(params).forEach(e => {
            if (!params[e]) {
                delete params[e];
            }
        });
    }

}