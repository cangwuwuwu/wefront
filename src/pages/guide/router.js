import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

import Guide from '@/pages/guide/views/guide.vue'
import Help from '@/pages/guide/views/help.vue'
import Content from '@/pages/guide/views/content.vue'

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/guide',
            component: Guide,
            children: [
                {
                    path: '',
                    component: Content
                },
                {
                    path: 'college-website',
                    component: Content
                },
                {
                    path: 'college-address',
                    component: Content
                },
                {
                    path: 'cet',
                    component: Content
                },
                {
                    path: 'dormitory',
                    component: Content
                },
                {
                    path: 'edu-email',
                    component: Content
                },
                {
                    path: 'electric',
                    component: Content
                },
                {
                    path: 'map',
                    component: Content
                },
                {
                    path: 'military-training',
                    component: Content
                },
                {
                    path: 'repair',
                    component: Content
                },
                {
                    path: 'score',
                    component: Content
                },
                {
                    path: 'start-test',
                    component: Content
                },
                {
                    path: 'wel-new',
                    component: Content
                },
                {
                    path: 'wifi',
                    component: Content
                },
            ]
        },
        {
            path: '/help',
            component: Help,
            children: [
                {
                    path: '',
                    component: Content
                },
                {
                    path: 'update-log',
                    component: Content 
                }
            ]
        }
        
    ]
})