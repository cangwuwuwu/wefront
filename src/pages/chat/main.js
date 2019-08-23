import Vue from 'vue'
import App from './App.vue'
// import iView from 'iview'
import { Message } from 'iview'
import router from '@/pages/chat/router'
import 'iview/dist/styles/iview.css';
import 'bootstrap/dist/css/bootstrap.min.css'
require('@/assets/css/chat.css');

Vue.config.productionTip = false;
Vue.prototype.$Message = Message 
// Vue.use(iView);

router.beforeEach((to, from , next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');