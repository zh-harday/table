import Vue from 'vue'
import Router from 'vue-router'
import store from './store';
// const home = import('./views/About.vue')
const home = require('./views/About.vue')
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '',
      // name: 'home',
      redirect: 'home',
      component: () => import('./views/Home.vue')
      // component: home
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/About.vue')
    }
  ]
})
//添加路由导航拦截，在所有导航完成之前先判断是否已经登录
router.beforeEach((to, from, next) => {
  // function getCookies(name) {
  //   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  //   if (arr = document.cookie.match(reg))
  //     return unescape(arr[2]);
  //   else
  //     return null;
  // }
  // let token = getCookies('TigerfaceToken');
  // if (token) {
  //   store.state.login.loginStatus.loading = false;
  //   store.state.login.loginStatus.isLogin = true;
  // } else {
  //   // store.state.login.loginStatus = JSON.parse(sessionStorage.getItem('SET_LOGINSTATUS')) || {};
  // }

  // var isLogin = store.state.login.loginStatus.isLogin;
  // let userType = JSON.parse(sessionStorage.getItem('set_userType')) || {};

  // if (
  //   to.path == '/login'
  // ) {
  //   next();
  //   return;
  // };
  // if (isLogin) {
  //   if (userType == 3 || userType == 4 || userType == 5) {
  //     sessionStorage.clear();
  //     // store.state.login.loginStatus = JSON.parse(sessionStorage.getItem('SET_LOGINSTATUS')) || {};
  //     next({
  //       path: '/login' //  跳转到login页面
  //     })
  //     return;
  //   }
  //   next() // 进行下一个钩子函数
  //   window.document.title = to.meta.title;
  // } else {
  //   next({
  //     path: '/login' //  跳转到login页面
  //   })
  // }
})
export default router
