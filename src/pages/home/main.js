import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import '@/utils/api'
import 'iview/dist/styles/iview.css';
require('@/assets/css/home.css');
require('@/assets/css/icons.css')

Vue.config.productionTip = false;
Vue.use(iView)


new Vue({
    render: h => h(App),
}).$mount('#app');
