import Router from 'vue-router';
import Vue from 'vue';
import Home from '@/pages/home/views/home'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/home.html',
            component: Home,
        },
        {
            path: '/guide',
            beforeEnter(to, from, next) {
                window.location = "/guide.html"
            }
        },
    ]
})