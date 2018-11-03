import service from '../common/js/fetch';
import Vue from 'vue';
// import iView, {Notice } from 'iview'
import jsonAxios from '../common/js/jsonFetch'
import uploadFetch from '../common/js/uploadFetch'
import serviceBaseUrl from './baseurl'
let payUrl = (process.env.NODE_ENV === 'production') ? 'https://www.wdzbj.cn' : 'http://192.168.0.89:8999';
// Vue.use(iView);

function fetch(options) {
    // 请求处理
    return new Promise((resolve, reject) => {
        service.service(options)
            .then((res) => {
                // 请求成功时,根据业务判断状态
                if (res.status == 200) {
                    resolve(res)
                }
            })
            .catch((error) => {
                // 请求失败时,根据业务判断状态
                console.log(error);
                reject(error)
            })
    })
};
function jsonFetch(options) {
    // 请求处理
    return new Promise((resolve, reject) => {
        jsonAxios.jsonAxios(options)
            .then((res) => {
                // 请求成功时,根据业务判断状态
                if (res.status == 200) {
                    resolve(res)
                }
            })
            .catch((error) => {
                // 请求失败时,根据业务判断状态
                console.log(error);
                reject(error)
            })
    })
};
//json 传参
const saveBiz = (params) => {
    return jsonAxios.jsonAxios.post(serviceBaseUrl + '/api/ent/enterprise/biz/saveBiz', params)
};
//formData 传参
const payZfb = (params) => {
    return service.service.post(payUrl + '/pay-service/zfb/formPay', params)
};
//上传图片形式
const feedback = (params) => {
    return uploadFetch.uploadFetch.post(serviceBaseUrl + '/api/feedback/saveFb', params)
};
//json 传参
const branchs = () => {
    return fetch({
        url: `/api/ent/common/branchs`,
        method: 'get',
        params: ''
    });
};

const apiList = {
};

export default apiList;
