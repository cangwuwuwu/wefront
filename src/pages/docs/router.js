import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

import Res from '@/pages/docs/views/res.vue'
import Videos from '@/pages/docs/views/videos.vue'
import Web from '@/pages/docs/views/web.vue'
import Others from '@/pages/docs/views/others.vue'
import Guide from '@/pages/docs/views/guide.vue'
import Help from '@/pages/docs/views/help.vue'
import Content from '@/pages/docs/views/contents.vue'
import Docs from '@/pages/docs/views/docs.vue'

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/docs',
            component: Docs,
            meta: {
                title: '文档-Wecoding|便捷的校内信息交流网站'
            },
            children: [
                {
                    path: 'guide',
                    component: Guide,
                    children: [
                        {
                            path: '',
                            component: Content,
                            meta: {
                                title: '校园指南-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'college-website',
                            component: Content,
                            meta: {
                                title: '学校官网-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'college-address',
                            component: Content,
                            meta: {
                                title: '学校地址-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'cet',
                            component: Content,
                            meta: {
                                title: '四六级-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'dormitory',
                            component: Content,
                            meta: {
                                title: '宿舍环境-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'edu-email',
                            component: Content,
                            meta: {
                                title: '教育邮箱-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'electric',
                            component: Content,
                            meta: {
                                title: '电费缴纳-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'map',
                            component: Content,
                            meta: {
                                title: '学校地图-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'military-training',
                            component: Content,
                            meta: {
                                title: '军训安排-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'repair',
                            component: Content,
                            meta: {
                                title: '社区报修-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'score',
                            component: Content,
                            meta: {
                                title: '成绩查询-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'start-test',
                            component: Content,
                            meta: {
                                title: '开学考试-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'wel-new',
                            component: Content,
                            meta: {
                                title: '自助迎新-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'wifi',
                            component: Content,
                            meta: {
                                title: '宽带配置-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                    ]
                },
                {
                    path: 'help',
                    component: Help,
                    children: [
                        {
                            path: '',
                            component: Content,
                            meta: {
                                title: '帮助-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'update-log',
                            component: Content,
                            meta: {
                                title: '更新日志-Wecoding|便捷的校内信息交流网站',
                            } 
                        }
                    ]
                },
                {
                    path: 'resources',
                    component: Res,
                    children: [
                        {
                            path: '',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                // 'others': Others
                            },
                            meta: {
                                title: '资源分享-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'java',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'Java/Kotlin-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'vue',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'Web前端-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'python',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'Python-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'cpp',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'C/C#/C++-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'php',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'Php-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'golang',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'Golang-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'android',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'Android-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'wechat',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'Wechat小程序-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'docker',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'Docker-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'sql',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'SQL-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'nosql',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'NoSQL-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'devtools',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: '开发工具-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'mantools',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: '管理工具-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                        {
                            path: 'vertools',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: '版本控制-Wecoding|便捷的校内信息交流网站',
                            }
                        },
                    ]
                }
            ]
        },
    ]
})