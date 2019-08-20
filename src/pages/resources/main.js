import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import iView from 'iview'
import router from '@/pages/resources/router'
import 'iview/dist/styles/iview.css';
require('../../assets/css/guide.css');
require('../../assets/css/icons.css');

Vue.config.productionTip = false;
Vue.use(Vuex)
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
