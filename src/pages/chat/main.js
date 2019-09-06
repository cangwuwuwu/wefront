import Vue from 'vue'
import App from './App.vue'
import { Message, Modal } from 'iview'
import router from '@/pages/chat/router'
import 'iview/dist/styles/iview.css';
import 'bootstrap/dist/css/bootstrap.min.css'
require('@/assets/css/chat.css');

Vue.config.productionTip = false;
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;

router.beforeEach((to, from , next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requireLogin)) {  
    // 判断当前用户的登录信息wecoding_login_info是否存在
    if (sessionStorage.getItem('wecoding_login_info')) {  
      next();
    } else {
      // next({
        // path: '/index/signin'
      // })
      window.location = '/index/signin'
    }
  }else {
    next();
  }
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');