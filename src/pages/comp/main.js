import Vue from 'vue'
import App from './App.vue'
import router from '@/pages/comp/router'
import '@/utils/api'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import '@/utils/filter_utils'
require('../../assets/css/icons.css');
// require('../../assets/css/cover.css');

Vue.config.productionTip = false;
Vue.use(iView)

router.beforeEach((to, from , next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
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
  } else {
    next();
  }
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');