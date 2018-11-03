import Vue from 'vue';
import axios from 'axios';
// import qs from 'qs';
// import {
//   Message
// } from 'iview';
// import {API_ROOT} from '../../config';
import store from '../../store';

import serviceBaseUrl from '../../api/baseurl';
let vm = new Vue();
// Vue.component(Message);

const jsonAxios = axios.create({
  timeout: 8000,
  baseURL: serviceBaseUrl,
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
  headers: {
    'Content-Type': 'application/json'
  }
});

const registUrl = serviceBaseUrl + '/api/user/reg/info';
// 拦截器
jsonAxios.interceptors.request.use(config => {
  config.headers = config.headers || {};
  //   config.headers.post['Content-Type'] = 'application/json';
  store.state.login.loginInfo = JSON.parse(sessionStorage.getItem('SET_LOGININFO')) || ''; //登录 token
  store.state.regist.regist_token = JSON.parse(sessionStorage.getItem('regist_token')) || ''; //注册 token
  if (config.url == registUrl) {
    if (store.state.regist.regist_token) { //注册 token
      config.headers.TempToken = store.state.regist.regist_token;
    }
  };
  if (store.state.login.loginInfo.token) {
    // config.headers.TigerfaceToken = store.state.login.loginInfo.token;
    config.headers.common['TigerfaceToken'] = store.state.login.loginInfo.token;

  }
  console.log(config)
  return config;
}, err => {
  return Promise.reject(err);
})
let logTimeOut = false;
jsonAxios.interceptors.response.use(response => {
  // console.log(response);
  // store.state.login.loginInfo = JSON.parse(sessionStorage.getItem('SET_LOGININFO')) || ''; //登录 token
  let status = response.data.status || '';
  if (response.data.status == -997) { //具体的判断token失效的参数
    if (logTimeOut) {

    } else {
      logTimeOut = true;
      // vm.$Message.error('登录超时，请重新登录。');
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
          break
        case 403:
          logTimeOut = true;
          // vm.$Message.error(response.data.msg);
          break
        case 408:
          logTimeOut = true;
          // vm.$Message.error(response.data.msg);
          break
        case 404:
          logTimeOut = true;
          // vm.$Message.error(response.data.msg);
          break
        case 500:
          logTimeOut = true;
          // vm.$Message.error(response.data.msg);
          break
      }
    }
    console.log(response)
    // return false;
    return response;
  }
}, (error) => {
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
  };
  if (logTimeOut) {

  } else {
    switch (status) {
      case 401:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break
      case 403:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break
      case 405:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break
      case 408:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break
      case 404:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break
      case 500:
        logTimeOut = true;
        // vm.$Message.error(response.data.msg);
        break
    }
  }
  return false;
})
export default {
  jsonAxios
}
