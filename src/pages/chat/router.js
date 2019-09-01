import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/chat',
            component: () => import('@/pages/chat/views/chat.vue'),
            meta: {
                title: '交流-Wecoding|便捷的校内信息交流网站'
            },
            children: [
                {
                    path: 'room',
                    component: () => import('@/pages/chat/views/room.vue'),
                    meta: {
                        title: '在线聊天-Wecoding|便捷的校内信息交流网站',
                        requireLogin:true
                    }
                }
            ]
        }
    ]
})