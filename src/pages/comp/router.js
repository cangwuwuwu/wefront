import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/comp',
            component: () => import('@/pages/comp/views/comp.vue'),
            meta: {
                title: '会员录入-NIT计算机协会'
            }
        },
        {
            path: '/comp/admin',
            component: () => import('@/pages/comp/views/admin.vue'),
            meta: {
                title: '查看会员信息-NIT计算机协会',
                requireLogin:true
            }
        },
        {
            path: '/comp/spend',
            component: () => import('@/pages/comp/views/spend.vue'),
            meta: {
                title: '在线账簿-NIT计算机协会',
            }
        }
    ]
})