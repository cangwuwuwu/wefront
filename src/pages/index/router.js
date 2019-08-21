import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

import Signin from '@/pages/index/views/signin'
import Signup from '@/pages/index/views/signup'
import Cover from '@/pages/index/views/cover'

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/index/cover'
        },        
        {
            path: '/index/cover',
            components: {
                'cover': Cover,
                'signin': Signin,
                'signup': Signup
            },
            meta: {
                title: '欢迎-Wecoding|便捷的校内信息交流网站'
            }
        },
        {
            path: '/index/signin',
            components: {
                'cover': Cover,
                'signin': Signin,
                'signup': Signup
            },
            meta: {
                title: '登录-Wecoding|便捷的校内信息交流网站'
            }
        },
        {
            path: '/index/signup',
            components: {
                'cover': Cover,
                'signin': Signin,
                'signup': Signup
            },
            meta: {
                title: '注册-Wecoding|便捷的校内信息交流网站'
            }
        }
    ]
})