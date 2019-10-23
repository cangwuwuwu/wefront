import Vue from 'vue'
import App from './App.vue'
import router from '@/pages/index/router'
import store from './store'
import '@/utils/api'
import iView from 'view-design'
import i18n from './i18n'
import '@/utils/filter_utils'

require('@/assets/css/index.css');
require('@/assets/css/icons.css');
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(iView);

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('wecoding_login_info');
    if (token) {
        store.commit('setToken', token);
        next();
    }
    if (to.matched.some(record => record.meta.requireLogin)) {
        // 判断当前用户的token是否存在
        if (token) {
            next();
        } else {
            next({
                path: '/index/signin',
                query: {redirect: location.hostname}
            });
        }
    } else {
        next();
    }
    if (to.meta.title) {
        document.title = to.meta.title;
    }
});

new Vue({
    render: h => h(App),
    router,
    store,
    i18n
}).$mount('#app');