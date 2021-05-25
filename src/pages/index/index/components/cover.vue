<template>
    <div class="cover" v-cloak>
        <Row type="flex" justify="center" align="middle" style="height: 500px">
            <Col>
                <h1 class="cover-head">{{ $t('index.coverHead') }}</h1>
                <Button style="margin-bottom: 15px" @click="goto('/home')" size="large">{{ $t('index.moreButton') }}</Button>
            </Col>
        </Row>

        <div style="position: relative;">
            <Row type="flex">
                <Col :md="{span: 7, offset:3}" :xs="{span: 8}">
                    <Tag color="geekblue">{{ $t('index.userCount') }}</Tag>
                    <Badge :count="length" class-name="demo-badge-alone"></Badge>
                </Col>
                <Col :md="{span: 5}" :xs="{span: 12, offset: 4}">
                    <Input search clearable :placeholder="$t('index.searchContext')" v-model="keywords" style="width: 100%"/>
                </Col>
            </Row>
            <Row :gutter="16" type="flex" align="middle" justify="center" style="margin:auto">
                <Col :md="{span: 14}" :xs="{span: 24}">
                    <Col :md="{span: 6}" :xs="{span: 12}" v-for="user in search(keywords)" :key="user.stuId"
                         class-name="user-list-col">
                        <div @click="displays(user)">
                            <Card style="height:116px">
                                <Row>
                                    <Col span="4">
                                        <Avatar v-if="user.stuImg === '' || user.stuImg === null" size="large"
                                                :style="{background: color[ranum()]}">{{user.stuName.substr(0,1)}}
                                        </Avatar>
                                        <Avatar v-else size="large"
                                                :src="upImgBase + user.stuImg"></Avatar>
                                    </Col>
                                    <Col span="16" offset="4" class-name="user-right-col">
                                        <strong>
                                            <div class="my-0" v-text="user.stuName">Username</div>
                                        </strong>
                                        <small class="text-muted" v-text="user.stuId">ID</small>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col offset="12">
                                        <span class="text-muted reg-time"><Time :time="user.stuRegistTime"/></span>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                </Col>
            </Row>
            <Spin fix v-if="loading1">
                <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5"
                                stroke-miterlimit="10"></circle>
                    </svg>
                </div>
            </Spin>
        </div>
        <Row type="flex" justify="center" align="middle">
            <Col v-if="search(keywords).length === 0">
                <div style="padding-top: 100px">{{ $t('index.searchNothing') }}</div>
            </col>
        </Row>

        <Modal 
            footer-hide 
            width="1000" 
            v-model="seehisinfo" 
            class-name="vertical-center-modal">
            <Row style="padding: 20px;font-size: 14px;" type="flex" align="middle">
                <Col :md="{span:3}" :xs="{span:5}">
                    <div>头像:</div>
                </Col>
                <Col :md="{span:5}" :xs="{span:6}">
                    <div class="head-area">
                        <Avatar
                                v-if="chooseUser.stuImg === '' || chooseUser.stuImg === null"
                                size="large" class="anonymity-head">{{chooseUser.stuName.substr(0,1)}}
                        </Avatar>
                        <img v-else style="height: 100%;border-radius: 50%;" alt=" ta的头像"
                             :src="upImgBase + chooseUser.stuImg"/>
                    </div>
                </Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>真实姓名:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">
                    {{ chooseUser.stuName }}
                </Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>民族:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">
                    {{ chooseUser.stuNation }}
                </Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>ID学号:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">
                    {{ chooseUser.stuId }}
                </Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>政治面貌:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">
                    {{ chooseUser.stuStatus }}
                </Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>性别:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">
                    {{ chooseUser.stuGender }}
                </Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>籍贯:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">
                    {{ chooseUser.stuArea }}
                </Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>联系方式:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">
                    {{ chooseUser.stuPhone }}
                </Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>邮箱地址:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">
                    {{ chooseUser.stuEmail }}
                </Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>生日:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">
                    {{ chooseUser.stuBirthday | formatDate }}
                </Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>院系:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">
                    {{ chooseUser.stuDept }}
                </Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>注册日期:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">
                    {{ chooseUser.stuRegistTime | formatDateTime }}
                </Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>班级:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">
                    {{ chooseUser.stuClass }}
                </Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>个人简介:</div>
                </Col>
                <Col :md="{span:21}" :xs="{span:17}">
                    {{ chooseUser.stuInfo }}
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script>
    import axios from 'axios'
    import '@/utils/filter_utils'

    export default {
        name: 'cover',
        components: {},
        data() {
            return {
                eightStus: [],
                allstus: [],
                color: ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae',
                    '#333', '#ccc', '#dc3545', '#007bff',
                    '#28a745', '#6f42c1', '#eeaeee', '#00ffff'],
                length: 0,
                loading1: true,
                keywords: '',
                seehisinfo: false,
                chooseUser: {}
            }
        },
        mounted() {
            this.getFiveMethod();
        },
        methods: {
            getFiveMethod() {
                // 加载右侧8位学生列表
                let _self = this;
                axios
                    .get('/api/stu/getPart')
                    .then(res => {
                        // console.log(res)
                        if (res) {
                            _self.allstus = res.data.allList;
                            _self.eightStus = res.data.randomList;
                            _self.length = res.data.len;
                            _self.loading1 = false;
                        }
                    })
            },
            goto(url) {
                this.$router.push(url)
            },
            // 获取随机颜色
            ranum() {
                return Math.floor(Math.random() * 12)
            },
            // 查找同学
            search(keywords) {
                if (keywords === '') {
                    return this.eightStus;
                }
                return this.allstus.filter(user => {
                    var id = String(user.stuId);
                    var name = user.stuName.toLowerCase();
                    if (id.includes(keywords) || name.includes(keywords.toLowerCase())) {
                        return user;
                    }
                });
            },
            displays(user) {
                let info = localStorage.getItem('wecoding_login_info');
                if (info) {
                    this.seehisinfo = true;
                    this.chooseUser = user
                } else {
                    this.$Message['warning']({
                        background: true,
                        content: '登录后才可以查看!'
                    });
                }
            }
        }

    }
</script>
<style scoped>
    @media screen and (max-width: 700px) {
        .person-info-col {
            padding-top: 20px;
        }

        .person-info-row {
            padding: 10px !important;
        }

        .reg-time {
            font-size: 12px;
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

    .head-area {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        box-shadow: -1px 6px 4px #333333;
    }

    .anonymity-head {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        font-size: 50px;
        text-align: center;
        padding-top: 20px;
    }

    .person-info-row {
        padding: 20px;
        font-size: 14px;
    }


</style>
<style lang="less" scoped>
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }
</style>