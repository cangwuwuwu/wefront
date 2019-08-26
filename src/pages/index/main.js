import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import router from '@/pages/index/router'
import 'iview/dist/styles/iview.css';
require('../../assets/css/cover.css');

Vue.config.productionTip = false;
Vue.use(iView);

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