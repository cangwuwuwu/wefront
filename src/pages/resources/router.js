import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

import Res from '@/pages/resources/views/res.vue'
import Videos from '@/pages/resources/views/videos.vue'
import Web from '@/pages/resources/views/web.vue'
import Others from '@/pages/resources/views/others.vue'

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/resources',
            component: Res,
            children: [
                {
                    path: 'java',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'vue',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'python',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'cpp',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'php',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'golang',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'android',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'wechat',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'docker',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'sql',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'nosql',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'devtools',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'mantools',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
                {
                    path: 'vertools',
                    components: {
                        'videos': Videos,
                        'web': Web,
                        'others': Others
                    }
                },
            ]
        }
        
    ]
})