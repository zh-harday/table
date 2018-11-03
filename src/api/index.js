import apiList from './api';
import service from '../common/js/fetch';
import serviceBaseUrl from './baseurl';

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  // 定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $api: {
      get () {
        return apiList
      }
    },
    $http:{
        get(){
            return service.service
        }
    },
    api:{
        get(){
            return serviceBaseUrl
        }
    }
  })
}

export default {
  install
}