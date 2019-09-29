import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/home',
            component: () => import('@/pages/home/views/home.vue'),
            meta: {
                title: '主页-Wecoding|便捷的校内信息交流网站'
            },

        },
    ]
})