import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

import Signin from '@/pages/index/components/signin'
import Signup from '@/pages/index/components/signup'
import Cover from '@/pages/index/components/cover'
import Videos from '@/pages/index/components/videos'
import Web from '@/pages/index/components/web'
import Others from '@/pages/index/components/others'
import Content from '@/pages/index/components/contents'

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/index/cover'
        }, 
        {
            path: '/index',
            component: () => import('@/pages/index/views/index.vue'),
            meta: {
                title: '用户-NIT计算机协会官网|Wecoding'
            },
            children: [
                {
                    path: 'cover',
                    components: {
                        'cover': Cover,
                        'signin': Signin,
                        'signup': Signup
                    },
                    meta: {
                        title: '欢迎-NIT计算机协会官网|Wecoding'
                    }
                },
                {
                    path: 'signin',
                    components: {
                        'cover': Cover,
                        'signin': Signin,
                        'signup': Signup
                    },
                    meta: {
                        title: '登录-NIT计算机协会官网|Wecoding'
                    }
                },
                {
                    path: 'signup',
                    components: {
                        'cover': Cover,
                        'signin': Signin,
                        'signup': Signup
                    },
                    meta: {
                        title: '注册-NIT计算机协会官网|Wecoding'
                    }
                }
            ]
        },
        {
            path: '/home',
            component: () => import('@/pages/index/views/home.vue'),
            meta: {
                title: '主页-NIT计算机协会官网|Wecoding'
            }
        },
        {
            path: '/docs',
            component: () => import('@/pages/index/views/docs.vue'),
            meta: {
                title: '文档-NIT计算机协会官网|Wecoding'
            },
            children: [
                {
                    path: 'guide',
                    component: () => import('@/pages/index/views/guide.vue'),
                    children: [
                        {
                            path: '',
                            component: Content,
                            meta: {
                                title: '校园指南-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'college-website',
                            component: Content,
                            meta: {
                                title: '学校官网-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'college-address',
                            component: Content,
                            meta: {
                                title: '学校地址-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'cet',
                            component: Content,
                            meta: {
                                title: '四六级-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'dormitory',
                            component: Content,
                            meta: {
                                title: '宿舍环境-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'edu-email',
                            component: Content,
                            meta: {
                                title: '教育邮箱-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'electric',
                            component: Content,
                            meta: {
                                title: '电费缴纳-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'map',
                            component: Content,
                            meta: {
                                title: '学校地图-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'military-training',
                            component: Content,
                            meta: {
                                title: '军训安排-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'repair',
                            component: Content,
                            meta: {
                                title: '社区报修-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'score',
                            component: Content,
                            meta: {
                                title: '成绩查询-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'start-test',
                            component: Content,
                            meta: {
                                title: '开学考试-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'wel-new',
                            component: Content,
                            meta: {
                                title: '自助迎新-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'wifi',
                            component: Content,
                            meta: {
                                title: '宽带配置-NIT计算机协会官网|Wecoding',
                            }
                        },
                    ]
                },
                {
                    path: 'help',
                    component: () => import('@/pages/index/views/help.vue'),
                    children: [
                        {
                            path: '',
                            component: Content,
                            meta: {
                                title: '帮助-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'update-log',
                            component: Content,
                            meta: {
                                title: '更新日志-NIT计算机协会官网|Wecoding',
                            } 
                        }
                    ]
                },
                {
                    path: 'resources',
                    component: () => import('@/pages/index/views/res.vue'),
                    children: [
                        {
                            path: '',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                // 'others': Others
                            },
                            meta: {
                                title: '资源分享-NIT计算机协会官网|Wecoding',
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
                                title: 'Java/Kotlin-NIT计算机协会官网|Wecoding',
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
                                title: 'Web前端-NIT计算机协会官网|Wecoding',
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
                                title: 'Python-NIT计算机协会官网|Wecoding',
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
                                title: 'C/C#/C++-NIT计算机协会官网|Wecoding',
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
                                title: 'Php-NIT计算机协会官网|Wecoding',
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
                                title: 'Golang-NIT计算机协会官网|Wecoding',
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
                                title: 'Android-NIT计算机协会官网|Wecoding',
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
                                title: 'Wechat小程序-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'linux',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'Linux-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'windows',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: 'Windows-NIT计算机协会官网|Wecoding',
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
                                title: 'Docker-NIT计算机协会官网|Wecoding',
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
                                title: 'SQL-NIT计算机协会官网|Wecoding',
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
                                title: 'NoSQL-NIT计算机协会官网|Wecoding',
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
                                title: '开发工具-NIT计算机协会官网|Wecoding',
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
                                title: '管理工具-NIT计算机协会官网|Wecoding',
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
                                title: '版本控制-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'cet',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: '四六级-NIT计算机协会官网|Wecoding',
                            }
                        },
                        {
                            path: 'master',
                            components: {
                                'videos': Videos,
                                'web': Web,
                                'others': Others
                            },
                            meta: {
                                title: '考研-NIT计算机协会官网|Wecoding',
                            }
                        },
                    ]
                }
            ]
        },
        {
            path: '/comp',
            component: () => import('@/pages/index/views/comp.vue'),
            meta: {
                title: '会员录入-NIT计算机协会官网|Wecoding'
            },
            children: [
                {
                    path: 'spend',
                    component: () => import('@/pages/index/views/spend.vue'),
                    meta: {
                        title: '在线账簿-NIT计算机协会官网|Wecoding',
                    }
                }
            ]
        },
        {
            path: '/course',
            component: () => import('@/pages/index/views/course'),
            meta: {
                title: '课程-NIT计算机协会官网|Wecoding'
            },
            children: [
                {
                    path: 'list',
                    component: () => import('@/pages/index/components/course/list.vue'),
                    meta: {
                        title: '课程列表-NIT计算机协会官网|Wecoding'
                    }
                },
                {
                    path: 'detail',
                    component: () => import('@/pages/index/components/course/detail.vue'),
                    meta: {
                        title: '课程详情-NIT计算机协会官网|Wecoding'
                    }
                }
            ]
        },
        {
            path: '/queryele',
            component: () => import('@/pages/index/views/query.vue'),
            meta: {
                title: '电费提醒-NIT计算机协会官网|Wecoding'
            }
        },
        {
            path: '/admin',
            component: () => import('@/pages/index/views/admin.vue'),
            children: [
                {
                    path: 'member',
                    component: () => import('@/pages/index/components/admin/member.vue'),
                    meta: {
                        title: '成员管理-NIT计算机协会官网|Wecoding',
                    }
                },
                {
                    path: 'account',
                    component: () => import('@/pages/index/components/admin/account.vue'),
                    meta: {
                        title: '账号管理-NIT计算机协会官网|Wecoding',
                    }
                },
                {
                    path: 'finance',
                    component: () => import('@/pages/index/components/admin/finance.vue'),
                    meta: {
                        title: '财务管理-NIT计算机协会官网|Wecoding',
                    }
                },
                {
                    path: 'overview',
                    component: () => import('@/pages/index/components/admin/overview.vue'),
                    meta: {
                        title: '协会概览-NIT计算机协会官网|Wecoding',
                    }
                },
                {
                    path: 'resource',
                    component: () => import('@/pages/index/components/admin/resource.vue'),
                    meta: {
                        title: '资源管理-NIT计算机协会官网|Wecoding',
                    }
                },
                {
                    path: 'guide',
                    component: () => import('@/pages/index/components/admin/guide.vue'),
                    meta: {
                        title: '指南管理-NIT计算机协会官网|Wecoding',
                    }
                },
                {
                    path: 'notice',
                    component: () => import('@/pages/index/components/admin/notice.vue'),
                    meta: {
                        title: '发送通知-NIT计算机协会官网|Wecoding',
                    }
                },
            ]
        },
        {
            path: '/refresh',
            component: () => import('@/pages/index/components/refresh.vue')
        }
    ]
})