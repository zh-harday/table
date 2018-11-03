import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
// import {
//   Message
// } from 'iview';
// import {API_ROOT} from '../../config';
import store from '../../store';
import serviceBaseUrl from '../../api/baseurl';
let vm = new Vue();
// Vue.component(Message);

const service = axios.create({
  timeout: 8000,
  baseURL: serviceBaseUrl,
  transformRequest: [function (data) {
    data = qs.stringify(data);
    return data;
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'X-Custom-Header': 'foobar'
    // "If-Modified-Since": 0
    // 'Content-Type': 'application/json'
  }
})

const registUrl = serviceBaseUrl + '/api/user/reg/info';
// 拦截器
service.interceptors.request.use(config => {
  // alert('request')
  // console.log(config)
  config.headers = config.headers || {};
  store.state.login.loginInfo = JSON.parse(sessionStorage.getItem('SET_LOGININFO')) || ''; //登录 token
  store.state.regist.regist_token = JSON.parse(sessionStorage.getItem('regist_token')) || ''; //注册 token
  if (config.url == registUrl) {
    // alert('is regist');
    if (store.state.regist.regist_token) { //注册 token
      config.headers.TempToken = store.state.regist.regist_token;
    }
  };
  console.log(store.state.login.loginInfo.token);
  if (store.state.login.loginInfo.token) {
    // alert('has token')
    config.headers.TigerfaceToken = store.state.login.loginInfo.token;
  }
  // alert('not token')
  // console.log(config)
  return config;
}, err => {
  return Promise.reject(err);
})
let logTimeOut = false;
service.interceptors.response.use(response => {
  // console.log(response);
  store.state.login.loginInfo = JSON.parse(sessionStorage.getItem('SET_LOGININFO')) || ''; //登录 token
  // console.log(response.data.status);
  let status = response.data.status || '';
  if (response.data.status == -997) { //具体的判断token失效的参数
    if (logTimeOut) {

    } else {
      logTimeOut = true;
      vm.$Message.error('登录超时，请重新登录。');
    }
    store.state.login.loginInfo = {};
    sessionStorage.clear();
    localStorage.clear();
    let href = location.href;
    let index = href.indexOf('#');
    let url = href.substr(0, index);
    window.location.href = url + '#/login';
    return false;
  } else {
    if (logTimeOut) {
    } else {
      switch (status) {
        case 401:
          logTimeOut = true;
          // vm.$Message.error(response.data.msg);
          break;
        case 403:
          logTimeOut = true;
          // vm.$Message.error(response.data.msg);
          break;
        case 408:
          logTimeOut = true;
          // vm.$Message.error(response.data.msg);
          break;
        case 404:
          logTimeOut = true;
          // vm.$Message.error(response.data.msg);
          break;
        case 500:
          logTimeOut = true;
          // vm.$Message.error(response.data.msg);
          break;
      }
    }
    // console.log(response)
    // return false;
    return response;
  }
}, (error) => {
  // debugger
  let response = error.response || '';
  let status = response.status || '';
  if (logTimeOut) {

  } else {
    if (
      response == '' ||
      response == 'undefind' ||
      response == null
    ) {
      logTimeOut = true;
      vm.$Message.error('服务器暂时出错，程序猿正在努力抢修中!');
    };
    // return false;
  }
  if (logTimeOut) {

  } else {
    switch (status) {
      case 401:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break;
      case 403:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break;
      case 405:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break;
      case 408:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break;
      case 404:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break;
      case 500:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break;
    }
  }
  return false;
})
export default {
  service
}
