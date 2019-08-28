<template>
    <div class="cover" v-cloak>
        <Row type="flex" justify="center" align="middle" style="height: 500px">
            <Col>
                <h1 class="cover-head">欢迎</h1>
                <Button style="margin-bottom: 15px" @click="goto('/home')" size="large">Learn More</Button>
            </Col>
        </Row>

        <div style="position: relative;">
            <Row>
                <Col span="6">
                    <Tag color="geekblue">总用户数</Tag>
                    <Badge :count="length" class-name="demo-badge-alone"></Badge>
                </Col>
                <Col span="8" offset="8">
                    <Input search placeholder="Search Username / ID" v-model="keywords" style="width: 300px" />
                </Col>
            </Row>
            <Row :gutter="16" type="flex" align="middle">
                <Col span="6" v-for="user in search(keywords)" :key="user.stuId" class-name="user-list-col">
                    <div @click="displays(user.stuId)">
                        <Card>
                            <Row>
                                <Col span="4">
                                    <Avatar v-if="user.stuImg === '' || user.stuImg === null" size="large" :style="{background: color[ranum()]}">{{user.stuUsername.substr(0,1)}}</Avatar>
                                    <Avatar v-else size="large" :src="'http://39.106.85.24:9000/wecoding/M00/00/00/' + user.stuImg"></Avatar>
                                </Col>
                                <Col span="16" offset="4" class-name="user-right-col">
                                    <strong><div class="my-0" v-text="user.stuUsername">Username</div></strong>
                                    <small class="text-muted" v-text="user.stuId">ID</small>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset="12">
                                    <span class="text-muted">{{ user.stuRegistTime | formatDateTime }}</span>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Spin fix v-if="loading1">
                <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                    </svg>
                </div>
            </Spin>
        </div>
        <Row type="flex" justify="center" align="middle">
            <Col v-if="search(keywords).length == 0">
                <div style="padding-top: 100px">什么都没找到...</div>
            </col>
        </Row>
    </div>
</template>

<script>
    import axios from 'axios'
    import { formatDate } from "@/assets/js/date.js"
export default {
    name: 'cover',
    components: {},
    data() {
        return {
            fivestus: [],
            allstus: [],
            color: ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae',
                '#333', '#ccc', '#dc3545', '#007bff',
                '#28a745', '#6f42c1', '#eeaeee', '#00ffff'],
            length: 0,
            loading1: true,
            keywords: ''
        }
    },
    mounted() {
        this.getFiveMethod();
    },
    methods: {
        getFiveMethod() {
            // 加载右侧五位学生列表
            this.$Loading.start();
            let _self = this;
            axios
                .get('/api/signup/getFive')
                .then(function (res) {
                    // console.log(res)
                    _self.allstus = res.data.allList;
                    _self.fivestus = res.data.randomList;
                    _self.length = res.data.len;
                    _self.loading1 = false;
                    _self.$Loading.finish();
                }).catch(function () {
                _self.$Loading.error();
            })
        },
        goto(url) {
            window.location = url
        },
        // 获取随机颜色
        ranum() {
            return Math.floor(Math.random()*12)
        },
        // 查找同学
        search(keywords) {
            if (keywords === '') {
                return this.fivestus;
            }
            return this.allstus.filter(user => {
                var id = String(user.stuId);
                var name = user.stuUsername.toLowerCase();
                if (id.includes(keywords) || name.includes(keywords.toLowerCase())) {
                    return user;
                }
            });
        },
        displays(name) {
            this.$Message.info('显示'+name+'的个人信息')
        }
    },
    filters: {
        formatDateTime (time) {
            let date = new Date(time);
            return formatDate(date, 'MM-dd hh:mm')
        }
    },
    
}
</script>
<style scoped>

@keyframes rotate {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}

@keyframes dash {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -124;
    }
}

@keyframes color {
    0%, 100% {
        stroke: #d62d20;
    }
    40% {
        stroke: #0057e7;
    }

    66% {
        stroke: #008744;
    }
    80%, 90% {
        stroke: #ffa700;
    }
}


.cover-head {
    padding-bottom: 10px;
    font-size: 40px
}
.cover >>> .user-list-col {
    padding: 8px;
    text-align: right;
}
.cover >>> .ivu-card {
    cursor: pointer;
    border-radius: 10px;
}
.cover >>> .my-0 {
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cover >>> .ivu-spin-fix {
    z-index: 11;
}

.cover >>> .circular {
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
.cover >>> .path {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
    -webkit-animation: dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;
    stroke-linecap: round;
}
.cover >>>.loader {
    width: 30px;
    height: 30px;
    position: relative;
    margin: 0 auto;
}
/* .ivu-spin {
    color: #2d8cf0;
    vertical-align: middle;
    text-align: center;
} */
</style>
