import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import iView from 'iview'
import '@/utils/api'
import 'iview/dist/styles/iview.css';
require('@/assets/css/home.css');
require('@/assets/css/icons.css')

Vue.config.productionTip = false;
Vue.use(iView)

// router.beforeEach((to, from , next) => {
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
//     next()
// });

new Vue({
    render: h => h(App),
    // router
}).$mount('#app');
