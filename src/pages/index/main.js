import Vue from 'vue'
import App from './App.vue'
import router from '@/pages/index/router'
import store from './store'
import '@/utils/api'
import iView from 'iview'
import i18n from './i18n'
import '@/utils/filter_utils'

require('@/assets/css/index.css');
require('@/assets/css/icons.css');
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(iView);

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.matched.some(record => record.meta.requireLogin)) {
        // 判断当前用户的登录信息wecoding_login_info是否存在
        if (sessionStorage.getItem('wecoding_login_info')) {
            next();
        } else {
            next({
                path: '/index/signin',
                query: {redirect: location.pathname}
            });
        }
    } else {
        next();
    }
});

new Vue({
    render: h => h(App),
    router,
    store,
    i18n
}).$mount('#app');