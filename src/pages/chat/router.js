import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

import Chat from '@/pages/chat/views/chat.vue'
import Room from '@/pages/chat/views/room.vue'

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/chat',
            component: Chat,
            meta: {
                title: '交流-Wecoding|便捷的校内信息交流网站'
            },
            children: [
                {
                    path: 'room',
                    component: Room,
                    meta: {
                        title: '在线聊天-Wecoding|便捷的校内信息交流网站'
                    }
                }
            ]
        }
    ]
})